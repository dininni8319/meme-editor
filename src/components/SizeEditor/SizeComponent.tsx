import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/dispatch-selector-hooks'
import { setCoordX, setCoordY, setSizeW, setSizeH } from '@/store/resizeSlice'

const SizeComponent = () => {
  const dispatch = useAppDispatch()
  const { x, y, w, h } = useAppSelector((state) => state.resize)
  console.log(
    '🚀 ~ file: SizeComponent.tsx:13 ~ SizeComponent ~  x, y, w, h :',
    x,
    y,
    w,
    h
  )

  const handleInputChange = (event: ChangeEvent) => {
    event.preventDefault()
    const target = event.target
    if (!target) return
    const value: string = target.value
    const name: string = target.name
    if (!value || !name) {
      return
    }
    switch (name) {
      case 'coordx':
        dispatch(setCoordX({ x: value }))
        break
      case 'coordy':
        dispatch(setCoordY({ y: value }))
        break
      case 'width':
        dispatch(setSizeW({ w: value }))
        break
      case 'height':
        dispatch(setSizeH({ h: value }))
        break
      default:
        break
    }
  }

  return (
    <div>
      <h3>Position</h3>

      {/* Add your code here */}
      <form>
        <div>
          <label htmlFor="">Position</label>
        </div>
        <div className="flex">
          <input
            type="text"
            onChange={handleInputChange}
            name="coordx"
            value={x}
          />
          X
          <input
            type="text"
            onChange={handleInputChange}
            name="coordy"
            value={y}
          />
          Y
        </div>
        <div>
          <label htmlFor="">Size</label>
        </div>
        <div className="flex">
          <input
            type="text"
            onChange={handleInputChange}
            name="width"
            value={w}
          />
          W
          <input
            type="text"
            onChange={handleInputChange}
            name="height"
            value={h}
          />
          H
        </div>
        <div>
          <label htmlFor="">Rotation</label>
        </div>
        <div className="flex">
          <input type="color" name="color" />W
          <input type="text" name="percent" />H
        </div>
      </form>
    </div>
  )
}

export default SizeComponent
