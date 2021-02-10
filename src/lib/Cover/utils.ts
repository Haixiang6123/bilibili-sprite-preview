/**
 * Get x offset of mouse within given wrapper in percentage
 * @param wrapper: The wrapper
 * @param pageX: Parameter from MouseEvent: e.pageX
 */
export const getMouseXPercent = (wrapper: HTMLElement, pageX: number) => {
  const rect = wrapper.getBoundingClientRect()
  // The x offset of mouse with 'cover' div element
  const offsetX = Math.abs(pageX - rect.left)
  // Get x offset percentage within that element
  return  offsetX / rect.width
}

/**
 * Locate the position of the preview pic within sprite pic by given nth, cols
 * @param nthPic: The nth pic you wanna preview
 * @param cols: The number of columns in sprite pic
 * @param width: Wrapper width
 * @param height: Wrapper height
 */
export const locateSpritePic = (nthPic: number, cols: number, width: number, height: number) => {
  // Position of curt preview pic in the sprite pic
  return {
    x: (nthPic % cols) * width,
    y: (Math.floor(nthPic / cols)) * height
  }
}
