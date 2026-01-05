import React, { Component } from 'react'
import Child1 from './components/Child1'


document.addEventListener('click', e => {
  console.log(e.target)
})


// React v16.8之前只有 class 组件可以定义状态，函数组件只能做渲染操作
// v16.8之后出现 hooks 让函数组件可以定义状态代替类组件
class App extends Component {
  // 组件状态
  state = {
    title: '我是标题',
    num: 0,
    arr: [1,2,3,4]
  }

  onChange = e => {
    // 更新组件状态，把传入的对象和之前的 state 进行合并
    this.setState({
      title: e.target.value
    })
  }

  render() {
    // console.log('渲染组件', this)
    const { title, num } = this.state

    return (
      <div>
        {/* 合成事件：react中事件并没有绑定到具体的元素，而是只给根元素绑定事件，然后利用事件冒泡的原理触发事件 */}
        <h1 onClick={e => {
          // e: react事件对象，包装一层事件对象统一处理不同平台的兼容问题
          // e.nativeEvent：原生事件对象
          console.log(e)
          e.stopPropagation()
        }}>{title}</h1>
        <input type="text" value={title} onChange={this.onChange} />
        <div>num: {num}</div>
        <button onClick={() => {
          this.setState({
            num: this.state.num + 1
          })
        }}>num +</button>
        <Child1 num={num} />
      </div>
    )
  }
}


export default App