import { memo } from 'react'

interface IEmojis {
  id: number,
  src: string
}

const Emojis = ({isExpanded, emojis}: {isExpanded: boolean, emojis: IEmojis[]}) => {
  return (
    <>
      {isExpanded && emojis?.map(({id, src }) => {
        return (
          <img 
            className='mt-5 icon-nav-expand' 
            src={src} 
            key={id} 
            id={String(id)}  
            loading='lazy'
           />
        )
      })}
    </>
  ) 
}

export default memo(Emojis)