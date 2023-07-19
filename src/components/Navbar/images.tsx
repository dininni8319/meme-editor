import { images } from './assets-imports'
import search from '@/assets/search.svg'

interface Props {
  isExpanded: boolean
}

const Images = ({ isExpanded }: Props ) => {
  return (
    <div className='w-full'>
      <div className='flex items-center bg-[#22233E]'>
        <img className='icon-nav p-1' src={search} />
        <input 
          type="text" 
          name="query" 
          id="query" 
          className='w-60 p-2 bg-[#22233E] text-[#A0A5D0]'
          placeholder='pixabay'
         />
      </div>
      {isExpanded && images?.map(({id, src}: {id: number, src: string}) => {
        return (
          <div key={id} id={String(id)} className='w-full flex flex-col items-center uploads-image mb-4'>
            <img className='ps-10 mt-5 uploads-image' src={src} />
          </div>
        )
      })}
    </div>
  )
}

export default Images