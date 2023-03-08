import React from 'react';
import Figure from './components/Figure';

const App = () => {
  const figures = [{ type: 'q', color: 'b', square: '63' }];
  return (
    <div className="flex items-center justify-center">
      <div className="board relative h-[80vh] w-[80vh]">
        {figures.map(figure => (
          <Figure
            type={figure.type}
            color={figure.color}
            square={figure.square}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
