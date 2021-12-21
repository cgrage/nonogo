import React from 'react';
import { TileUserVal } from './BoardStuff';

type TitleTileProps = {
    onGiveHint: CallableFunction;
};

type TitleTileState = {
    //
};

class TitleTile extends React.Component<TitleTileProps, TitleTileState> {
    constructor(props: TitleTileProps) {
        super(props)
    }

    render() {
        return <div className="cell top-left-cell">
            <h1 onClick={(e) => this.props.onGiveHint()}>Nonogo!</h1>
        </div>
    }
}

export default TitleTile;