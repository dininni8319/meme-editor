import { pexels_video } from '@/utils'

const fetchVideos = async (search: string) => {
  try {
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=${search}`,
      {
        method: 'GET',
        headers: {
          Authorization: pexels_video,
        },
      }
    )
    const { videos: data } = await res.json()
    return data
  } catch (error) {
    throw new Error('Something went wrong while fetching videos.')
  }
}

export default fetchVideos
