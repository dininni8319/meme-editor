interface IShapes {
  id: number,
  src: string
}

const Shapes = ({ isExpanded, shapes }: { isExpanded: boolean, shapes: IShapes[]}) => {
   return (
    <>
      {isExpanded && shapes?.map(({ id, src }) => {
        return <img className='mt-5 icon-nav-expand' src={src} key={id} id={String(id)} />
      })}
    </>
   )
}

export default Shapes