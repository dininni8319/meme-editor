import memoizeOne from 'memoize-one'

interface IEmojis {
  id: number,
  src: string
}

const renderIcon = (id: number, src: string) => {
  return  (
    <img 
      className='mt-5 icon-nav-expand' 
      src={src} 
      key={id} 
      id={String(id)}  
      loading='lazy'
      />
  )
}

const Emojis = ({isExpanded, emojis}: {isExpanded: boolean, emojis: IEmojis[]}) => {
  return (
    <>
      {isExpanded && emojis?.map(({id, src }) => {
        const svg = memoizeOne(renderIcon)
        return (
          <div key={id}>
            {svg(id, src)}
          </div>
        )
      })}
    </>
  ) 
}

export default Emojis