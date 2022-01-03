import React, { useState, MouseEvent, useImperativeHandle, forwardRef } from 'react';
import BoardTile from './BoardTile';
import PuzzleCalc, { UserFieldValue, FieldValue, HintSet } from './PuzzleCalc';
import BoardHint from './BoardHint';
import TitleTile from './TitleTile';

interface BoardProps {
    showSums: boolean;
    onOpenMenu: () => void;
}

export interface BoardRef {
    giveHint(): void;
    reset(): void;
}

const Board: React.ForwardRefRenderFunction<BoardRef, BoardProps> = (props, ref) => {
    let loaded = PuzzleCalc.load();

    const [tileSolutions] = useState<FieldValue[][]>(loaded.solution);
    const [colHints] = useState<HintSet[]>(loaded.colHints);
    const [rowHints] = useState<HintSet[]>(loaded.rowHints);
    const [tileStates, setTileStates] = useState<UserFieldValue[][]>(PuzzleCalc.new(loaded.width, loaded.height));

    function onMouseDown(e: MouseEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function onTileEvent(colIndex: number, rowIndex: number) {
        setTileStates(prevState => PuzzleCalc.updateOnTileEvent(prevState, colIndex, rowIndex));
    }

    useImperativeHandle(ref, () => ({
        giveHint: () => { setTileStates(prevState => PuzzleCalc.hint(prevState, loaded)); },
        reset: () => { setTileStates(prevState => PuzzleCalc.reset(prevState)); }
    }), [])

    return <div className="board" onMouseDown={onMouseDown}>
        <div className={`col header-col`}></div>
        {colHints.map((colHintSet, colIndex) =>
            <div className={`col mod${colIndex % 5}`} key={colIndex.toString()} />
        )}
        <div className={`row header-row`}>
            <TitleTile onOpenMenu={props.onOpenMenu} />
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
                            isHidden={!props.showSums}
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
                            isHidden={!props.showSums}
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

export default forwardRef(Board)