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
import Text from './text';

const Navbar = () => {
  const [ isExpanded, setIsExpanded ] = useState(false)
  const [ activeTab, setActiveTab ] = useState<string | undefined>('')
  const [ images, setImages ] = useState<[]>([])
  const [ imageUpload , setImageUpload ] = useState<string[] | []>([]) 
  const [ error, setError] = useState('')
  const [ query, setQuery] = useState('')

  const handleCloseSearch = () => setImages([])
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
      <NavigationList handleTabClick={handleTabClick} />
      <div className={isExpanded ? `absolute bg-[#141629] w-64 h-full left-[7%] z-50 flex flex-col` : ""}>
          <div className='flex items-center justify-between py-2 px-1'>
            <span className={isExpanded ? 'text-white capitalize text-xl' : "hidden"}>{activeTab}</span>
            <button onClick={() => setIsExpanded(prev => prev = false)} className={isExpanded ? 'text-2xl pe-2 pt-3' : 'hidden'}>
              <img className='icon-nav' src={collapse} alt="collapse icon"/>
            </button>
          </div>
          <div className={show ? 'grid grid-cols-4 gap-2 overflow-y-scroll custom-scrollbar h-3/6 relative top-[3%]' : "w-full"}>
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
                  images={imageUpload}
                  handleImages={handleImages}
                />
             )}
             {activeTab === 'text' && <Text isExpanded={isExpanded} />}
             {activeTab === 'audio' && <Audio isExpanded={isExpanded} audios={audios} />}
          </div>
      </div>
    </div>
  )
}

export default Navbar