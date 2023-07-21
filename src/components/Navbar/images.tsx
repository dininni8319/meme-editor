import { img } from './assets-imports'
import search from '@/assets/search.svg'
import SearchAutoComplete from './search-img-auto-com'
import memoizeOne from 'memoize-one'

interface Props {
  isExpanded: boolean,
  images: string[]
  setQuery: React.Dispatch<React.SetStateAction<string>>
  handleCloseSearch: () => void
}

// memoization
const renderIcon = (src: string) => {
  return  (
    <img 
      className='ps-10 mt-5 uploads-image' 
      src={src}  
      loading='lazy'
    />
  )
}

const imgMemo = memoizeOne(renderIcon)

// component for the images
const renderImages = () => img?.map(({id, src}: {id: number, src: string}) => {
  return (
      <div key={id} id={String(id)} className='w-full flex flex-col items-center uploads-image mb-4'>
        {imgMemo(src)}
      </div>
    )
  })


const Images = ({ isExpanded, setQuery, images, handleCloseSearch }: Props ) => {
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target 
    if (value.length >= 3) {
      setQuery((prev: string) => prev = value)
    }
  }

  return (
    <div className={isExpanded ? "w-full" : 'hidden'}>
      <div className='flex items-center bg-[#22233E] mt-5'>
        <img className='icon-nav p-1 me-2' src={search} />
        <input 
          type="text" 
          name="query" 
          id="query" 
          className='py-4 px-5 bg-[#22233E] text-[#A0A5D0]'
          placeholder='pixabay'
          onChange={handleChange}
          onClick={handleCloseSearch}
         />
         <SearchAutoComplete
          isExpanded={isExpanded}
          images={images}
        />
      </div>
      {renderImages()}
    </div>
  )
}

export default Images