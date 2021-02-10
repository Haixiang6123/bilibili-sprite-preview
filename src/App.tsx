import React from 'react'
import Cover from 'lib/Cover'
import sprite from 'assets/sprite.jpg'
import content from 'assets/content.webp'

function App() {
  return (
    <div className="App">
      <Cover width={160} height={90} spriteOptions={{rows: 10, cols: 10, src: sprite}}>
        <img style={{height: 90, width: 160}} src={content} alt=""/>
      </Cover>
    </div>
  )
}

export default App;
