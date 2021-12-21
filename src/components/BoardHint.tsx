import React from 'react';

interface HintProps {
    value: number;
    isSum: boolean;
    isFulfilled: boolean;
    isHidden: boolean;
}

interface HintState {
    // 
};

class BoardHint extends React.Component<HintProps, HintState> {
    public static defaultProps = {
        isSum: false,
        isFulfilled: false,
        isHidden: false
    };

    constructor(props: HintProps) {
        super(props)
        this.state = {};
    }

    class() {
        var result = "hint-tile";
        if (this.props.isSum) result += " sum";
        if (this.props.isFulfilled) result += " fulfilled";
        if (this.props.isHidden) result += " hidden";

        return result;
    }

    render() {
        return <div
            className={this.class()}>
            {this.props.isSum ? "=" : ""}{this.props.value}
        </div>;
    }
}

export default BoardHint