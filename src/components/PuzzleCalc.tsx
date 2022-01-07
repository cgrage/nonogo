
import Puzzle from '../puzzles/json/one.json';

export const Colors = {
    Free: 0,
    Color1: 1,
    Color2: 2,
    Color3: 3,
    Color4: 4,
    Color5: 5,
    Color6: 6,
    Color7: 7,
    Color8: 8,
    Color9: 9,
} as const;

export type FieldColor = typeof Colors[keyof typeof Colors];

export type CellValue = {
    input: FieldColor | undefined,
    hasError: boolean,
}

export type HintSet = {
    hints: number[];
    sum: number;
}

export type PuzzleData = {
    width: number;
    height: number;
    solution: FieldColor[][];
    colHints: HintSet[];
    rowHints: HintSet[];
}

type ErrorMap = {
    hasError: boolean[][];
    errorCount: number;
}

class PuzzleCalc {

    public static load(): PuzzleData {
        return PuzzleCalc.loadJson();
    }

    public static loadJson(): PuzzleData {
        let width = Puzzle.width;
        let height = Puzzle.height;
        let loaded: PuzzleData = {
            width: width,
            height: height,
            solution: [],
            colHints: [],
            rowHints: [],
        }

        for (let y = 0; y < loaded.height; y++) {
            loaded.solution[y] = [];
            for (let x = 0; x < loaded.width; x++) {
                loaded.solution[y][x] = function (x: string): FieldColor {
                    switch (x) {
                        case "0": return Colors.Free;
                        default:
                        case "1": return Colors.Color1;
                        case "2": return Colors.Color2;
                        case "3": return Colors.Color3;
                        case "4": return Colors.Color4;
                        case "5": return Colors.Color5;
                        case "6": return Colors.Color6;
                        case "7": return Colors.Color7;
                        case "8": return Colors.Color8;
                        case "9": return Colors.Color9;
                    }
                }(Puzzle.goal.charAt(y * loaded.width + x));
            }
        }

        for (let col = 0; col < width; col++) {
            loaded.colHints[col] = { hints: [], sum: 0 };
            for (let i = 0; i < Puzzle.columns[col].length; i++) {
                loaded.colHints[col].hints[i] = Puzzle.columns[col][i];
                loaded.colHints[col].sum += Puzzle.columns[col][i];
            }
        }

        for (let row = 0; row < height; row++) {
            loaded.rowHints[row] = { hints: [], sum: 0 };
            for (let i = 0; i < Puzzle.rows[row].length; i++) {
                loaded.rowHints[row].hints[i] = Puzzle.rows[row][i];
                loaded.rowHints[row].sum += Puzzle.rows[row][i];
            }
        }

        return loaded;
    }

    public static loadEmpty(): PuzzleData {
        let loaded: PuzzleData = {
            width: 32,
            height: 32,
            solution: [],
            colHints: [],
            rowHints: [],
        }

        for (let y = 0; y < loaded.height; y++) {
            loaded.solution[y] = [];
            for (let x = 0; x < loaded.width; x++) {
                loaded.solution[y][x] = Colors.Free;
            }
        }

        loaded.colHints = [];
        for (let x = 0; x < loaded.width; x++) {
            switch (x % 3) {
                case 0: loaded.colHints[x] = { hints: [1, 2, 3], sum: 6 }; break;
                case 1: loaded.colHints[x] = { hints: [1, 2], sum: 3 }; break;
                case 2: loaded.colHints[x] = { hints: [1], sum: 1 }; break;
            }
        }

        loaded.rowHints = [];
        for (let y = 0; y < loaded.width; y++) {
            switch (y % 3) {
                case 0: loaded.rowHints[y] = { hints: [10, 20, 30], sum: 60 }; break;
                case 1: loaded.rowHints[y] = { hints: [10, 20], sum: 30 }; break;
                case 2: loaded.rowHints[y] = { hints: [10], sum: 10 }; break;
            }
        }

        return loaded;
    }

    public static reset(board: CellValue[][]): CellValue[][] {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                board[y][x] = {
                    input: undefined,
                    hasError: false,
                };
            }
        }
        return board;
    }

    public static new(width: number, height: number): CellValue[][] {
        let empty: CellValue[][] = [];
        for (let y = 0; y < height; y++) {
            empty[y] = [];
            for (let x = 0; x < width; x++) {
                empty[y][x] = {
                    input: undefined,
                    hasError: false,
                };
            }
        }
        return empty;
    }

    public static clone(board: CellValue[][]): CellValue[][] {
        let clone: CellValue[][] = [];
        for (let y = 0; y < board.length; y++) {
            clone[y] = [];
            for (let x = 0; x < board[y].length; x++) {
                clone[y][x] = {
                    input: board[y][x].input,
                    hasError: board[y][x].hasError,
                };
            }
        }
        return clone;
    }

    public static updateOnTileEvent(board: CellValue[][], colIndex: number, rowIndex: number): CellValue[][] {
        let tileVal = board[rowIndex][colIndex].input;

        if (tileVal === undefined) {
            tileVal = Colors.Color1;
        } else if (tileVal === Colors.Free) {
            tileVal = undefined;
        } else {
            tileVal = Colors.Free;
        }

        let newBoard = PuzzleCalc.clone(board);
        newBoard[rowIndex][colIndex].input = tileVal;

        return newBoard;
    }

    static findErrors(board: CellValue[][], puzzle: PuzzleData): ErrorMap {
        let map: ErrorMap = {
            hasError: [],
            errorCount: 0,
        }

        for (let y = 0; y < puzzle.height; y++) {
            map.hasError[y] = [];
            for (let x = 0; x < puzzle.width; x++) {
                let hasError = (board[y][x].input !== undefined) && (board[y][x].input !== puzzle.solution[y][x]);
                map.hasError[y][x] = hasError;
                if (hasError) {
                    map.errorCount++;
                }
            }
        }

        return map;
    }

    static markRandomError(map: ErrorMap, board: CellValue[][], puzzle: PuzzleData) {
        if (map.errorCount < 1) {
            return;
        }

        for (let y = 0; y < puzzle.height; y++) {
            for (let x = 0; x < puzzle.width; x++) {
                if (map.hasError[y][x]) {
                    board[y][x].hasError = true;
                }
            }
        }
    }

    static showRandomSolution(board: CellValue[][], puzzle: PuzzleData) {
        for (let y = 0; y < puzzle.height; y++) {
            for (let x = 0; x < puzzle.width; x++) {
                board[y][x].input = puzzle.solution[y][x];
            }
        }
    }

    public static hint(board: CellValue[][], puzzle: PuzzleData): CellValue[][] {
        board = PuzzleCalc.clone(board);
        let errors = this.findErrors(board, puzzle);

        if (errors.errorCount > 0) {
            for (let i = 0; i < 3; i++) {
                this.markRandomError(errors, board, puzzle);
            }
        } else {
            for (let i = 0; i < 3; i++) {
                this.showRandomSolution(board, puzzle);
            }
        }

        return board;
    }
}

export default PuzzleCalc