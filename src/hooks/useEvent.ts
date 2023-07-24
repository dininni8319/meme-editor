import React, { useState } from 'react'

const useEvent = () => {
  const [images, setImages] = useState([]);
   // code above and handle drop are not in use for now
   // maybe we will need it later
  const handleDrop = (file: File) => {
    const imageUrl = URL.createObjectURL(file)
    if (imageUrl) {
      setImages(prevImages => [...prevImages, imageUrl]);
    }
  }
  
  const handleDragStart = (
    event: React.DragEvent<HTMLImageElement>, 
    imageUrl: string
  ) => {
    event.dataTransfer.setData('text/plain', imageUrl)
  }
  
  const handleDragOver = (
    event: React.DragEvent<HTMLCanvasElement>
   ) => {
    event.preventDefault();
  }

  const handleFileString = (file: File):string[] => {
    const arr: string[] = []
    const fileUrl = URL.createObjectURL(file)
    arr.push(fileUrl)
    return arr
  }

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleFileString
  }
}

export default useEvent