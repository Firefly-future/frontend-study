import Child3 from './Child3'
import { useCount } from '../hooks/useCount'
import { useEffect } from 'react'

const Child2 = () => {
  const { num, start } = useCount(50)

  useEffect(() => {
    start()
  }, [])

  return (
    <div className="box">
      <h2>Child2 - {num}</h2>
      <Child3 />
    </div>
  )
}

export default Child2