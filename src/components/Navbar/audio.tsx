import React from 'react'

interface Audios {
  id: number,
  srcAudio: string,
  srcImg: string
}

interface Props {
  isExpanded: boolean,
  audios: Audios[]
}

const Audio = ({ isExpanded, audios }: Props) => {

  return (
     <div className='flex flex-col justify-center'>
      {isExpanded && audios?.map(({id, srcAudio, srcImg }) => {
        return (
          <div key={id} className='audio-container'>
            <audio controls>
              <source src={srcAudio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <img src={srcImg} alt="Image" />
          </div>
        )
      })}
    </div>
  )
}

export default Audio