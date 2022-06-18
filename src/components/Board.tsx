import React, { useState, MouseEvent, useImperativeHandle, forwardRef } from 'react';
import BoardTile from './BoardTile';
import PuzzleCalc from './PuzzleCalc';
import ClueTile from './ClueTile';
import TitleTile from './TitleTile';
import { CellValue, PuzzleData } from './Types';

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

    function onMouseDown(e: MouseEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function onTileInteract(colIndex: number, rowIndex: number) {
        setTileStates(prevState => PuzzleCalc.updateOnTileEvent(prevState, colIndex, rowIndex));
    }

    function onSelected(colIndex: number, rowIndex: number) {
        setSelCell({ x: colIndex, y: rowIndex });
    }

    useImperativeHandle(ref, () => ({
        giveHint: () => { setTileStates(prevState => PuzzleCalc.solveStep(prevState, puzzle)); },
        reset: () => { setTileStates(prevState => PuzzleCalc.reset(prevState)); }
    }), [puzzle])

    return <div className="board" onMouseLeave={() => onSelected(-1, -1)} onMouseDown={onMouseDown}>
        <div className={`col header-col`}></div>
        {puzzle.colClues.map((colClueSet, colIndex) =>
            <div className={`col mod${colIndex % 5} ${colIndex === selCell.x ? "highlight" : ""}`} key={colIndex.toString()} />
        )}
        <div className={`row header-row`}>
            <TitleTile title={puzzle.name} onOpenMenu={props.onOpenMenu} />
            {puzzle.colClues.map((colClueSet, colIndex) =>
                <div className="cell column-header-cell" key={colIndex.toString()}>
                    <div className="column-clues">
                        {colClueSet.clues.map((clue, clueIndex) =>
                            <ClueTile
                                key={clueIndex.toString()}
                                value={clue} />
                        )}
                        <ClueTile
                            isSum={true}
                            isHidden={!props.showSums}
                            value={colClueSet.sum} />
                    </div>
                </div>
            )}
        </div>
        {tileStates.map((row, rowIndex) =>
            <div className={`row mod${rowIndex % 5} ${rowIndex === selCell.y ? "highlight" : ""}`} key={rowIndex.toString()}>
                <div className="cell row-header-cell">
                    <div className="row-clues">
                        {puzzle.rowClues[rowIndex].clues.map((clue, clueIndex) =>
                            <ClueTile
                                key={clueIndex.toString()}
                                value={clue} />
                        )}
                        <ClueTile
                            isSum={true}
                            isHidden={!props.showSums}
                            value={puzzle.rowClues[rowIndex].sum} />
                    </div>
                </div>
                {row.map((tileState, colIndex) =>
                    <div className="cell" key={rowIndex + " " + colIndex}>
                        <BoardTile
                            value={tileState}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            isSelected={colIndex === selCell.x && rowIndex === selCell.y}
                            onInteract={onTileInteract}
                            onSelected={onSelected} />
                    </div>
                )}
            </div>
        )}
    </div>
}

export default forwardRef(Board)