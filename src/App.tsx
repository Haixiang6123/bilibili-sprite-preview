import React from 'react';
import Cover from 'lib/Cover';
import sprite from 'assets/sprite.jpg';

function App() {
  return (
    <div className="App">
      <Cover width={160} height={90} rows={10} cols={10} previewSprite={sprite}>
        Hello
      </Cover>
    </div>
  );
}

export default App;
