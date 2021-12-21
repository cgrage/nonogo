import React from 'react';
import { TileUserVal } from './BoardStuff';

interface TileProps {
    value: TileUserVal;
    colIndex: number;
    rowIndex: number;
    onTileEvent: CallableFunction;
};

interface TileState {
    //
};

class BoardTile extends React.Component<TileProps, TileState> {
    constructor(props: TileProps) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }

    onClick(e: React.MouseEvent) {
        if (this.props.onTileEvent) {
            this.props.onTileEvent(this.props.colIndex, this.props.rowIndex);
        }
    }

    valueClass() {
        switch (this.props.value) {
            case TileUserVal.Free: return "tile-free";
            case TileUserVal.Crossed: return "tile-crossed";
            case TileUserVal.Filled: return "tile-filled";
        }
    }

    render() {
        return <div
            className={`tile ${this.valueClass()}`}
            onClick={this.onClick}></div>;
    }
}

export default BoardTile;