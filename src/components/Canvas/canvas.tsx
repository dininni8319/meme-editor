import { useEffect } from 'react'
import useEvent from '@/hooks/useEvent'
import useIsMobile from '@/hooks/useIsMobile'
import useCanvas from '@/hooks/useCanvas'

const Canvas = () => {
  const { handleDragOver, handleDropElement, handleKeyDown, handleBounderies } =
    useEvent()
  const isMobile = useIsMobile()
  const { canvasElementRef, fabricCanvasRef } = useCanvas(isMobile)

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

    window.addEventListener('drop', (event) => handleDropElement(event, canvas))

    window.addEventListener('dragover', (event) => {
      event.preventDefault()
    })

    window.addEventListener('keydown', (event: KeyboardEvent) => handleKeyDown(event, canvas))
  }, [
    canvasElementRef,
    fabricCanvasRef,
    handleKeyDown,
    handleDragOver,
    handleDropElement,
    handleBounderies,
  ])

  const downloadCanvasAsImage = () => {
    const canvas = fabricCanvasRef.current
    if (!canvas) {
      return
    }
    const link = document.createElement('a')
    link.download = 'image.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <>
      <canvas ref={canvasElementRef} onDragOver={handleDragOver}></canvas>
      <button
        onClick={downloadCanvasAsImage}
        className="mt-5 bg-[#22233E] p-3 rounded-md shadow-2xl"
      >
        Download Canvas
      </button>
    </>
  )
}

export default Canvas