const calculateFigureMoves = (figure, board) => {
  const checkDirection = (directionRow, directionCol, distance = 8) => {
    const movesArr = [];
    let rowI = figure.row + directionRow;
    let colI = figure.col + directionCol;
    let currentCell;
    while (
      !currentCell &&
      rowI >= 0 &&
      rowI <= 7 &&
      colI >= 0 &&
      colI <= 7 &&
      distance > 0
    ) {
      currentCell = board[rowI][colI];
      currentCell
        ? currentCell.color !== figure.color &&
          movesArr.push({ type: 'attack', row: rowI, col: colI })
        : movesArr.push({ type: 'move', row: rowI, col: colI });
      rowI += directionRow;
      colI += directionCol;
      distance--;
    }
    return movesArr;
  };
  const checkCell = (row, col) => {
    const arr = [];
    if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
      const cell = board[row][col];
      cell
        ? cell.color !== figure.color && arr.push({ type: 'attack', row, col })
        : arr.push({ type: 'move', row, col });
    }
    return arr;
  };

  const result = [];
  if (figure.type === 'p') {
    const row = figure.row;
    if (figure.color === 'w') {
      result.push(
        ...checkDirection(-1, 0, 1 + (row === 6)).filter(
          move => move.type !== 'attack'
        )
      );

      result.push(
        ...checkDirection(-1, -1, 1).filter(move => move.type === 'attack')
      );
      result.push(
        ...checkDirection(-1, 1, 1).filter(move => move.type === 'attack')
      );
    } else {
      result.push(
        ...checkDirection(1, 0, 1 + (row === 1)).filter(
          move => move.type !== 'attack'
        )
      );
      result.push(
        ...checkDirection(1, -1, 1).filter(move => move.type === 'attack')
      );
      result.push(
        ...checkDirection(1, 1, 1).filter(move => move.type === 'attack')
      );
    }
  } else if (figure.type === 'r') {
    result.push(...checkDirection(-1, 0));
    result.push(...checkDirection(1, 0));
    result.push(...checkDirection(0, 1));
    result.push(...checkDirection(0, -1));
  } else if (figure.type === 'n') {
    const row = figure.row;
    const col = figure.col;
    result.push(...checkCell(row - 1, col + 2));
    result.push(...checkCell(row + 1, col + 2));
    result.push(...checkCell(row - 1, col - 2));
    result.push(...checkCell(row + 1, col - 2));

    result.push(...checkCell(row + 2, col - 1));
    result.push(...checkCell(row + 2, col + 1));
    result.push(...checkCell(row - 2, col - 1));
    result.push(...checkCell(row - 2, col + 1));
  } else if (figure.type === 'b') {
    result.push(...checkDirection(-1, -1));
    result.push(...checkDirection(-1, 1));
    result.push(...checkDirection(1, 1));
    result.push(...checkDirection(1, -1));
  } else if (figure.type === 'k') {
    for (let rowI = -1; rowI < 2; rowI++) {
      for (let colI = -1; colI < 2; colI++) {
        const row = rowI + figure.row;
        const col = colI + figure.col;
        if (row <= 7 && row >= 0 && col <= 8 && col >= 0) {
          board[row][col]
            ? board[row][col].color !== figure.color &&
              result.push({ type: 'attack', row, col })
            : result.push({ type: 'move', row, col });
        }
      }
    }
  } else if (figure.type === 'q') {
    result.push(...checkDirection(-1, 0));
    result.push(...checkDirection(1, 0));
    result.push(...checkDirection(0, 1));
    result.push(...checkDirection(0, -1));

    result.push(...checkDirection(-1, -1));
    result.push(...checkDirection(-1, 1));
    result.push(...checkDirection(1, 1));
    result.push(...checkDirection(1, -1));
  }

  return result;
};

export default calculateFigureMoves;
