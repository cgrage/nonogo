import React from 'react';
import { CellValue, Colors } from './PuzzleCalc';

interface TileProps {
    value: CellValue;
    colIndex: number;
    rowIndex: number;
    isSelected: boolean;
    onInteract: (col: number, row: number) => void;
    onSelected: (col: number, row: number) => void;
};

const BoardTile: React.FC<TileProps> = (props) => {
    function onMouseDown(e: React.MouseEvent) {
        if (props.onInteract) {
            props.onInteract(props.colIndex, props.rowIndex);
        }
    }
    
    function onMouseEnter(e: React.MouseEvent) {
        if (props.onSelected) {
            props.onSelected(props.colIndex, props.rowIndex);
        }
    }

    function className(): string {
        let value = "tile";

        if (props.value.input === undefined) {
            value += " empty";
        } else {
            if (props.value.input === Colors.Free) {
                value += " guess-free";
            } else {
                value += " guess-filled";
            }
        }

        if (props.value.hasError) {
            value += " error";
        }

        if (props.isSelected) {
            value += " selected";
        }

        return value
    }

    return <div
        className={className()}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}></div>;
}

export default BoardTile;