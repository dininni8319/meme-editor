import axios from 'axios'

const fetchUploadedVideos = async () => {
  try {
    const res = await axios.get('http://localhost:8000/videos')
    if (res.status === 200) {
      return res.data
    } else {
      alert('Something went wrong')
    }
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message || 'Something went wrong'
      alert(message)
    }
  }
}

export default fetchUploadedVideos
