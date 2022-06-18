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

export type FieldValue = typeof Colors[keyof typeof Colors] | undefined;

export type CellValue = {
    input: FieldValue,
    hasError: boolean,
}

export type ClueSet = {
    clues: number[];
    sum: number;
}

export type PuzzleData = {
    name: string;
    width: number;
    height: number;
    solution: FieldValue[][];
    colClues: ClueSet[];
    rowClues: ClueSet[];
}
