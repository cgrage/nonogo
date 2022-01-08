import React from 'react';

type TitleTileProps = {
    title: string;
    onOpenMenu: () => void;
};

const TitleTile: React.FC<TitleTileProps> = (props) => {
    return <div className="cell top-left-cell">
        <h1>Nonogo!</h1>
        <p>{props.title}</p>
        <button onClick={(e) => props.onOpenMenu()}>Menu</button>
    </div>
}

export default TitleTile;