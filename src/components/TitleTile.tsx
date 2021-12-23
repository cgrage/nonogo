import React from 'react';

type TitleTileProps = {
    onOpenMenu: () => void;
};

const TitleTile: React.FC<TitleTileProps> = (props) => {
    return <div className="cell top-left-cell">
        <h1>Nonogo!</h1>
        <button onClick={(e) => props.onOpenMenu()}>Menu</button>
    </div>
}

export default TitleTile;