import { useState, useEffect } from 'react'
import logo from '@/assets/logo.svg'
import uploads from '@/assets/uploads.svg'
import imageSVG from '@/assets/image.svg'
import text from '@/assets/text.svg'
import audio from '@/assets/audio.svg'
import video from "@/assets/video.svg";
import objects from '@/assets/shape.svg'
import collapse from '@/assets/collapse.svg'
import { emojis, shapes } from './assets-imports';
import Shapes from './shapes'
import Emojis from './emojis'
import Uploads from './upoads'
import Images from './images'
import { access_key, secret_key } from '@/utils/'

const Navbar = () => {
  const [ isExpanded, setIsExpanded ] = useState(false)
  const [ navbarSection, setNavbarSection ] = useState<string | undefined>('')
  const [ images, setImages ] = useState<string[] | []>([])
  const [imageUpload , setImageUpload ] = useState<string[] | []>([]) 

  const toggleSideBar = (str: string) => {
    setNavbarSection(str)
    setIsExpanded(!isExpanded)
  }

  const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files

    if (file && file[0]) {
      const arr: string[] = []
      const fileUrl = URL.createObjectURL(file[0])
      arr.push(fileUrl)
      setImageUpload((prev: string[] | []) =>  arr.concat(prev))
    }
  }
// https://api.unsplash.com/search/photos?query=minimal
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('https://picsum.photos/v2/list?page=2&limit=10')
      const data: unknown  = await res.json()
      
      const arr: string[] = []
      data?.map(({download_url}: {download_url: string}) => {
        arr.push(download_url)
      })
      setImages(arr)
    }
    fetchImages()
  },[])
  
  return (
    <div className='flex w-full'>
      <div className="w-20">
        <div className="flex flex-col items-center py-5">
          <img src={logo} alt="logo" />
        </div>
        <ul className='text-sm text-gray'>
          <li className='flex flex-col items-center py-5' onClick={() => toggleSideBar('uploads')}>
            <img className='icon-nav' src={uploads} alt="logo icon" />
            <span>Uploads</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={() => toggleSideBar('objects')}>
            <img className='icon-nav' src={objects} alt="uploads icon"/>
            <span>Objects</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={() => toggleSideBar('image')}>
            <img className='icon-nav' src={imageSVG} alt="image icon"/>
            <span>Images</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={() => toggleSideBar('text')}>
            <img className='icon-nav' src={text} alt="text icon"/>
            <span>Text</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={() => toggleSideBar('video')}>
            <img className='icon-nav' src={video} alt="video icon"/>
            <span>
              Videos
            </span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={() => toggleSideBar('audio')}>
            <img className='icon-nav' src={audio} alt="audio icon"/>
            <span>
              Audio
            </span>
          </li>
        </ul>
      </div>
      <div className={isExpanded ? `absolute bg-[#141629] w-60 h-full left-[7%] z-50 flex flex-col` : ""}>
          <div className='flex items-center justify-between py-2 px-1'>
            <span className={isExpanded ? 'text-white capitalize text-xl' : "hidden"}>{navbarSection}</span>
            <button onClick={() => toggleSideBar('')} className={isExpanded ? 'text-2xl pe-2 pt-3' : 'hidden'}>
              <img className='icon-nav' src={collapse} alt="collapse icon"/>
            </button>
          </div>
          <div className={navbarSection !== 'uploads'? 'grid grid-cols-4 gap-2 overflow-y-scroll custom-scrollbar' :"w-full"}>
             {navbarSection === 'objects' && <Shapes isExpanded={isExpanded} shapes={shapes} />}
             {navbarSection === 'objects' && <Emojis isExpanded={isExpanded} emojis={emojis} />}
             {navbarSection === 'image' && <Images isExpanded={isExpanded} />}
             {navbarSection === 'uploads' && (
                <Uploads 
                  isExpanded={isExpanded}
                  images={imageUpload}
                  handleImages={handleImages}
                />
             )}
          </div>
      </div>
    </div>
  )
}

export default Navbar