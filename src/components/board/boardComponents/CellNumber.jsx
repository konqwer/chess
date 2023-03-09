import React from 'react';

const CellNumber = props => {
  return (
    <div className="absolute inset-0">
      row:{props.rowIdx}col:{props.colIdx}
    </div>
  );
};

export default CellNumber;
