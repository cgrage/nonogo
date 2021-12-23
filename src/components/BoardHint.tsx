import React from 'react';

interface HintProps {
    value: number;
    isSum?: boolean;
    isFulfilled?: boolean;
    isHidden?: boolean;
}

const BoardHint: React.FC<HintProps> = (props) => {
    function getClass() {
        var result = "hint-tile";
        if (props.isSum) result += " sum";
        if (props.isFulfilled) result += " fulfilled";
        if (props.isHidden) result += " hidden";

        return result;
    }

    return <div
        className={getClass()}>
        {props.isSum ? "=" : ""}{props.value}
    </div>;
}

BoardHint.defaultProps = {
    isSum: false,
    isFulfilled: false,
    isHidden: false
};

export default BoardHint