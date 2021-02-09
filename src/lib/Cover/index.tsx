import * as React from 'react'
import {useCallback, useRef, useState} from 'react'
import './styles.scss'

interface Props {
  width?: number | string;
  height?: number | string;
  previewSprite?: string;
}

const Cover: React.FC<Props> = (props) => {
  const {children, width, height, previewSprite} = props

  const $cover = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState<number>(0)

  const baseStyle = {
    width,
    height,
  }

  const previewImgStyle = {
    ...baseStyle,
    backgroundImage: `url("${previewSprite}")`,
    backgroundPosition: '0px 0px',
    backgroundSize: 2030,
  }

  const progressStyle = {
    width: `${progress}%`,
  }

  const onMouseMove = useCallback((e) => {
    if (!$cover || !$cover.current) return;

    const rect = $cover.current.getBoundingClientRect()

    const x = Math.abs(e.pageX - rect.left);

    setProgress(x / rect.width * 100);
  }, [])

  return (
    <div ref={$cover} style={baseStyle} className="cover" onMouseMove={onMouseMove}>
      {/* The elements that are in the front */}
      <div className="front">
        {/* Header progress bar*/}
        <div className="header">
          <div className="track">
            <div style={progressStyle} className="progress" />
          </div>
        </div>

        {/* Preview: sprite cover */}
        {previewSprite && <div style={previewImgStyle}/>}
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
