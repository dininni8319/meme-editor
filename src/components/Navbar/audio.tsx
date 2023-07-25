import React from 'react'

interface Audios {
  id: number
  srcAudio: string
  srcImg: string
}

interface Props {
  isExpanded: boolean
  audios: Audios[]
}

const Audio = ({ isExpanded, audios }: Props) => {
  return (
    <div className="flex flex-col justify-center mt-10 w-52">
      {isExpanded &&
        audios?.map(({ id, srcAudio, srcImg }) => {
          return (
            <div key={id} className="flex flex-col items-center my-1 mb-5">
              <img src={srcImg} alt="Image" className="w-10 h-10 mb-2" />
              <audio className="audio" preload="auto" controls>
                <source src={srcAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )
        })}
    </div>
  )
}

export default Audio
