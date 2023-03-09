import calculateFigureMoves from './calculateFigureMoves';

const calculateBoardMoves = board => {
  return board.map((row, rowIdx) => {
    return row.map((col, colIdx) => {
      if (col) {
        const curFigure = { ...col, row: rowIdx, col: colIdx };
        return { ...col, moves: calculateFigureMoves(curFigure, board) };
      } else {
        return null;
      }
    });
  });
};

export default calculateBoardMoves;
