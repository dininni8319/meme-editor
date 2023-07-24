import { useEffect, useRef, FC } from 'react'
import './App.css'
import { fabric } from 'fabric'
import Navbar from '@/components/Navbar/navbar'

const App: FC =  () => {
  const canvasRef = useRef<fabric.Canvas | null>(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current,{
      width: 500,
      height: 500,
      backgroundColor: '#fff'
    })
    // add objects to the canvas here
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    })
    canvas.add(rect)
  }, [])


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
          <canvas id="canvas" ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  )
}

export default App
