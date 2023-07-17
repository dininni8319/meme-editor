import { useState } from 'react'
import logo from '../assets/logo.svg'
import uploads from '../assets/uploads.svg'
import image from '../assets/image.svg'
import text from '../assets/text.svg'
import audio from '../assets/audio.svg'
import video from "../assets/video.svg";
import objects from '../assets/shape.svg'
import collapse from '../assets/collapse.svg'

const Navbar = () => {
  const [ isExpanded, setIsExpanded ] = useState(false)
  
  const toggleSideBar = () => setIsExpanded(!isExpanded)
  return (
    <div className='flex w-full'>
      <div className="w-20">
        <div className="flex flex-col items-center py-5">
          <img src={logo} alt="logo" />
        </div>
        <ul className='text-sm text-gray'>
          <li className='flex flex-col items-center py-5' onClick={toggleSideBar}>
            <img className='icon-nav' src={uploads} alt="logo icon" />
            <span>Uploads</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={toggleSideBar}>
            <img className='icon-nav' src={objects} alt="uploads icon"/>
            <span>Objects</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={toggleSideBar}>
            <img className='icon-nav' src={image} alt="image icon"/>
            <span>Images</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={toggleSideBar}>
            <img className='icon-nav' src={text} alt="text icon"/>
            <span>Text</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={toggleSideBar}>
            <img className='icon-nav' src={video} alt="video icon"/>
            <span>
              Videos
            </span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={toggleSideBar}>
            <img className='icon-nav' src={audio} alt="audio icon"/>
            <span>
              Audio
            </span>
          </li>
        </ul>
      </div>
      <div className={isExpanded ? `absolute bg-[#141629] w-60 h-full left-[7%] z-50 flex place-items-start justify-end` : ""}>
          <button onClick={toggleSideBar} className={isExpanded ? 'text-2xl pe-2 pt-3' : 'hidden'}>
             <img className='icon-nav' src={collapse} alt="collapse icon"/>
          </button>
      </div>
    </div>
  )
}

export default Navbar