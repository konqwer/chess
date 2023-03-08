import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Figure from './components/Figure';
import Cell from './components/Cell';
import Move from './components/Move';
import { moveFigure } from './store/boardSlice.js';

const App = () => {
  const [moves, setMoves] = useState([]);
  const [pickedFigure, setPickedFigure] = useState({});
  const board = useSelector(state => state.board);
  const dispatch = useDispatch();

  const moveHandler = cell => {
    console.log(cell);

    const checkMoves = (cell, direction) => {
      switch (direction) {
        case 't':
          return checkB_T(cell, -1);
        case 'b':
          return checkB_T(cell, 1);
        case 'l':
          return checkR_L(cell, -1);
        case 'r':
          return checkR_L(cell, 1);
        case 'tl':
          return checkDG(cell, -1, -1);
        case 'tr':
          return checkDG(cell, -1, 1);
        case 'bl':
          return checkDG(cell, 1, -1);
        case 'br':
          return checkDG(cell, 1, 1);
      }
    };
    const checkR_L = (cell, direction) => {
      const result = [];
      let i = cell.colIdx + direction;
      let tempBoard = board[cell.rowIdx][i];

      while (!tempBoard && i >= 0 && i <= 7) {
        result.push({ row: cell.rowIdx, col: i });

        i += direction;
        tempBoard = board[cell.rowIdx][i];
      }

      return result;
    };
    const checkB_T = (cell, direction) => {
      const result = [];
      let i = cell.rowIdx + direction;
      let tempBoard = board[i][cell.colIdx];
      while (!tempBoard && i >= 0 && i <= 7) {
        result.push({ row: i, col: cell.colIdx });

        i += direction;
        tempBoard = board[i][cell.colIdx];
      }

      return result;
    };
    const checkDG = (cell, directionB_T, directionR_L) => {
      const result = [];
      let i = cell.rowIdx + directionB_T;
      let h = cell.colIdx + directionR_L;
      let tempBoard = board[i][h];
      while (!tempBoard && i >= 0 && i <= 7 && h >= 0 && h <= 7) {
        result.push({ row: i, col: h });

        i += directionB_T;
        h += directionR_L;
        tempBoard = board[i][h];
      }

      return result;
    };
    setPickedFigure(cell);
    setMoves([
      ...checkMoves(cell, 't'),
      ...checkMoves(cell, 'b'),
      ...checkMoves(cell, 'l'),
      ...checkMoves(cell, 'r')
    ]);
  };

  return (
    <div className="flex items-center justify-center">
      <div id="board" className="relative flex h-[80vh] w-[80vh] flex-wrap">
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            if (cell === null) {
              const move = moves.find(
                move => move.row === rowIdx && move.col === colIdx
              );
              return (
                <Cell>
                  {move && (
                    <Move
                      onClick={() => {
                        setPickedFigure({});
                        setMoves([]);
                        dispatch(
                          moveFigure({
                            from: {
                              row: pickedFigure.rowIdx,
                              col: pickedFigure.colIdx
                            },
                            to: move
                          })
                        );
                      }}
                    />
                  )}
                </Cell>
              );
            } else {
              return (
                <Figure
                  onClick={() => moveHandler({ ...cell, rowIdx, colIdx })}
                  color={cell.color}
                  type={cell.type}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default App;
