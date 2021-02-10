import * as React from 'react'
import {MouseEventHandler, useCallback, useRef} from 'react'
import './styles.scss'

interface SpriteOptions {
  rows: number;
  cols: number;
  src: string;
}

interface Props {
  width: number;
  height: number;
  spriteOptions: SpriteOptions
}

const SpritePreview: React.FC<Props> = (props) => {
  const {children, width, height, spriteOptions} = props

  const $wrapper = useRef<HTMLDivElement>(null)
  const $cover = useRef<HTMLDivElement>(null);
  const $progress = useRef<HTMLDivElement>(null)
  const $preview = useRef<HTMLDivElement>(null)
  const $content = useRef<HTMLDivElement>(null)

  // Calculate how many preview pictures in the sprite pic
  const totalPicNum = spriteOptions.rows * spriteOptions.cols

  const baseStyle = {
    width,
    height,
  }

  const previewImgStyle = {
    ...baseStyle,
    backgroundImage: `url("${spriteOptions.src}")`,
  }

  const onMouseEnter: MouseEventHandler = useCallback(() => {
    if (!$cover.current || !$content.current) return

    $cover.current.style.opacity = '1'
    $content.current.style.opacity = '0'
  }, [])

  const onMouseLeave: MouseEventHandler = useCallback(() => {
    if (!$cover.current || !$content.current) return

    $cover.current.style.opacity = '0'
    $content.current.style.opacity = '1'
  }, [])

  const onMouseMove: MouseEventHandler = useCallback((e) => {
    if (!$wrapper.current || !$progress.current || !$preview.current) return

    // Update progress
    const rect = $wrapper.current.getBoundingClientRect()
    const offsetX = Math.abs(e.pageX - rect.left) // The x offset of mouse with 'cover' div element
    const percentage = offsetX / rect.width
    const progress = percentage * 100
    $progress.current.style.width = `${progress}%`

    // Update preview pic
    const curtPic = Math.round(totalPicNum * percentage) // Looking for the curt preview pic
    const curtPicPos = { // Position of curt preview pic in the sprite pic
      x: (curtPic % spriteOptions.cols) * width,
      y: (Math.floor(curtPic / spriteOptions.cols)) * height
    }
    $preview.current.style.backgroundPosition = `-${curtPicPos.x}px -${curtPicPos.y}px`
  }, [])

  return (
    <div ref={$wrapper} style={baseStyle}
         className="wrapper"
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
         onMouseMove={onMouseMove}>
      {/* The elements that are in the front */}
      <div ref={$cover} className="cover">
        {/* Header progress bar*/}
        <div className="header">
          <div className="track">
            <div ref={$progress} className="progress"/>
          </div>
        </div>

        {/* Preview: sprite cover */}
        <div ref={$preview} style={previewImgStyle} className="sprite"/>
      </div>

      {/* The elements that are in the back */}
      <div ref={$content} className="content">
        {/* Content */}
        {children}
      </div>
    </div>
  )
}

export default SpritePreview
