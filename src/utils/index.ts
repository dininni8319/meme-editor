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
