import useEvent from '@/hooks/useEvent'

interface IEmojis {
  id: number,
  src: string
}

const Emojis = ({isExpanded, emojis}: {isExpanded: boolean, emojis: IEmojis[]}) => {
  const { handleDragStart } = useEvent()
  return (
    <>
      {isExpanded && emojis?.map(({id, src }) => {
        return (
          <div key={id}>
              <img 
                className='mt-5 icon-nav-expand' 
                src={src} 
                key={id} 
                id={String(id)}  
                loading='lazy'
                draggable
                onDragStart={(e) => handleDragStart(e, src, 'emojis')}
              />
          </div>
        )
      })}
    </>
  ) 
}

export default Emojis