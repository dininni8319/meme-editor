import logo from '@/assets/logo.svg'
import uploads from '@/assets/uploads.svg'
import imageSVG from '@/assets/image.svg'
import text from '@/assets/text.svg'
import audio from '@/assets/audio.svg'
import video from "@/assets/video.svg";
import objects from '@/assets/shape.svg'

interface Props {
  handleTabClick: (section: string) => void
}

const NavigationTabs = ({handleTabClick}: Props) => {
  return (
    <div className="w-20">
        <div className="flex flex-col items-center py-5">
          <img src={logo} alt="logo" />
        </div>
        <ul className='text-sm text-gray'>
          <li className='flex flex-col items-center py-5' onClick={() => handleTabClick('uploads')}>
            <img className='icon-nav' src={uploads} alt="logo icon" />
            <span>Uploads</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={() => handleTabClick('objects')}>
            <img className='icon-nav' src={objects} alt="uploads icon"/>
            <span>Objects</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={() => handleTabClick('image')}>
            <img className='icon-nav' src={imageSVG} alt="image icon"/>
            <span>Images</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={() => handleTabClick('text')}>
            <img className='icon-nav' src={text} alt="text icon"/>
            <span>Text</span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={() => handleTabClick('video')}>
            <img className='icon-nav' src={video} alt="video icon"/>
            <span>
              Videos
            </span>
          </li>
          <li className='flex flex-col items-center py-5' onClick={() => handleTabClick('audio')}>
            <img className='icon-nav' src={audio} alt="audio icon"/>
            <span>
              Audio
            </span>
          </li>
        </ul>
      </div>
  )
}

export default NavigationTabs