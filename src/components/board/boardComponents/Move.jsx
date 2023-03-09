import React from 'react';

const Move = props => {
  return <div className={props.type} onClick={props.onClick} />;
};

export default Move;
