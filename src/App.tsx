import React from 'react'
import SpritePreview from 'lib/Cover'
import sprite from 'assets/sprite.jpg'
import content from 'assets/content.webp'

function App() {
  const spriteOptions = {
    rows: 10,
    cols: 10,
    src: sprite
  }

  const cover = (
    <div style={{ position: 'absolute', right: 0, bottom: 0}}>Hello</div>
  )

  return (
    <div className="App">
      <SpritePreview width={160} height={90} spriteOptions={spriteOptions} cover={cover}>
        <img style={{width: 160, height: 90}} src={content} alt="content"/>
      </SpritePreview>
    </div>
  )
}

export default App
