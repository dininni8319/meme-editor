export const access_key = import.meta.env.VITE_ACCESS_KEYS
export const secret_key = import.meta.env.VITE_SECRET_KEYS
export const pexels_video = import.meta.env.VITE_SECRET_PEXELS

export const show = (activeTab: string): boolean => {
  return (
    activeTab !== 'uploads' &&
    activeTab !== 'audio' &&
    activeTab !== 'text' &&
    activeTab !== 'video'
  )
}

export function getVideoElement(url: string) {
  const videoE = document.createElement('video')
  videoE.width = 530
  videoE.height = 298
  videoE.muted = true
  videoE.crossOrigin = 'anonymous'
  const source = document.createElement('source')
  source.src = url
  source.type = 'video/mp4'
  videoE.appendChild(source)
  return videoE
}