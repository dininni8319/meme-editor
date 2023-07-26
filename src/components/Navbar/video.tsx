/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import searchSvg from '@/assets/search.svg'
import { assetVideos } from './assets-imports'
import useEvent from '@/hooks/useEvent'
import { useAppDispatch, useAppSelector } from '@/hooks/dispatch-selector-hooks'
import { searchString } from '@/store/navbarSlice'

interface Props {
  isExpanded: boolean
  videos: any
  handleCloseSearch: () => void
}

interface IVideo {
  videoFiles: File
}

const Video = ({ videos, handleCloseSearch }: Props) => {
  const { isExpanded, search } = useAppSelector(state => state.nav)
  const dispatch = useAppDispatch()
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (value.length >= 3) {
      dispatch(searchString({search: value}))
    }
  }
  const { handleDragStart } = useEvent()

  return (
    <div className={isExpanded ? 'w-full' : 'hidden'}>
      <div className="flex flex-col bg-[#22233E] mt-5">
        <div className="flex items-center border-2 border-gray-600">
          <img className="icon-nav p-1" src={searchSvg} />
          <input
            type="text"
            name="query"
            id="query"
            className="py-3 px-5 bg-[#22233E] text-[#A0A5D0]"
            placeholder="pixabay"
            onClick={handleCloseSearch}
            onChange={handleChange}
          />
        </div>
        <div
          className={
            isExpanded && videos.length !== 0
              ? `absolute bg-[#22233E] w-60 overflow-y-scroll custom-scrollbar shadow-2xl h-40 top-[25%] z-50 flex flex-col items-start p-1`
              : 'hidden'
          }
        >
          {isExpanded &&
            videos?.map((video: any, id: number) => (
              <a href={video.video_files[0].link} target="_blank">
                <div
                  key={id}
                  id={String(id)}
                  className="flex flex-col items-center uploads-image mb-1"
                >
                  <img
                    className="mt-1 ps-5 uploads-image"
                    src={video?.image}
                    alt="images from a query"
                    loading="lazy"
                  />
                </div>
              </a>
            ))}
        </div>
        {isExpanded &&
          assetVideos?.map(({ id, src }) => (
            <div
              key={id}
              className="w-full flex flex-col items-center uploads-image mb-4"
            >
              <video
                className="ps-10 mt-5 uploads-image"
                preload="auto"
                src={src}
                controls
                draggable
                onDragStart={(e) => handleDragStart(e, src, 'video')}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Video
