import React from 'react';

interface ClueTimeProps {
    value: number;
    isSum?: boolean;
    isFulfilled?: boolean;
    isHidden?: boolean;
}

const ClueTile: React.FC<ClueTimeProps> = (props) => {
    function getClass() {
        var result = "clue-tile";
        if (props.isSum) result += " sum";
        if (props.isFulfilled) result += " fulfilled";
        if (props.isHidden) result += " hidden";

        return result;
    }

    return <div className={getClass()}>{props.value}</div>;
}

ClueTile.defaultProps = {
    isSum: false,
    isFulfilled: false,
    isHidden: false
};

export default ClueTile