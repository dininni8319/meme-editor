import { useDrag } from "react-dnd"


type Props = {
  type: string,
  id: string,
  children: React.ReactNode
}

const DraggleItem = ({ type, id, children}:Props) => {
  /// fix the code below
  const [collectedProps, dragRef] = useDrag(()=>({
    type,
    item: { type, id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

 
  return (
    <div 
      ref={dragRef} 
      style={{ opacity: collectedProps.isDragging ? 0.5 : 1}}>
      {children}
    </div>
  )
}

export default DraggleItem