/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useEffect } from 'react'
import collapse from '@/assets/collapse.svg'
import { emojis, shapes, audios } from './assets-imports';
import NavigationList from './navigation-list';
import Shapes from './shapes'
import Emojis from './emojis'
import Uploads from './upoads'
import Images from './images'
import { access_key } from '@/utils/'
import Audio from './audio';

interface IError {
  message: string
}

const Navbar = () => {
  const [ isExpanded, setIsExpanded ] = useState(false)
  const [ navbarSection, setNavbarSection ] = useState<string | undefined>('')
  const [ images, setImages ] = useState<[]>([])
  const [ imageUpload , setImageUpload ] = useState<string[] | []>([]) 
  const [ error, setError] = useState('')
  const [ query, setQuery] = useState('')
  const toggleSideBar = (str: string) => {
    setNavbarSection(str)
    if (!isExpanded) {
      setIsExpanded(prev => prev = true)
    }
  }

  const handleCloseSearchBar = () => setImages(prev => prev = [])

  const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files

    if (file && file[0]) {
      const arr: string[] = []
      const fileUrl = URL.createObjectURL(file[0])
      arr.push(fileUrl)
      setImageUpload((prev: string[] | []) =>  arr.concat(prev))
    }
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}`, 
          {
            method: 'GET',
            headers: {
              Authorization: `Client-ID ${access_key}` ,            
            },
          }
        )
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { results: data } = await res.json()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        setImages(prev => [...data,...prev])
      } catch (error) {
        if (error instanceof Error) {
          const message = error.message  || 'Something went wrong'
          setError(prev => prev = message)
        }
      }
    }
    fetchImages()
  },[query])

  return (
    <div className='flex w-full'>
      <NavigationList toggleSideBar={toggleSideBar} />
      <div className={isExpanded ? `absolute bg-[#141629] w-64 h-full left-[7%] z-50 flex flex-col` : ""}>
          <div className='flex items-center justify-between py-2 px-1'>
            <span className={isExpanded ? 'text-white capitalize text-xl' : "hidden"}>{navbarSection}</span>
            <button onClick={() => setIsExpanded(prev => prev = false)} className={isExpanded ? 'text-2xl pe-2 pt-3' : 'hidden'}>
              <img className='icon-nav' src={collapse} alt="collapse icon"/>
            </button>
          </div>
          <div className={navbarSection !== 'uploads' && navbarSection !== 'audio' ? 'grid grid-cols-4 gap-2 overflow-y-scroll custom-scrollbar h-3/6 relative top-[3%]' :"w-full"}>
             {navbarSection === 'objects' && <Shapes isExpanded={isExpanded} shapes={shapes} />}
             {navbarSection === 'objects' && <Emojis isExpanded={isExpanded} emojis={emojis} />}
             {navbarSection === 'image' && ( 
                <Images 
                  isExpanded={isExpanded} 
                  setQuery={setQuery} 
                  images={images} 
                  handleCloseSearchBar={handleCloseSearchBar}
                />
              )}
             {navbarSection === 'uploads' && (
                <Uploads 
                  isExpanded={isExpanded}
                  images={imageUpload}
                  handleImages={handleImages}
                />
             )}
             {navbarSection === 'audio' && <Audio isExpanded={isExpanded} audios={audios} />}
          </div>
      </div>
    </div>
  )
}

export default Navbar