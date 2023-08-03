// uploadVideo.ts
import axios from 'axios'

const uploadVideo = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await axios.post('http://localhost:8000/upload', formData)
    if (res.status === 200) {
      alert(res.message || 'File successfully uploaded')
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

export default uploadVideo
