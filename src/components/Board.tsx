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
        <div className="header-row">
            <div className="top-left-cell"></div>
            {colHints.map((colHintSet, colIndex) =>
                <div className="column-header" key={colIndex.toString()}>
                    <div className="column-hints">
                        {colHintSet.map((hint, hintIndex) =>
                            <BoardHint key={hintIndex.toString()} value={hint} />)
                        }
                    </div>
                </div>
            )}
        </div>
        {tileStates.map((row, rowIndex) =>
            <div className="row" key={rowIndex.toString()}>
                <div className="row-header">
                    <div className="row-hints">
                        {rowHints[rowIndex].map((hint, hintIndex) =>
                            <BoardHint key={hintIndex.toString()} value={hint} />
                        )}
                    </div>
                </div>
                {row.map((tileState, colIndex) =>
                    <BoardTile key={rowIndex + " " + colIndex} value={tileState} rowIndex={rowIndex} colIndex={colIndex} onTileEvent={onTileEvent} />
                )}
            </div>
        )}
    </div>
}

export default Board