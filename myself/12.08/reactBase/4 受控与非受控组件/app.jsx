import React, { useState,useRef } from "react"
// 受控组件与非受控组件

const App = () => {
  const [title, setTitle] = useState('标题')
  const [agree, setAgree] = useState(false)

  const usernameRef=useRef(null)
  const checkBoxRef=useRef(null)
  return (
    <div>
      <h1> {title} </h1>
      {/* 表单的value 受到 status 控制 必须通过onChange事件修改状态 */}
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={() => setTitle('标题')}>重置</button>
      <div>
        <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)
        } />
        同意此协议</div>
        <button onClick={()=>{
          console.log(agree)
        }}>注册</button>
        {/* 上为受控组件 */}
        <hr />
        {/* 下为非受控组件 */}
        {/* 非受控组件 表单的value 不受到status控制 可以通过 defaultValue或者defaultChecked 设置默认值 默认值只执行一次 */}
        <div>
          {/* 通过ref对象获取dom元素 */}
          <input type="text" ref={usernameRef} defaultValue={title} />
        </div>
        <div>
          <input type="checkbox" ref={checkBoxRef} defaultChecked={true} />
        </div>
        <button
        onClick={()=>{
          // 获取dom
          console.log(usernameRef.current)
          console.log(checkBoxRef.current)
        }}
        >提交</button>
        
    </div>
  )
}

export default App