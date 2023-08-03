import { fabric } from 'fabric'
import GIF from 'gif.js'
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

export const captureFrame = (frames: any[], canvas: fabric.Canvas) => {
  const frame = canvas.toDataURL({
    format: 'png',
    quality: 1.0,
  })
  frames.push(frame)
}

export const handleDownload = (frames: any[]) => {
  // Convert the frames into a GIF using gif.js
  const gif = new GIF({
    workers: 2,
    quality: 10,
    width: 800,
    height: 600,
  })

  frames.forEach((frame) => {
    const img = new Image()
    img.src = frame
    gif.addFrame(img, { delay: 200 }) // Set the frame delay (in milliseconds)
  })

  gif.on('finished', (blob) => {
    // Create a downloadable link for the GIF
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'meme.gif'
    link.href = url

    // Append the link element to the DOM
    document.body.appendChild(link)

    // Simulate a click on the link to trigger the download
    link.click()

    // Clean up: remove the link element from the DOM
    document.body.removeChild(link)
  })

  gif.render()
}
