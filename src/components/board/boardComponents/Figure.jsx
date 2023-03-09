import React from 'react';

const Figure = props => {
  return (
    <div
      onClick={props.onClick}
      className={'figure ' + props.color + props.type}
    />
  );
};

export default Figure;
