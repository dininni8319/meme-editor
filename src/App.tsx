import { useState, useEffect } from 'react'
import './App.css'
import { fabric } from 'fabric'
import Navbar from '@/components/Navbar/navbar'

const App = () => {
   useEffect(() => {
     const canvas = new fabric.Canvas("canvas", {
       width: 500,
       height: 500,
       backgroundColor: "#fff",
     })  
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
