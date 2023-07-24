import React,{ useEffect, useRef, FC } from 'react'
import { fabric } from 'fabric'
import useEvent from '@/hooks/useEvent';
import htmlToCanvas from 'html2canvas'

interface DropZoneProps {
  onDrop: (file: File) => void;
}

const Canvas:FC<DropZoneProps> = ({ onDrop }) => {
  const canvasRef = useRef<fabric.Canvas | null>(null)
  const { handleDragOver } = useEvent()
  
  useEffect(() =>{
    if (!canvasRef ||!canvasRef.current){return;}

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 400,
      backgroundColor: '#fff'
    })

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
          img.set({ left: 180 , top: 150})
          canvas.add(img)
        })
      }
      
      if (fontSize) {
        const text = new fabric.Text('Add text', {
          left: 50, 
          top: 50,
          fontSize: Number(fontSize),
          fill: 'black'
        })
                  
        canvas.add(text)
      }
      if (videoUrl) {
        videoEl.src = videoUrl
        videoEl.onloadedmetadata = () => {
          const rect = new fabric.Rect({
            // width: videoEl.videoWidth,
            // height: videoEl.videoHeight,
            left: 50,
            top: 50,
            fill: 'black'
          })
          canvas.add(rect)
          canvas.renderOnAddRemove = false
          
          const render = () => {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(rect?.left, rect.top, 400, 400);
            ctx.drawImage(videoEl, rect.left, rect.top, 400, 400);
            canvas.requestRenderAll();
            requestAnimationFrame(render);
          };

          videoEl.play();
          render();
        }         
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