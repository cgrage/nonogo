import React, { useState, useImperativeHandle, forwardRef } from 'react';
import BoardTile from './BoardTile';
import PuzzleCalc, { CellValue, PuzzleData } from './PuzzleCalc';
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

type Coord2d = {
    x: number,
    y: number,
}

const Board: React.ForwardRefRenderFunction<BoardRef, BoardProps> = (props, ref) => {
    const [puzzle] = useState<PuzzleData>(PuzzleCalc.load());
    const [tileStates, setTileStates] = useState<CellValue[][]>(PuzzleCalc.new(puzzle.width, puzzle.height));
    const [selCell, setSelCell] = useState<Coord2d>({ x: -1, y: -1 });

    function onTileInteract(colIndex: number, rowIndex: number) {
        setTileStates(prevState => PuzzleCalc.updateOnTileEvent(prevState, colIndex, rowIndex));
    }

    function onSelected(colIndex: number, rowIndex: number) {
        setSelCell({ x: colIndex, y: rowIndex });
    }

    useImperativeHandle(ref, () => ({
        giveHint: () => { setTileStates(prevState => PuzzleCalc.hint(prevState, puzzle)); },
        reset: () => { setTileStates(prevState => PuzzleCalc.reset(prevState)); }
    }), [])

    return <div className="board">
        <div className={`col header-col`}></div>
        {puzzle.colHints.map((colHintSet, colIndex) =>
            <div className={`col mod${colIndex % 5} ${colIndex == selCell.x ? "highlight" : ""}`} key={colIndex.toString()} />
        )}
        <div className={`row header-row`}>
            <TitleTile onOpenMenu={props.onOpenMenu} />
            {puzzle.colHints.map((colHintSet, colIndex) =>
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
            <div className={`row mod${rowIndex % 5} ${rowIndex == selCell.y ? "highlight" : ""}`} key={rowIndex.toString()}>
                <div className="cell row-header-cell">
                    <div className="row-hints">
                        {puzzle.rowHints[rowIndex].hints.map((hint, hintIndex) =>
                            <BoardHint
                                key={hintIndex.toString()}
                                value={hint} />
                        )}
                        <BoardHint
                            isSum={true}
                            isHidden={!props.showSums}
                            value={puzzle.rowHints[rowIndex].sum} />
                    </div>
                </div>
                {row.map((tileState, colIndex) =>
                    <div className="cell" key={rowIndex + " " + colIndex}>
                        <BoardTile
                            value={tileState}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            isSelected={colIndex == selCell.x && rowIndex == selCell.y}
                            onInteract={onTileInteract}
                            onSelected={onSelected} />
                    </div>
                )}
            </div>
        )}
    </div>
}

export default forwardRef(Board)