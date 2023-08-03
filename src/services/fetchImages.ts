// fetchImages.ts
import { access_key } from '@/utils'

const fetchImages = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Client-ID ${access_key}`,
        },
      }
    )
    const { results: data } = await res.json()
    return data
  } catch (error) {
    throw new Error('Something went wrong while fetching images.')
  }
}

export default fetchImages
