
export enum TileTargetVal {
    Free = 0,
    Filled,
}

export enum TileUserVal {
    Free = 0,
    Crossed = 1,
    Filled = 2,
}

export type BoardData = {
    width: number;
    height: number;
    tiles: TileTargetVal[][];
    colHints: number[][];
    rowHints: number[][];
}

export function loadBoard(): BoardData {
    let loaded: BoardData = {
        width: 32,
        height: 32,
        tiles: [],
        colHints: [],
        rowHints: []
    }

    for (let y = 0; y < loaded.height; y++) {
        loaded.tiles[y] = [];
        for (let x = 0; x < loaded.width; x++) {
            loaded.tiles[y][x] = TileTargetVal.Free;
        }
    }

    loaded.colHints = [];
    for (let x = 0; x < loaded.width; x++) {
        switch (x % 3) {
            case 0: loaded.colHints[x] = [1, 2, 3]; break;
            case 1: loaded.colHints[x] = [1, 2]; break;
            case 2: loaded.colHints[x] = [1]; break;
        }
    }

    loaded.rowHints = [];
    for (let y = 0; y < loaded.width; y++) {
        switch (y % 3) {
            case 0: loaded.rowHints[y] = [10, 20, 30]; break;
            case 1: loaded.rowHints[y] = [10, 20]; break;
            case 2: loaded.rowHints[y] = [10]; break;
        }
    }

    return loaded;
}

export function emptyBoard(data: BoardData): TileUserVal[][] {
    let empty: TileUserVal[][] = [];
    for (let y = 0; y < data.height; y++) {
        empty[y] = [];
        for (let x = 0; x < data.width; x++) {
            empty[y][x] = TileUserVal.Free;
        }
    }
    return empty;
}

export function updateOnTileEvent(board: TileUserVal[][], colIndex: number, rowIndex: number): TileUserVal[][] {
    let tileVal = board[rowIndex][colIndex];
    let newVal;

    switch (tileVal) {
        case TileUserVal.Free: newVal = TileUserVal.Filled; break;
        case TileUserVal.Filled: newVal = TileUserVal.Crossed; break;
        case TileUserVal.Crossed: newVal = TileUserVal.Free; break;
    }

    let newBoard: TileUserVal[][] = [];
    for (let y = 0; y < board.length; y++) {
        newBoard[y] = [];
        for (let x = 0; x < board[y].length; x++) {
            newBoard[y][x] = board[y][x];
        }
    }
    newBoard[rowIndex][colIndex] = newVal;
    return newBoard;
}