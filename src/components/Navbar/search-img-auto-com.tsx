interface Props {
  images: string[],
  isExpanded: boolean
}

const SearchAutoComplete = ({ isExpanded, images }: Props) => {
  
  return (
    <div className={isExpanded && images.length !== 0 ? `absolute bg-[#22233E] w-60 overflow-y-scroll custom-scrollbar shadow-2xl h-40 top-[25%] z-50 flex flex-col items-start p-1` : 'hidden'}>
      {isExpanded && images?.map((img, id) => {
          const handleDragStart = (event: React.DragEvent<HTMLImageElement>) => {
            event.dataTransfer.setData('image-url', img?.urls?.small)
          }
        return (
          <div key={id} id={String(id)} className='flex flex-col items-center uploads-image mb-1'>
            <img className='mt-1 ps-5 uploads-image' draggable onDragStart={handleDragStart} src={img.urls.small} alt='images from a query' loading='lazy' />
          </div>
        )
      })}
    </div>
  )
}

export default SearchAutoComplete