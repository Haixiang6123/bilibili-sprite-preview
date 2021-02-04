import * as React from 'react'

interface Props {
  width?: number | string;
  height?: number | string;
  previewSprite?: string;
}

const Cover: React.FC<Props> = (props) => {
  const {children, previewSprite} = props;

  return (
    <div>
      { previewSprite && <img src={previewSprite} alt="sprites"/> }

      {children}
    </div>
  )
}

export default Cover
