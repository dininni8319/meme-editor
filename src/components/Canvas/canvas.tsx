import { useEffect } from 'react'
import useEvent from '@/hooks/useEvent'
import useIsMobile from '@/hooks/useIsMobile'
import useCanvas from '@/hooks/useCanvas'
import { fabric } from 'fabric'
import { DropTargetMonitor } from 'react-dnd';
import DraggleItem from './draggleItem'
import imgSVG from '@/assets/images/image1.avif'

const Canvas = () => {
  const { handleDragOver, handleDropElement } = useEvent()
  const isMobile = useIsMobile()
  const { canvasElementRef, fabricCanvasRef } = useCanvas(isMobile)

  useEffect(() => {
    const canvas = fabricCanvasRef?.current;
    if (!canvas) return

    canvas.on('mouse:down', (event) => {
      if (event.target) {
        event.target.set({
          selectable: true,
          evented: true          
        })
      canvas.setActiveObject(event.target)
      }
    })
    // window.addEventListener('drop',(event) => handleDropElement(event, canvas))

    window.addEventListener('dragover', (event) => {
      event.preventDefault()
    });
    // window.addEventListener('keydown',(event: KeyboardEvent) => handleKeyDown(event, canvas))
  
  }, [
    canvasElementRef, 
    fabricCanvasRef,  
    handleDragOver, 
    handleDropElement
  ])

  interface DraggableItem {
  id: string;
  type: string;
}
   const handleDrop = (item: DraggableItem, monitor: DropTargetMonitor) => {
    const offset = monitor.getSourceClientOffset();
    const canvas = fabricCanvasRef?.current;
    if (offset && canvas) {
      const y = offset.y;
      const x = offset.x;
      if (item.type === "text") {
        const text = new fabric.Text(item.id, {
          left: x,
          top: y,
          fontSize: 20
        });
        canvas.add(text);
      } else if (item.type === "image") {
        fabric.Image.fromURL(item.id, function(img) {
          img.set({ left: x, top: y });
          canvas.add(img);
        });
      }
    }
  };

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
      <canvas ref={canvasElementRef} onDrag={handleDrop}></canvas>
      <button onClick={downloadCanvasAsImage} className='mt-5 bg-[#22233E] p-3 rounded-md shadow-2xl'>Download Canvas</button>
      <DraggleItem type="image" id='image1'>
       <img src={imgSVG} alt="image" />
      </DraggleItem>
    </>
  )
}

export default Canvas
