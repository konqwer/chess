import React, { useEffect, useReducer, useState } from 'react';

import Figure from './boardComponents/Figure';
import Cell from './boardComponents/Cell';
import CellNumber from './boardComponents/CellNumber';
import Move from './boardComponents/Move';

import calculateBoardMoves from './utils/calculateBoardMoves';

const initialBoard = [
  [
    { type: 'r', color: 'b' },
    { type: 'n', color: 'b' },
    { type: 'b', color: 'b' },
    { type: 'q', color: 'b' },
    { type: 'k', color: 'b' },
    { type: 'b', color: 'b' },
    { type: 'n', color: 'b' },
    { type: 'r', color: 'b' }
  ],
  [
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' }
  ],
  [null, null, { type: 'k', color: 'w' }, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' }
  ],
  [
    { type: 'r', color: 'w' },
    { type: 'n', color: 'w' },
    { type: 'b', color: 'w' },
    null,
    { type: 'q', color: 'w' },
    { type: 'b', color: 'w' },
    { type: 'n', color: 'w' },
    { type: 'r', color: 'w' }
  ]
];

const Chess = () => {
  const [pickedFigure, setPickedFigure] = useState(null);
  //const [moves, setMoves] = useState([]);
  const [whiteTurn, setWhiteTurn] = useState(true);
  const [checkMate, setCheckMate] = useState(false);
  const [board, setBoard] = useState(calculateBoardMoves(initialBoard));

  //rendering new board
  const moveFigure = (figure, move) => {
    const tempBoard = [...board];
    tempBoard[figure.row][figure.col] = null;
    tempBoard[move.row][move.col] = { type: figure.type, color: figure.color };

    setBoard(calculateBoardMoves(tempBoard));
  };

  // rendering possible moves based on turn
  // useEffect(() => {
  //   const movesBoard = calculateBoardMoves(board);
  //   const color = whiteTurn ? 'w' : 'b';
  //   const enemyColor = whiteTurn ? 'b' : 'w';

  //   let king;
  //   movesBoard.forEach((row, rowIdx) => {
  //     row.forEach((col, colIdx) => {
  //       if (col && col.type === 'k' && col.color === color) {
  //         king = { ...col, row: rowIdx, col: colIdx };
  //       }
  //     });
  //   });
  //   const enemyMoves = [];
  //   movesBoard.forEach(row =>
  //     row.forEach(col => {
  //       if (col && col.color === enemyColor) {
  //         enemyMoves.push(...col.moves);
  //       }
  //     })
  //   );

  //   if (
  //     enemyMoves.find(move => move.row === king.row && move.col === king.col)
  //   ) {
  //     king.moves = king.moves.filter(
  //       move =>
  //         !enemyMoves.find(
  //           enMove => move.row === enMove.row && move.col === enMove.col
  //         )
  //     );
  //   }

  //   console.log('moves', movesBoard);
  //   console.log('enemyMoves', enemyMoves);
  //   console.log('king', king);
  // }, [whiteTurn]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex h-[80vh] w-[80vh] flex-wrap">
        {board.map((row, rowIdx) => {
          return row.map((col, colIdx) => {
            const cellContains = board[rowIdx][colIdx];
            const move =
              pickedFigure &&
              pickedFigure.moves.find(
                m => m.row === rowIdx && m.col === colIdx
              );
            const isPickedFigure =
              pickedFigure &&
              pickedFigure.row === rowIdx &&
              pickedFigure.col === colIdx;
            return (
              <Cell
                isPicked={isPickedFigure}
                color={(rowIdx + colIdx) % 2 === 1}
              >
                <CellNumber rowIdx={rowIdx} colIdx={colIdx} />
                {isPickedFigure && <div className="picked" />}
                {move && (
                  <Move
                    type={move.type}
                    onClick={() => {
                      moveFigure(pickedFigure, move);
                      setPickedFigure(null);
                      setWhiteTurn(p => !p);
                    }}
                  />
                )}
                {cellContains && (
                  <Figure
                    type={cellContains.type}
                    color={cellContains.color}
                    onClick={() => {
                      cellContains.color === (whiteTurn ? 'w' : 'b') &&
                        setPickedFigure({
                          ...cellContains,
                          row: rowIdx,
                          col: colIdx
                        });
                    }}
                  />
                )}
              </Cell>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Chess;
