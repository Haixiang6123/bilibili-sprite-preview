import * as React from 'react'
import {MouseEventHandler, MouseEvent, useCallback, useRef, ReactNode} from 'react'
import './styles.scss'
import {within} from './utils'

interface SpriteOptions {
  rows: number;
  cols: number;
  src: string;
}

interface Props {
  width: number;
  height: number;
  cover?: ReactNode | string;
  spriteOptions: SpriteOptions
}

const SpritePreview: React.FC<Props> = (props) => {
  const {children, width, height, spriteOptions, cover} = props

  const $wrapper = useRef<HTMLDivElement>(null)
  const $cover = useRef<HTMLDivElement>(null)
  const $track = useRef<HTMLDivElement>(null)
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

  // Show cover and hide content
  const onMouseEnter: MouseEventHandler = useCallback(() => {
    if (!$cover.current || !$content.current) return

    $cover.current.style.opacity = '1'
    $content.current.style.opacity = '0'
  }, [])

  // Show content and hide cover
  const onMouseLeave: MouseEventHandler = useCallback(() => {
    if (!$cover.current || !$content.current) return

    $cover.current.style.opacity = '0'
    $content.current.style.opacity = '1'
  }, [])

  // Update progress when mouse is hover
  const updateProgress = useCallback((e: MouseEvent, trackElement: HTMLDivElement, progressElement: HTMLDivElement) => {
    const trackRect = trackElement.getBoundingClientRect()
    const percentage = (e.pageX - trackRect.left) / trackRect.width
    const progress = within(percentage * 100, 0, 100)
    progressElement.style.width = `${progress}%`

    return percentage
  }, [])

  // Update preview pic
  const updatePreviewPic = useCallback((percentage: number, previewElement: HTMLDivElement) => {
    const nthPic = Math.round(totalPicNum * percentage) // Looking for the curt preview pic
    const curtPicPos = {
      x: (nthPic % spriteOptions.cols) * width,
      y: (Math.floor(nthPic / spriteOptions.cols)) * height
    }
    previewElement.style.backgroundPosition = `-${curtPicPos.x}px -${curtPicPos.y}px`
  }, [height, spriteOptions.cols, totalPicNum, width])

  // Calculate progress and preview pic position of sprite pic
  const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!$wrapper.current || !$track.current || !$progress.current || !$preview.current) return

    const percentage = updateProgress(e, $track.current, $progress.current)

    updatePreviewPic(percentage, $preview.current)
  }, [updatePreviewPic, updateProgress])

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
          <div ref={$track} className="track">
            <div ref={$progress} className="progress"/>
          </div>
        </div>

        {/* Preview: sprite cover */}
        <div ref={$preview} style={previewImgStyle} className="sprite"/>

        {cover && <div className="custom-cover">{cover}</div>}
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
