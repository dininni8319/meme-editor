import { access_key } from '@/utils/'

interface Props {
  images: string[],
  isExpanded: boolean
}
const SearchAutoComplete = ({ isExpanded, images }: Props) => {
  return (
    <div className={isExpanded && images.length !== 0 ? `absolute bg-white w-33 overflow-y-scroll shadow-2xl h-40 top-[12%] z-50 flex flex-col items-start p-1` : 'hidden'}>
        {isExpanded && images?.map((img, id) => {
        return (
          <div key={id} id={String(id)} className='flex flex-col items-center uploads-image mb-1'>
            <img className='mt-1 uploads-image' src={img.urls.small} alt='images from a query' />
          </div>
        )
      })}
    </div>
  )
}

export default SearchAutoComplete