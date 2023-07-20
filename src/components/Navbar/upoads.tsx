import uploadIcon from '@/assets/upload.svg'

interface IProps {
  isExpanded: boolean, 
  images: string[], 
  handleImages: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Uploads = (
  { isExpanded, images, handleImages }: IProps
  ) => {
    return (
      <div className="w-full">
        {isExpanded && ( 
            <div className="flex justify-center mt-10 me-5">
              <label className='bg-blue-500 text-white w-full p-5 first-letter flex justify-center'>
                <input 
                  type="file"  
                  accept=".jpg,.jpeg,.png,.gif"  
                  id="media"
                  onChange={handleImages} 
                />
                <img src={uploadIcon} alt="upload icon" className='pe-2' />
               <span className='text-xl'>Upload a file</span> 
              </label>
            </div>
        )}

      {isExpanded && images?.map((image: string, id: number) => {
        return (
          <div key={id} className='w-full flex flex-col items-center uploads-image mb-4'>
            <img className='ps-10 mt-5 uploads-image' src={image} />
          </div>
        )
      })}
    </div>
    )
}

export default Uploads