/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useEffect } from 'react'
import collapse from '@/assets/collapse.svg'
import { emojis, shapes, audios } from './assets-imports'
import NavigationTabs from './navigation-tabs'
import { Shapes, Emojis, Uploads, Images, Audio, Text, Video } from './index'
import { show } from '@/utils'
import useEvent from '@/hooks/useEvent'
import { useAppDispatch, useAppSelector } from '@/hooks/dispatch-selector-hooks'
import { extended, setError } from '@/store/navbarSlice'
import {
  fetchVideos,
  fetchImages,
  uploadVideos,
  fetchUploadedVideos,
} from '@/services'

const Navbar = () => {
  const { isExpanded, activeTab, search, query } = useAppSelector(
    (state) => state.nav
  )

  const dispatch = useAppDispatch()
  const [images, setImages] = useState<[]>([])
  const [imageUpload, setImageUpload] = useState<string[] | []>([])
  const [videoUpload, setVideoUpload] = useState<string[] | []>([])
  const [videos, setVideos] = useState<[]>([])

  const { handleFileString } = useEvent()
  const handleCloseSearch = () => setImages([])
  const handleCloseSearchVideo = () => setVideos([])

  const handleTabClick = (tab: string) => {
    if (tab === activeTab) {
      dispatch(
        extended({
          isExpanded: false,
          activeTab: '',
        })
      )
    } else {
      dispatch(
        extended({
          isExpanded: true,
          activeTab: tab,
        })
      )
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const arrOfFilesToString = handleFileString(file)
        setImageUpload((prev: string[] | []) => arrOfFilesToString.concat(prev))
      } else if (file.type.startsWith('video/')) {
        const sendRequest = async () => {
          try {
            const video = await uploadVideos(file)
            return video
          } catch (error) {
            if (error instanceof Error) {
              const message = error.message || 'Something went wrong'
              alert(message)
            }
          }
        }
        sendRequest()
      }
    }
  }

  useEffect(() => {
    const sendRequest = async () => {
      if (query.length > 2) {
        try {
          const result = await fetchImages(query)
          if (result) {
            setImages((prev) => [...result, ...prev])
          }
        } catch (error) {
          if (error instanceof Error) {
            const message = error.message || 'Something went wrong'
            dispatch(setError({ error: message }))
          }
        }
      }
    }
    sendRequest()
  }, [query, dispatch])

  useEffect(() => {
    const sendRequest = async () => {
      if (search.length > 2) {
        try {
          const result = await fetchVideos(search)
          if (result) {
            setVideos((prev) => [...result, ...prev])
          }
        } catch (error) {
          if (error instanceof Error) {
            const message = error.message || 'Something went wrong'
            dispatch(setError({ error: message }))
          }
        }
      }
    }
    sendRequest()
  }, [search])

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const result = await fetchUploadedVideos()
        if (result) {
          setVideoUpload(result)
        }
      } catch (error) {
        if (error instanceof Error) {
          const message = error.message || 'Something went wrong'
          dispatch(setError({ error: message }))
        }
      }
    }
    sendRequest()
  }, [])

  return (
    <div className="flex w-full">
      <NavigationTabs handleTabClick={handleTabClick} />
      <div
        className={
          isExpanded
            ? `absolute bg-[#141629] w-64 h-4/6 md:h-5/6 left-[20%] md:left-[7%] z-50 flex flex-col ease-in duration-500`
            : ''
        }
      >
        <div className="flex items-center justify-between py-2 px-1">
          <span
            className={isExpanded ? 'text-white capitalize text-xl' : 'hidden'}
          >
            {activeTab}
          </span>
          <button
            onClick={() =>
              dispatch(
                extended({
                  isExpanded: false,
                  activeTab: '',
                })
              )
            }
            className={isExpanded ? 'text-2xl pe-2 pt-3' : 'hidden'}
          >
            <img className="icon-nav" src={collapse} alt="collapse icon" />
          </button>
        </div>
        <div
          className={
            activeTab && show(activeTab)
              ? 'grid grid-cols-4 gap-2 overflow-y-scroll custom-scrollbar h-3/6 relative top-[3%]'
              : 'w-full overflow-y-scroll custom-scrollbar h-3/6'
          }
        >
          {activeTab === 'objects' && (
            <Shapes isExpanded={isExpanded} shapes={shapes} />
          )}
          {activeTab === 'objects' && (
            <Emojis isExpanded={isExpanded} emojis={emojis} />
          )}
          {activeTab === 'image' && (
            <Images images={images} handleCloseSearch={handleCloseSearch} />
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
          {activeTab === 'audio' && (
            <Audio isExpanded={isExpanded} audios={audios} />
          )}
          {activeTab === 'video' && (
            <Video
              isExpanded={isExpanded}
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
