import React from 'react'
import SpritePreview from 'lib/SpritePreview'
import sprite from 'assets/sprite.jpg'
import content from 'assets/content.webp'
import './styles.scss'

function App() {
  const spriteOptions = {
    rows: 10,
    cols: 10,
    src: sprite
  }

  const cover = (
    <div style={{ position: 'absolute', right: 0, bottom: 0}}>Hello</div>
  )

  const duration = (
    <span className="duration">
      08:00
    </span>
  )

  return (
    <div className="App">
      <SpritePreview width={160} height={90} spriteOptions={spriteOptions} cover={cover}>
        <a href="https://www.bilibili.com/video/BV1cV411B7RY" target="_blank" rel="noreferrer">
          <img style={{width: 160, height: 90}} src={content} alt="content"/>

          <footer>{duration}</footer>
        </a>
      </SpritePreview>
    </div>
  )
}

export default App
