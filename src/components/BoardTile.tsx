import React from 'react';
import { UserFieldValue, FieldValue } from './PuzzleCalc';

interface TileProps {
    value: UserFieldValue;
    colIndex: number;
    rowIndex: number;
    onTileEvent: (col: number, row: number) => void;
};

const BoardTile: React.FC<TileProps> = (props) => {
    function onClick(e: React.MouseEvent) {
        if (props.onTileEvent) {
            props.onTileEvent(props.colIndex, props.rowIndex);
        }
    }

    function className(): string {
        let value = "tile";

        if (props.value.value === undefined) {
            value += " free";
        } else if (props.value.value === FieldValue.Free) {
            value += " crossed";
        } else {
            value += " filled";
        }

        if (props.value.hasError) {
            value += " error"
        }

        return value
    }

    return <div
        className={className()}
        onClick={onClick}></div>;
}

export default BoardTile;