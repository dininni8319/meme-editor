import { useEffect, useRef } from 'react'
import './App.css'
import { fabric } from 'fabric'
import Navbar from '@/components/Navbar/navbar'

const App = () => {
  let canvasRef = useRef<fabric.Canvas | null>(null)
  
  useEffect(() => {
     const canvas = new fabric.Canvas("canvas", {
       width: 500,
       height: 500,
       backgroundColor: "#fff",
     })  
    // Make canvas container draggable
    canvas.on('mouse:down', (options) => {
      if (options.target) {
        options.target.set('active', true);
      }
    });

    canvas.on('mouse:up', (options) => {
      if (options.target) {
        options.target.set('active', false);
      }
    });
     
    // Add images to the canvas and make them draggable
    const imageUrl = 'https://plus.unsplash.com/premium_photo-1677343210300-717fba46be17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60';
      fabric.Image.fromURL(imageUrl, (img) => {
        img.scale(0.5); // Set scale if needed
        img.set({ left: 100, top: 100, selectable: true, evented: true });

        // Handle drag start event
        img.on('mousedown', (event) => {
          const target = event.target;
          if (target) {
            target.set('active', true);
            canvasRef.current?.requestRenderAll();
          }
        });

        // Handle drag event
        img.on('moving', (event) => {
          // Do something when the image is being dragged
        });

        // Handle drag end event
        img.on('mouseup', (event) => {
          const target = event.target;
          if (target) {
            target.set('active', false);
            canvasRef.current?.requestRenderAll();
          }
        });

        canvasRef.current?.add(img);
    });

    canvasRef.current = canvas

      // Cleanup
    return () => {
      canvas.dispose();
    };
   },[])
  

  return (
    <div className='grid md:grid-cols-6'>
      <Navbar />
      {/* canvas */}
      <div className="md:col-span-5 md:w-60 assets-container">
        <div id="icons-container" className="grid grid-cols-2 gap-2">

        </div>
        <div id="text-container" className="grid grid-cols-1 gap-2">

        </div>
        <div id="canvas_cont">
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </div>
  )
}

export default App
