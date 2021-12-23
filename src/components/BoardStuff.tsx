
import Puzzle from '../puzzles/json/one.json';

export enum TileTargetVal {
    Free = 0,
    Filled,
}

export enum TileUserVal {
    Free = 0,
    Crossed = 1,
    Filled = 2,
}

export type HintSet = {
    hints: number[];
    sum: number;
}

export type BoardData = {
    width: number;
    height: number;
    solution: TileTargetVal[][];
    colHints: HintSet[];
    rowHints: HintSet[];
}

class BoardStuff {

    public static load(): BoardData {
        return BoardStuff.loadJson();
    }

    public static loadJson(): BoardData {
        let width = Puzzle.width;
        let height = Puzzle.height;
        let loaded: BoardData = {
            width: width,
            height: height,
            solution: [],
            colHints: [],
            rowHints: [],
        }

        for (let y = 0; y < loaded.height; y++) {
            loaded.solution[y] = [];
            for (let x = 0; x < loaded.width; x++) {
                loaded.solution[y][x] = TileTargetVal.Free;
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

    public static loadEmpty(): BoardData {
        let loaded: BoardData = {
            width: 32,
            height: 32,
            solution: [],
            colHints: [],
            rowHints: [],
        }

        for (let y = 0; y < loaded.height; y++) {
            loaded.solution[y] = [];
            for (let x = 0; x < loaded.width; x++) {
                loaded.solution[y][x] = TileTargetVal.Free;
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

    public static reset(board: TileUserVal[][]): TileUserVal[][] {
        let empty: TileUserVal[][] = [];
        for (let y = 0; y < board.length; y++) {
            empty[y] = [];
            for (let x = 0; x < board[y].length; x++) {
                empty[y][x] = TileUserVal.Free;
            }
        }
        return empty;
    }

    public static new(width: number, height: number): TileUserVal[][] {
        let empty: TileUserVal[][] = [];
        for (let y = 0; y < height; y++) {
            empty[y] = [];
            for (let x = 0; x < width; x++) {
                empty[y][x] = TileUserVal.Free;
            }
        }
        return empty;
    }

    public static clone(board: TileUserVal[][]): TileUserVal[][] {
        let clone: TileUserVal[][] = [];
        for (let y = 0; y < board.length; y++) {
            clone[y] = [];
            for (let x = 0; x < board[y].length; x++) {
                clone[y][x] = board[y][x];
            }
        }
        return clone;
    }

    public static updateOnTileEvent(board: TileUserVal[][], colIndex: number, rowIndex: number): TileUserVal[][] {
        let tileVal = board[rowIndex][colIndex];
        let newVal;

        switch (tileVal) {
            case TileUserVal.Free: newVal = TileUserVal.Filled; break;
            case TileUserVal.Filled: newVal = TileUserVal.Crossed; break;
            case TileUserVal.Crossed: newVal = TileUserVal.Free; break;
        }

        let newBoard = BoardStuff.clone(board);
        newBoard[rowIndex][colIndex] = newVal;

        return newBoard;
    }

    public static hint(board: TileUserVal[][]): TileUserVal[][] {
        let clone = BoardStuff.clone(board);
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                clone[y][x] = TileUserVal.Crossed;
            }
        }
        return clone;
    }
}

export default BoardStuff