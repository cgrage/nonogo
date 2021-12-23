import React from 'react';
import { TileUserVal } from './BoardStuff';

interface TileProps {
    value: TileUserVal;
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

    function valueClass() {
        switch (props.value) {
            case TileUserVal.Free: return "tile-free";
            case TileUserVal.Crossed: return "tile-crossed";
            case TileUserVal.Filled: return "tile-filled";
        }
    }

    return <div
        className={`tile ${valueClass()}`}
        onClick={onClick}></div>;
}

export default BoardTile;