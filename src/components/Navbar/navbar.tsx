/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useEffect } from 'react'
import collapse from '@/assets/collapse.svg'
import { emojis, shapes, audios } from './assets-imports';
import NavigationTabs from './navigation-tabs';
import Shapes from './shapes'
import Emojis from './emojis'
import Uploads from './upoads'
import Images from './images'
import { access_key, pexels_video } from '@/utils/'
import Audio from './audio';
import Text from './text';
import Video from './video';
import { NavbarState } from '../../store/navbarSlice'
import { useSelector, useDispatch } from 'react-redux'
import { extended } from "../../store/navbarSlice";

const Navbar = () => {
  const [ isExpanded, setIsExpanded ] = useState(false)
  const [ activeTab, setActiveTab ] = useState<string | undefined>('')
  const [ images, setImages ] = useState<[]>([])
  const [ videos, setVideos ] = useState<[]>([])
  const [ imageUpload , setImageUpload ] = useState<string[] | []>([]) 
  const [ error, setError] = useState('')
  const [ query, setQuery] = useState('')
  const [ searchVideo, setSearchVideo] = useState('')
  const [ videoUpload, setVideoUpload ] = useState<string[] | []>([])
  const [ audio, setAudio ] = useState([])
  
  // let { nav  } = useSelector<{nav: NavbarState}>((state) => state.nav)
  // const isExpanded = nav?.isExpanded || false

  // console.log("🚀 ~ file: navbar.tsx:31 ~ Navbar ~ isExpanded:", isExpanded)
  // const dispatch = useDispatch()
   
  const dragElement = (event: DragEvent): void => {
    const target = event.target as HTMLElement
    event?.dataTransfer?.setData("id", target.id)
  }


  const handleCloseSearch = () => setImages([])
  const handleCloseSearchVideo = () => setVideos([])
  const show = activeTab !== 'uploads' &&
               activeTab !== 'audio' && 
               activeTab !== 'text' &&
               activeTab !== 'video'

  const handleTabClick = (tab: string) => {
    if (tab === activeTab) {
    setIsExpanded(false)
      setActiveTab('')
    }
    else {
      setIsExpanded(true)
      setActiveTab(tab)
    }
  }

  const handleFileString = (file: File):string[] => {
    const arr: string[] = []
    const fileUrl = URL.createObjectURL(file)
    arr.push(fileUrl)
    return arr
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files[0]

    if (file) {
      if (file.type.startsWith('image/')) {
        const arrOfFilesToString = handleFileString(file)
        setImageUpload((prev: string[] | []) =>  arrOfFilesToString.concat(prev))
      } else if (file.type.startsWith('video/')) {
        const arrOfFilesToString = handleFileString(file)
        setVideoUpload((prev: string[] | []) =>  arrOfFilesToString.concat(prev))
      } 
    }
  }

  useEffect(() => {
    const fetchImages = async () => {
      if (query.length > 0) {
        
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
    }
      fetchImages()
    },[query])
  
    useEffect(() => { 
      const fetchVideos = async () => {
        if (searchVideo.length > 0) {
          try {
            const res = await fetch(`https://api.pexels.com/videos/search?query=${searchVideo}`,
              {
                method: 'GET',
                headers: {
                  Authorization: pexels_video,
                },
              }
            )
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { videos: data } = await res.json()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            setVideos(prev => [...data,...prev])
          } catch (error) {
            if (error instanceof Error) {
              const message = error.message  || 'Something went wrong'
              setError(prev => prev = message)
            }
          }
        }
      }
    fetchVideos()
  },[searchVideo])

  return (
    <div className='flex w-full'>
      <NavigationTabs handleTabClick={handleTabClick} />
      <div className={isExpanded ? `absolute bg-[#141629] w-64 h-4/6 md:h-5/6 left-[20%] md:left-[7%] z-50 flex flex-col ease-in duration-500` : ""}>
          <div className='flex items-center justify-between py-2 px-1'>
            <span className={isExpanded ? 'text-white capitalize text-xl' : "hidden"}>{activeTab}</span>
            <button onClick={() => setIsExpanded(false)} className={isExpanded ? 'text-2xl pe-2 pt-3' : 'hidden'}>
              <img className='icon-nav' src={collapse} alt="collapse icon"/>
            </button>
          </div>
          <div className={show ? 'grid grid-cols-4 gap-2 overflow-y-scroll custom-scrollbar h-3/6 relative top-[3%]' : "w-full overflow-y-scroll custom-scrollbar h-3/6"}>
             {activeTab === 'objects' && <Shapes isExpanded={isExpanded} shapes={shapes} />}
             {activeTab === 'objects' && <Emojis isExpanded={isExpanded} emojis={emojis} />}
             {activeTab === 'image' && ( 
                <Images 
                  isExpanded={isExpanded} 
                  setQuery={setQuery} 
                  images={images} 
                  handleCloseSearch={handleCloseSearch}
                />
              )}
             {activeTab === 'uploads' && (
                <Uploads 
                  isExpanded={isExpanded}
                  imageUpload={imageUpload}
                  handleFileUpload={handleFileUpload}
                  videoUpload={videoUpload}
                />
             )}
             {activeTab === 'text' && <Text isExpanded={isExpanded} />}
             {activeTab === 'audio' && <Audio isExpanded={isExpanded} audios={audios} />}
             {activeTab === 'video' && (
                <Video 
                  isExpanded={isExpanded} 
                  setQuery={setSearchVideo} 
                  handleCloseSearch={handleCloseSearchVideo}
                  videos={videos} 
                />
              )}
          </div>
      </div>
    </div>
  )
}

export default Navbar