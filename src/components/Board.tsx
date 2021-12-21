import { FunctionComponent, useState, MouseEvent } from 'react';
import BoardTile from './BoardTile';
import BoardStuff, { TileUserVal, TileTargetVal, HintSet } from './BoardStuff';
import BoardHint from './BoardHint';
import './Board.css'
import TitleTile from './TitleTile';

const Board: FunctionComponent = () => {
    let loaded = BoardStuff.loadBoard();

    const [tileSolutions] = useState<TileTargetVal[][]>(loaded.solution);
    const [colHints] = useState<HintSet[]>(loaded.colHints);
    const [rowHints] = useState<HintSet[]>(loaded.rowHints);
    const [tileStates, setTileStates] = useState<TileUserVal[][]>(BoardStuff.emptyBoard(loaded));
    const [hideSums, setHideSums] = useState<boolean>(true);

    function onMouseDown(e: MouseEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function onTileEvent(colIndex: number, rowIndex: number) {
        setTileStates(prevState => BoardStuff.updateOnTileEvent(prevState, colIndex, rowIndex));
    }

    function onTitleClick() {
        setTileStates(prevState => BoardStuff.giveHint(prevState));
        setHideSums(false);
    }

    return <div className="board" onMouseDown={onMouseDown}>
        <div className={`col header-col`}></div>
        {colHints.map((colHintSet, colIndex) =>
            <div className={`col mod${colIndex % 5}`} key={colIndex.toString()} />
        )}
        <div className={`row header-row`}>
            <TitleTile onGiveHint={onTitleClick} />
            {colHints.map((colHintSet, colIndex) =>
                <div className="cell column-header-cell" key={colIndex.toString()}>
                    <div className="column-hints">
                        {colHintSet.hints.map((hint, hintIndex) =>
                            <BoardHint
                                key={hintIndex.toString()}
                                value={hint} />
                        )}
                        <BoardHint
                            isSum={true}
                            isHidden={hideSums}
                            value={colHintSet.sum} />
                    </div>
                </div>
            )}
        </div>
        {tileStates.map((row, rowIndex) =>
            <div className={`row mod${rowIndex % 5}`} key={rowIndex.toString()}>
                <div className="cell row-header-cell">
                    <div className="row-hints">
                        {rowHints[rowIndex].hints.map((hint, hintIndex) =>
                            <BoardHint
                                key={hintIndex.toString()}
                                value={hint} />
                        )}
                        <BoardHint
                            isSum={true}
                            isHidden={hideSums}
                            value={rowHints[rowIndex].sum} />
                    </div>
                </div>
                {row.map((tileState, colIndex) =>
                    <div className="cell" key={rowIndex + " " + colIndex}>
                        <BoardTile
                            value={tileState}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            onTileEvent={onTileEvent} />
                    </div>
                )}
            </div>
        )}
    </div>
}

export default Board