import React, { useState, useRef } from 'react'
import classNames from 'classnames'

const App = () => {
  const [title, setTitle] = useState('标题')
  const [agree, setAgree] = useState(false)

  const usernameRef = useRef(null)
  const checkboxRef = useRef(null)
  return (
    <div>
      <h1>{title}</h1>
      {/* 受控组件：表单元素的 value 收到 state 控制，必须通过 onChange 事件修改状态 */}
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={() => setTitle('标题')}>重置</button>
      <div>
        <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
        同意此协议
      </div>
      <button onClick={() => {
        console.log(agree)
      }}>注册</button>

      <hr />
      {/* 非受控组件：表单的 value 不受到 state 控制，可以通过 defaultValue/defaultChecked 设置默认值，默认值只执行一次 */}
      <div>
        {/* 通过 ref 对象获取 dom 元素 */}
        姓名： <input type="text" ref={usernameRef} defaultValue={title} />
      </div>
      <div>
        同意协议： <input type="checkbox" ref={checkboxRef} defaultChecked={true} />
      </div>
      <button onClick={() => {
        // 获取dom
        console.log(usernameRef.current)
        console.log(checkboxRef.current)
        
      }}>提交</button>
    </div>
  )
}

export default App