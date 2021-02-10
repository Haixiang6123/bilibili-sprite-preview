import React from 'react'
import SpritePreview from 'lib/SpritePreview'
import sprite from 'assets/sprite.jpg'
import content from 'assets/content.webp'
import './styles.scss'

function App() {
  const width = 160 * 1.3
  const height = 90 * 1.3

  const spriteOptions = {
    rows: 10,
    cols: 10,
    src: sprite
  }

  const duration = (
    <span className="duration">
      08:00
    </span>
  )

  return (
    <div className="App">
      <SpritePreview width={width} height={height} spriteOptions={spriteOptions}>
        <a href="https://www.bilibili.com/video/BV1cV411B7RY" target="_blank" rel="noreferrer">
          <img style={{width, height}} src={content} alt="content"/>

          <footer>{duration}</footer>
        </a>
      </SpritePreview>
    </div>
  )
}

export default App
