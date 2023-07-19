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
            <div className="flex justify-center">
              <label className='bg-blue-500 text-white w-full p-5'>
                <input 
                  type="file"  
                  accept=".jpg,.jpeg,.png,.gif"  
                  id="media"
                  onChange={handleImages} 
                />
                Choose an Image
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