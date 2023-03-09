import React from 'react';

const Cell = props => {
  return (
    <div className={`cell ${props.color ? 'white' : 'green'}`}>
      {props.children}
    </div>
  );
};

export default Cell;
