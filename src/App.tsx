import React from 'react';
import Cover from 'lib/Cover';
import sprite from 'assets/sprite.jpg';

function App() {
  return (
    <div className="App">
      <Cover width={203} height={127} previewSprite={sprite}>
        Hello
      </Cover>
    </div>
  );
}

export default App;
