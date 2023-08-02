import React, { useState } from 'react'
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

const useEvent = () => {
  const [removedObjectIds, setRemovedObjectIds] = useState<Set<string>>(
    new Set()
  )

  const handleDragStart = (
    event: React.DragEvent<
      HTMLImageElement | HTMLVideoElement | HTMLDivElement
    >,
    imageUrl: string,
    im?: string
  ) => {
    if (im === 'video') {
      event.dataTransfer.setData('video', imageUrl)
      return
    } else if (im === 'emojis') {
      event.dataTransfer.setData('emojis', imageUrl)
      return
    } else if (im === 'text') {
      event.dataTransfer.setData('text', imageUrl)
      return
    } else {
      event.dataTransfer.setData('text/plain', imageUrl)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault()
  }

  const handleFileString = (file: File): string[] => {
    const arr: string[] = []
    const fileUrl = URL.createObjectURL(file)
    arr.push(fileUrl)
    return arr
  }

  const handleDropElement = (event: DragEvent, canvas: fabric.Canvas) => {
    event.preventDefault()

    const videoUrl = event.dataTransfer?.getData('video')
    const emojis = event.dataTransfer?.getData('emojis')
    const videoEl = document.createElement('video')
    const imageUrl = event.dataTransfer?.getData('text/plain')
    const fontSize = event.dataTransfer?.getData('text')

    if (imageUrl) {
      fabric.Image.fromURL(imageUrl, (img) => {
        img.scaleToWidth(400)
        img.scaleToHeight(400)
        img.center()
        img.id = uuidv4()
        if (!removedObjectIds.has(img.id)) {
          canvas.add(img)
          canvas.requestRenderAll()
        }
      })
    }

    if (emojis) {
      fabric.Image.fromURL(emojis, (img) => {
        img.scaleToWidth(40)
        img.scaleToHeight(40)
        img.set({ left: 180, top: 150 })
        img.id = uuidv4()

        if (!removedObjectIds.has(img.id)) {
          canvas.add(img)
          canvas.requestRenderAll()
        }
      })
    }

    if (fontSize) {
      const text = new fabric.IText('Add text', {
        left: 50,
        top: 50,
        fontSize: Number(fontSize),
        fill: 'black',
      })
      text.id = uuidv4()
      if (!removedObjectIds.has(text.id)) {
        canvas.add(text)
        canvas.requestRenderAll()
      }
    }
    if (videoUrl) {
      videoEl.src = videoUrl
      videoEl.onloadedmetadata = () => {
        const rect = new fabric.Rect({
          left: 50,
          top: 50,
          fill: 'black',
        })
        canvas.add(rect)
        canvas.renderOnAddRemove = false

        const render = () => {
          const ctx = canvas.getContext('2d')
          ctx.clearRect(rect?.left, rect.top, 400, 400)
          ctx.drawImage(videoEl, rect.left, rect.top, 400, 400)
          canvas.requestRenderAll()
          requestAnimationFrame(render)
        }
        videoEl.play()
        render()
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent, canvas: fabric.Canvas) => {
    const id = uuidv4()

    if (event.key === 'Backspace') {
      const activeObject = canvas.getActiveObject()

      if (
        activeObject &&
        activeObject.type === 'i-text' &&
        activeObject.isEditing
      ) {
        return
      }
      if (activeObject) {
        const activeObjects = canvas.getActiveObjects()
        activeObjects.forEach((object) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          object.id = id
          setRemovedObjectIds((prevState) => new Set(prevState.add(object.id)))
          canvas.remove(object)
        })
        canvas.discardActiveObject()
        canvas.renderAll()
      }
    }
  }

  const handleBounderies = (event: fabric.IEvent, canvas: fabric.Canvas) => {
    const obj = event.target as fabric.Object
    if (!obj) return
    const rect = obj.getBoundingRect()
    if (!rect) return

    if (
      rect.left < 0 ||
      rect.top < 0 ||
      rect.left + rect.width > canvas.getWidth() ||
      rect.top + rect.height > canvas.getHeight()
    ) {
      if (obj.getAngle() != obj.originalState.angle) {
        obj.setAngle(obj.originalState.angle)
      } else {
        obj.setTop(obj.originalState.top)
        obj.setLeft(obj.originalState.left)
        obj.setScaleX(obj.originalState.scaleX)
        obj.setScaleY(obj.originalState.scaleY)
      }
      obj.setCoords()
    }
  }

  return {
    handleDragStart,
    handleDragOver,
    handleFileString,
    handleDropElement,
    handleKeyDown,
    handleBounderies,
  }
}

export default useEvent
