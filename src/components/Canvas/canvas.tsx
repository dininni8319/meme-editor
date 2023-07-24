import React,{ useEffect, useRef, FC } from 'react'
import { fabric } from 'fabric'
import useEvent from '@/hooks/useEvent';

interface DropZoneProps {
  onDrop: (file: File) => void;
}

const Canvas:FC<DropZoneProps> = ({ onDrop }) => {
  const canvasRef = useRef<fabric.Canvas | null>(null)
  const { handleDragOver } = useEvent()
  useEffect(() =>{
    if (!canvasRef ||!canvasRef.current){return;}

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: '#fff'
    })

    window.addEventListener('drop', (event: DragEvent) => {
      event.preventDefault()
      const imageUrl = event.dataTransfer?.getData('text/plain')
      if (imageUrl) {
        fabric.Image.fromURL(imageUrl, (img) => {
          img.scaleToWidth(200)
          img.scaleToHeight(200)
          canvas.add(img)
        })
      }
    })

    window.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault()
    });

    },[])

  return (
    <canvas 
      ref={canvasRef}
      onDragOver={handleDragOver}
    ></canvas>
  )
}

export default Canvas