import React, { useState, useEffect, useRef, FC, useCallback } from 'react'
import { fabric } from 'fabric'
import useEvent from '@/hooks/useEvent'
import useIsMobile from '@/hooks/useIsMobile'

interface DropZoneProps {
  onDrop: (file: File) => void
}

const Canvas: FC<DropZoneProps> = ({ onDrop }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ canvasState,  setCanvasState ] = useState(null)
  const { handleDragOver } = useEvent()
  const isMobile = useIsMobile()

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: isMobile ? 300 : 400,
      height: isMobile ? 300: 400,
      backgroundColor: '#fff',
    })

    // Save the canvas instance in the ref so we can access it later
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    canvasRef.current.canvasInstance = canvas;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const canvas = canvasRef?.current?.canvasInstance;
    if (!canvasRef || !canvas) {
      return
    }

    window.addEventListener('drop', (event: DragEvent) => {
      event.preventDefault()
      const videoUrl = event.dataTransfer?.getData('video')
      const emojis = event.dataTransfer?.getData('emojis')
      const videoEl = document.createElement('video')
      const imageUrl = event.dataTransfer?.getData('text/plain')
      const fontSize = event.dataTransfer?.getData('text')
      
      if (imageUrl) {
        fabric.Image.fromURL(imageUrl, (img) => {
          img.scaleToWidth(400)
          img.scaleToHeight(400)
          img.center()
          canvas.add(img)
        })
      }

      if (emojis) {
        fabric.Image.fromURL(emojis, (img) => {
          img.scaleToWidth(40)
          img.scaleToHeight(40)
          img.set({ left: 180, top: 150 })
          canvas.add(img)
        })
      }

      if (fontSize) {
        const text = new fabric.IText('Add text', {
          left: 50,
          top: 50,
          fontSize: Number(fontSize),
          fill: 'black',
        })

        canvas.add(text)
      }
      if (videoUrl) {
        videoEl.src = videoUrl
        videoEl.onloadedmetadata = () => {
          const rect = new fabric.Rect({
            left: 50,
            top: 50,
            fill: 'black',
          })
          canvas.add(rect)
          canvas.renderOnAddRemove = false

          const render = () => {
            const ctx = canvas.getContext('2d')
            ctx.clearRect(rect?.left, rect.top, 400, 400)
            ctx.drawImage(videoEl, rect.left, rect.top, 400, 400)
            canvas.requestRenderAll()
            requestAnimationFrame(render)
          }
          videoEl.play()
          render()
        }
      }
    })

    window.addEventListener('dragover', (event) => {
      event.preventDefault()
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      // 46 is the key code for the Delete key, 8 for Backspace
      
      event.preventDefault()
      if (event.keyCode === 46 || event.keyCode === 8) {
        const activeObject = canvas.getActiveObject()
        if (
          activeObject &&
          activeObject.type === 'i-text' &&
          activeObject.isEditing
        ) {
          return
        }
        if (activeObject) {
          canvas.remove(activeObject)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
  
  }, [canvasState, isMobile, canvasRef])

  const downloadCanvasAsImage = () => {
    const canvas = canvasRef.current
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
      <canvas ref={canvasRef} onDragOver={handleDragOver}></canvas>
      <button onClick={downloadCanvasAsImage} className='mt-5 bg-[#22233E] p-3 rounded-md shadow-2xl'>Download Canvas</button>
    </>
  )
}

export default Canvas
