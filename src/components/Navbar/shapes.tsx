import memoizeOne from 'memoize-one'

type Shapes = {
  id: number,
  src: string
}

interface IProps {
  isExpanded: boolean,
  shapes: Shapes[]
}

const Shapes = memoizeOne(({ isExpanded, shapes }:IProps) => {
  return (
    <>
      {isExpanded && shapes?.map(({ id, src }) => {
        return <img className='mt-5 icon-nav-expand' src={src} key={id} id={String(id)} />
      })}
    </>
   )
})

export default Shapes