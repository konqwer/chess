import React from 'react';

const Cell = props => {
  return <div className="cell">{props.children}</div>;
};

export default Cell;