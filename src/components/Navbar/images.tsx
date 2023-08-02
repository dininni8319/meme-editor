import { img } from './assets-imports'
import searchSvg from '@/assets/search.svg'
import SearchAutoComplete from './search-img-auto-com'
import useEvent from '@/hooks/useEvent'
import { useAppDispatch, useAppSelector } from '@/hooks/dispatch-selector-hooks'
import { queryString } from '@/store/navbarSlice'

interface Props {
  images: string[]
  handleCloseSearch: () => void
}

const Images = ({ images, handleCloseSearch }: Props) => {
  const { handleDragStart } = useEvent()
  const dispatch = useAppDispatch()

  const { isExpanded, query } = useAppSelector((state) => state.nav)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    // if (value.length >= 3) {
      dispatch(queryString({ query: value }))
    // }
  }
  return (
    <div className={isExpanded ? 'w-full' : 'hidden'}>
      <div className="flex items-center bg-[#22233E] mt-5">
        <img className="icon-nav p-1 me-2" src={searchSvg} />
        <input
          type="text"
          name="query"
          id="query"
          value={query}
          className="py-2 px-5 bg-[#22233E] text-[#A0A5D0]"
          placeholder="pixabay"
          onChange={handleChange}
          onClick={handleCloseSearch}
        />
        <SearchAutoComplete isExpanded={isExpanded} images={images} />
      </div>
      {img?.map(({ id, src }: { id: number; src: string }) => (
        <div
          key={id}
          id={String(id)}
          className="w-full flex flex-col items-center uploads-image mb-4"
        >
          <img
            id={String(id)}
            draggable
            className="ps-10 mt-5 uploads-image"
            src={src}
            loading="lazy"
            onDragStart={(e) => handleDragStart(e, src)}
          />
        </div>
      ))}
    </div>
  )
}

export default Images
