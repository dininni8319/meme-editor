import { useEffect } from 'react'
import useEvent from '@/hooks/useEvent'
import useIsMobile from '@/hooks/useIsMobile'
import useCanvas from '@/hooks/useCanvas'
import { handleDownload } from '@/utils'

const Canvas = () => {
  const {
    handleDragOver,
    handleDropElement,
    handleKeyDown,
    handleBounderies,
    handleClearCanvas,
  } = useEvent()

  const isMobile = useIsMobile()
  const { canvasElementRef, fabricCanvasRef } = useCanvas(isMobile)
  const frames: any[] = []

  useEffect(() => {
    const canvas = fabricCanvasRef?.current

    if (!canvas) return
    canvas.on('mouse:wheel', function (opt) {
      const delta = opt.e.deltaY
      let zoom = canvas.getZoom()
      zoom *= 0.999 ** delta
      if (zoom > 20) zoom = 20
      if (zoom < 0.01) zoom = 0.01
      canvas.setZoom(zoom)
      opt.e.preventDefault()
      opt.e.stopPropagation()
    })

    canvas.on('object:modified', (event) => handleBounderies(event, canvas))

    window.addEventListener('drop', (event) => {
      handleDropElement(event, canvas, frames)
    })

    window.addEventListener('dragover', (event) => {
      event.preventDefault()
    })

    window.addEventListener('keydown', (event: KeyboardEvent) =>
      handleKeyDown(event, canvas)
    )
  }, [
    canvasElementRef,
    fabricCanvasRef,
    handleKeyDown,
    handleDragOver,
    handleDropElement,
    handleBounderies,
    frames,
  ])

  return (
    <>
      <canvas ref={canvasElementRef} onDragOver={handleDragOver}></canvas>
      <button
        onClick={() => handleDownload(frames)}
        className="mt-5 bg-[#22233E] p-3 rounded-md shadow-2xl"
        id="canvas"
      >
        Download Canvas
      </button>

      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleClearCanvas(e, fabricCanvasRef?.current)
        }
        className="mt-5 bg-[#22233E] p-3 rounded-md shadow-2xl"
        id="canvas"
      >
        Clear Canvas
      </button>
    </>
  )
}

export default Canvas
