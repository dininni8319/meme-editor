import React, { useState } from 'react'
import './App.css'
import Navbar from '@/components/Navbar/navbar'
import Canvas from '@/components/Canvas/canvas'
import useEvent from './hooks/useEvent'

const App = () => {
  const { handleDrop } = useEvent()

  return (
    <div className="grid md:grid-cols-6">
      <Navbar />
      {/* canvas */}
      <div className="md:col-span-5 md:w-60 assets-container">
        <div id="icons-container" className="grid grid-cols-2 gap-2"></div>
        <div id="text-container" className="grid grid-cols-1 gap-2"></div>
        <div id="canvas_cont">
          <Canvas onDrop={handleDrop} />
        </div>
      </div>
    </div>
  )
}

export default App
