import useStore from '@/helpers/store'
import { useRef } from 'react'
import { useDrag } from '@use-gesture/react'

const Dom = ({ children }) => {
  const ref = useRef(null)
  useStore.setState({ dom: ref })

  const handlePointerMove = (e) => {
    useStore.setState({cursor: {x: e.clientX, y: e.clientY}})
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onMouseMove={handlePointerMove}
      // className='absolute top-0 left-0 z-10 overflow-hidden pointer-events-none dom'
      className='absolute top-0 left-0 z-10 w-full h-full overflow-hidden dom'
      ref={ref}
    >
      {children}
    </div>
  )
}

export default Dom
