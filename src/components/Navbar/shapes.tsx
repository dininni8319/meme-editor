import memoizeOne from 'memoize-one'
import useEvent from '@/hooks/useEvent'

type Shapes = {
  id: number
  src: string
}

interface IProps {
  isExpanded: boolean
  shapes: Shapes[]
}

const Shapes = memoizeOne(({ isExpanded, shapes }: IProps) => {
  const { handleDragStart } = useEvent()

  return (
    <>
      {isExpanded &&
        shapes?.map(({ id, src }) => {
          return (
            <img
              className="mt-5 icon-nav-expand"
              src={src}
              key={id}
              id={String(id)}
              draggable
              onDragStart={(e) => handleDragStart(e, src, 'emojis')}
            />
          )
        })}
    </>
  )
})

export default Shapes
