import React from 'react';
import Cover from 'lib/Cover';
import sprite from 'assets/sprite.jpg';

function App() {
  return (
    <div className="App">
      <Cover previewSprite={sprite}>
        Hello
      </Cover>
    </div>
  );
}

export default App;
