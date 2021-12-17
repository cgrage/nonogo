import { FunctionComponent, useState } from 'react';
import BoardTile from './BoardTile';
import { TileUserVal, TileTargetVal, loadBoard, emptyBoard, updateOnTileEvent } from './BoardStuff';
import BoardHint from './BoardHint';
import './Board.css'

const Board: FunctionComponent = () => {

    function onTileEvent(colIndex: number, rowIndex: number) {
        // console.log("Tile Event on (" + rowIndex + ", " + colIndex + ")");
        setTileStates(prevState => updateOnTileEvent(prevState, colIndex, rowIndex));
    }

    let loaded = loadBoard();

    const [tileSolutions] = useState<TileTargetVal[][]>(loaded.tiles);
    const [colHints] = useState<number[][]>(loaded.colHints);
    const [rowHints] = useState<number[][]>(loaded.rowHints);
    const [tileStates, setTileStates] = useState<TileUserVal[][]>(emptyBoard(loaded));

    return <div className="board">
        <div className={`col header-col`}></div>
        {colHints.map((colHintSet, colIndex) => 
            <div className={`col mod${colIndex % 5}`}></div>
        )}
        <div className={`row header-row`}>
            <div className="cell top-left-cell"></div>
            {colHints.map((colHintSet, colIndex) =>
                <div className="cell column-header-cell" key={colIndex.toString()}>
                    <div className="column-hints">
                        {colHintSet.map((hint, hintIndex) =>
                            <BoardHint
                                key={hintIndex.toString()}
                                rowIndex={-1}
                                colIndex={colIndex}
                                value={hint} />
                        )}
                    </div>
                </div>
            )}
        </div>
        {tileStates.map((row, rowIndex) =>
            <div className={`row mod${rowIndex % 5}`} key={rowIndex.toString()}>
                <div className="cell row-header-cell">
                    <div className="row-hints">
                        {rowHints[rowIndex].map((hint, hintIndex) =>
                            <BoardHint
                                key={hintIndex.toString()}
                                rowIndex={rowIndex}
                                colIndex={-1}
                                value={hint} />
                        )}
                    </div>
                </div>
                {row.map((tileState, colIndex) =>
                    <div className="cell">
                        <BoardTile
                            key={rowIndex + " " + colIndex}
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