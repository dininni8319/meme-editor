import dompurify from 'dompurify'
import { texts } from './assets-imports'

interface Texts {
  id: number,
  tag: string,
  fontSize: string
}

const Text = ({isExpanded}:{isExpanded: boolean}) => {
  return isExpanded && texts?.sort((a: Texts, b: Texts) => b.id - a.id ).map((elem: Texts) => {
    return (
      <div className='p-2 pt-5 mt-5' style={{ 
        fontSize: elem.fontSize, 
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
      }} key={elem.id} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(elem.tag)} }>
      </div>
    )
  })
}

export default Text