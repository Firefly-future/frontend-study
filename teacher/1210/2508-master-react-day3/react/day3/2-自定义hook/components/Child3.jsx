import { useCount } from '../hooks/useCount'

const Child3 = () => {
  
  const { num, loading, start, stop, reset } = useCount()

  return (
    <div className="box">
      <h2>Child3</h2>
      <div>倒计时：{num}</div>
      <button onClick={start} disabled={loading}>开始</button>
      <button onClick={stop}>暂停</button>
      <button onClick={reset}>重置</button>
    </div>
  )
}

export default Child3