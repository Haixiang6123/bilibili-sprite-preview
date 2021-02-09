import * as React from 'react'
import {useCallback, useRef} from 'react'
import './styles.scss'

interface Props {
  width: number;
  height: number;
  rows: number;
  cols: number;
  previewSprite?: string;
}

const Cover: React.FC<Props> = (props) => {
  const {children, width, height, rows, cols, previewSprite} = props

  const $cover = useRef<HTMLDivElement>(null);
  const $progress = useRef<HTMLDivElement>(null);
  const $preview = useRef<HTMLDivElement>(null);

  // Calculate how many preview pictures in the sprite pic
  const totalPicNum = rows * cols;

  const baseStyle = {
    width,
    height,
  }

  const previewImgStyle = {
    ...baseStyle,
    backgroundImage: `url("${previewSprite}")`,
  }

  const onMouseMove = useCallback((e) => {
    if (!$cover.current || !$progress.current || !$preview.current) return;

    // Update progress
    const rect = $cover.current.getBoundingClientRect()
    const offsetX = Math.abs(e.pageX - rect.left); // The x offset of mouse with 'cover' div element
    const percentage = offsetX / rect.width;
    const progress = percentage * 100;
    $progress.current.style.width = `${progress}%`;

    // Update preview pic
    const curtPic = Math.round(totalPicNum * percentage); // Looking for the curt preview pic
    const curtPicPos = { // Position of curt preview pic in the sprite pic
      x: (curtPic % cols) * width,
      y: (Math.floor(curtPic / cols)) * height
    };
    $preview.current.style.backgroundPosition = `-${curtPicPos.x}px -${curtPicPos.y}px`;
  }, [])

  return (
    <div ref={$cover} style={baseStyle} className="cover" onMouseMove={onMouseMove}>
      {/* The elements that are in the front */}
      <div className="front">
        {/* Header progress bar*/}
        <div className="header">
          <div className="track">
            <div ref={$progress} className="progress" />
          </div>
        </div>

        {/* Preview: sprite cover */}
        {previewSprite && <div ref={$preview} style={previewImgStyle} className="preview"/>}
      </div>

      {/* The elements that are in the back */}
      <div className="back">
        {/* Content */}
        {children}
      </div>
    </div>
  )
}

export default Cover
