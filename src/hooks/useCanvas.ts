import { useRef, useEffect } from 'react'
import { fabric } from 'fabric'


const useCanvas = (isMobile: boolean) => {
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)

  useEffect(() => {
    if (!canvasElementRef.current) return
    const canvas = new fabric.Canvas(canvasElementRef.current, {
      width: isMobile ? 300 : 400,
      height: isMobile ? 300 : 400,
      backgroundColor: '#fff',
    })
    fabricCanvasRef.current = canvas
  }, [isMobile])

return { canvasElementRef, fabricCanvasRef }
}

export default useCanvas