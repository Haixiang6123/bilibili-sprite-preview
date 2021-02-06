import * as React from 'react'
import classNames from 'classnames'
import {useState} from 'react'
import './styles.scss'

interface Props {
  width?: number | string;
  height?: number | string;
  previewSprite?: string;
}

const Cover: React.FC<Props> = (props) => {
  const {children, width, height, previewSprite} = props;

  const [hover, setHover] = useState<boolean>(false);

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

  return (
    <div className="cover" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="front">
        {/* Header progress bar*/}
        <div className="header">header</div>

        {/* Mask */}
        <div style={baseStyle} className={classNames('mask', {active: hover})} />

        {/* Preview: sprite cover */}
        {previewSprite && <div style={previewImgStyle} />}
      </div>

      <div className="back">
        {/* Content */}
        {children}
      </div>
    </div>
  )
}

export default Cover
