import React from 'react';

type HintProps = {
    value: number;
}

type HintState = {
    // 
};

class BoardTile extends React.Component<HintProps, HintState> {
    constructor(props: HintProps) {
        super(props)
        this.state = {};
    }

    render() {
        return <div className="hint-tile">{this.props.value}</div>;
    }
}

export default BoardTile