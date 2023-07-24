import dompurify from 'dompurify'
import { texts } from './assets-imports'
import useEvent from '@/hooks/useEvent'

interface Texts {
  id: number,
  tag: string,
  fontSize: string,
  htmlTag: string
}

const Text = ({isExpanded}:{isExpanded: boolean}) => {
  const { handleDragStart } = useEvent()
  return isExpanded && texts?.sort((a: Texts, b: Texts) => b.id - a.id ).map((elem: Texts) => {
    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, elem.fontSize, 'text')} 
        className='p-2 pt-5 mt-5' style={{ 
        fontSize: elem.fontSize + 'px', 
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
      }} key={elem.id} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(elem.tag)} }>
      </div>
    )
  })
}

export default Text