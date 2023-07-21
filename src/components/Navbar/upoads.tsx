import { useState } from 'react'
import uploadIcon from '@/assets/upload.svg'

interface IProps {
  isExpanded: boolean, 
  imageUpload: string[],
  videoUpload: string[] 
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Uploads = (
  { isExpanded, imageUpload, videoUpload, handleFileUpload }: IProps
  ) => {
    const [ isActive, setIsActive ] = useState('')
    const [ initial, setInitial ] = useState(true)
    const isVideos = isActive === 'videos'
    const isImages = isActive === 'images'
    
    const handleTabUpload = (tab: string) => {
      setInitial(false)
      if (tab === isActive) {
        setIsActive('')
      }
      else {
        setIsActive(tab)
      }
    }
    return (
      <div className="w-full">
        {isExpanded && ( 
          <div className="flex justify-center mt-10 me-5">
            <label className='bg-blue-500 text-white w-full p-5 first-letter flex justify-center'>
              <input 
                type="file"  
                accept=".jpg,.jpeg,.png,.gif,.mp4,.quicktime,.mpeg"  
                id="media"
                onChange={handleFileUpload} 
              />
              <img src={uploadIcon} alt="upload icon" className='pe-2' />
              <span className='text-xl'>Upload a file</span> 
            </label>
          </div>
        )}
      <div className='flex justify-around py-5'>
        {isExpanded && (
          <button 
            className={initial || isImages ? 'border-b-2 border-blue-500 p-5' : 'text-[#A0A5D0] border-b-2 border-gray-500 p-5'}
            onClick={(() => handleTabUpload('images'))}>
              Images
          </button>
        )}
        {isExpanded && (
          <button 
            className={ isVideos ? 'border-b-2 border-blue-500 p-5 me-2' : 'text-[#A0A5D0] border-b-2 border-gray-500 p-5 me-2'} 
            onClick={(() => handleTabUpload('videos'))}>
              Videos
            </button>
        )}
      </div>
      {isExpanded && isImages && imageUpload?.map((image: string, id: number) => {
        return (
          <div key={id} className='w-full flex flex-col items-center uploads-image mb-4'>
            <img className='ps-10 mt-5 uploads-image' src={image} />
          </div>
        )
      })}
      {isExpanded && isVideos && videoUpload?.map((image: string, id: number) => {
        return (
          <div key={id} className='w-full flex flex-col items-center uploads-image mb-4'>
            <video className='ps-10 mt-5 uploads-image' src={image} controls/>
          </div>
        )
      })}
    </div>
    )
}

export default Uploads