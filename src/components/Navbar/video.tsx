import { useEffect, useState } from 'react'
import search from '@/assets/search.svg'
import { assetVideos } from './assets-imports'
import SearchAutoComplete from './search-img-auto-com'

interface Props {
  isExpanded: boolean,
  setQuery: React.Dispatch<React.SetStateAction<string>>
  handleFileString: (file: File) => string[]
}

interface IVideo {
  videoFiles: File
}

const Video =  ({isExpanded, setQuery, handleFileString }: Props) => {
  const [ videos, setVideos ] = useState<string[] | []>([])

  return (
     <div className={isExpanded ? "w-full" : 'hidden'}>
      <div className='flex items-center bg-[#22233E] mt-5'>
        <img className='icon-nav p-1' src={search} />
        <input 
          type="text" 
          name="query" 
          id="query" 
          className='py-3 px-5 bg-[#22233E] text-[#A0A5D0]'
          placeholder='pixabay'
          // onClick={handleCloseSearch}
         />
        {/* <SearchAutoComplete
          isExpanded={isExpanded}
          // images={videos}
        /> */}
      </div>
       {isExpanded && assetVideos?.map(({id , src}) => {
        return (
          <div key={id} className='w-full flex flex-col items-center uploads-image mb-4'>
            <video className='ps-10 mt-5 uploads-image' preload="auto" src={src} controls/>
          </div>
        )
      })}
    </div>
  )
}

export default Video