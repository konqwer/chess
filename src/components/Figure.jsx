import React, { useEffect, useState } from 'react';

const Figure = props => {
  return (
    <div
      className={'figure ' + props.color + props.type}
      style={{
        top: parseInt(props.square / 8) * 12.5 + '%',
        left: parseInt(props.square % 8) * 12.5 + '%'
      }}
    />
  );
};

export default Figure;
