import { useEffect } from 'react'
import useEvent from '@/hooks/useEvent'
import useIsMobile from '@/hooks/useIsMobile'
import useCanvas from '@/hooks/useCanvas'

const Canvas = () => {
  const { handleDragOver, handleDropElement, handleKeyDown } = useEvent()
  const isMobile = useIsMobile()
  const { canvasElementRef, fabricCanvasRef } = useCanvas(isMobile)
  console.log("🚀 ~ file: canvas.tsx:10 ~ Canvas ~ fabricCanvasRef:", fabricCanvasRef)
  console.log("🚀 ~ file: canvas.tsx:10 ~ Canvas ~ canvasElementRef:", canvasElementRef)

  useEffect(() => {
    const canvas = fabricCanvasRef?.current;
    if (!canvas) return

    window.addEventListener('drop',(event) => handleDropElement(event, canvas))

    window.addEventListener('dragover', (event) => {
      event.preventDefault()
    });

    window.addEventListener('keydown',(event: KeyboardEvent) => handleKeyDown(event, canvas))
  
  }, [
    canvasElementRef, 
    fabricCanvasRef, 
    handleKeyDown, 
    handleDragOver, 
    handleDropElement
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
      <button onClick={downloadCanvasAsImage} className='mt-5 bg-[#22233E] p-3 rounded-md shadow-2xl'>Download Canvas</button>
    </>
  )
}

export default Canvas
