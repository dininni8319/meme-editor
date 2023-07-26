import './App.css'
import Navbar from '@/components/Navbar/navbar'
import Canvas from '@/components/Canvas/canvas'

const App = () => {

  return (
    <div className="grid md:grid-cols-6">
      <Navbar />
      {/* canvas */}
      <div className="md:col-span-5 md:w-9/12 assets-container">
        <div id="icons-container" className="grid grid-cols-2 gap-2"></div>
        <div id="text-container" className="grid grid-cols-1 gap-2"></div>
        <div id="canvas_cont" className=' mt-5 md:mt-10 w-full flex flex-col items-center'>
          <Canvas />
        </div>
      </div>
    </div>
  )
}

export default App
