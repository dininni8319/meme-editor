import { useState, useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import useEvent from '@/hooks/useEvent'

const Canvas = () => {
  const canvasRef = useRef(null)
  const { handleDragOver } = useEvent()

  useEffect(() => {
    const canvasEl = canvasRef.current
    const canvas = new fabric.Canvas(canvasEl, {
      width: 500,
      height: 500,
      backgroundColor: '#fff',
      hoverCursor: 'pointer',
      selection: true,
    })

    if (!canvas && canvasEl === null) {
      return
    }

    // Dragover event to allow drop
    canvasEl.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault()
    });

    // Drop event
    canvasEl.addEventListener('drop', (event: DragEvent) => {
      
      event.preventDefault()
      const imageUrl = event.dataTransfer?.getData('text/plain')
      console.log("🚀 ~ file: canvas.tsx:33 ~ canvasEl.addEventListener ~ imageUrl:", imageUrl)

      if (!event.target || !event.dataTransfer) {
        return
      }
      const reader = new FileReader();
      reader.onload = function (event) {
        const imgObj = new Image();
        if (!imgObj.src) return

        imgObj.src = event.target.result;
        imgObj.onload = function () {
          const img = new fabric.Image(imgObj);
          img.scale(0.2);
          canvas.centerObject(img);
          canvas.add(img);
          canvas.renderAll();
        };
      }
      reader.readAsDataURL(event.dataTransfer.files[0]);
    });

  }, [])

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}

export default Canvas