import * as React from 'react'
import './styles.scss'

interface Props {
  width?: number | string;
  height?: number | string;
  previewSprite?: string;
}

const Cover: React.FC<Props> = (props) => {
  const {children, previewSprite} = props;

  // 预览图片的样式
  const previewImgStyle = {
    height: 127,
    width: 203,
    backgroundImage: `url("${previewSprite}")`,
    backgroundPosition: '0px 0px',
    backgroundSize: 2030,
  }

  return (
    <div>
      <div className="cover">
        <div>header</div>
        {/* Preview: sprite cover */}
        {previewSprite && <div style={previewImgStyle} />}
      </div>

      <div className="">
        {/* Content */}
        {children}
      </div>
    </div>
  )
}

export default Cover
