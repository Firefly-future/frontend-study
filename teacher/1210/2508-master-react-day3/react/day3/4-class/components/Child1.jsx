import React, { Component, PureComponent } from 'react'

class Child1 extends PureComponent {
  
  state = {
    name: '小明'
  }

  constructor(props) {
    // super: 父类的构造函数
    super(props)
    console.log('constructor')
  }

  componentDidMount() {
    console.log('组件挂载完成 componentDidMount')
  }

  // 性能优化: 可以在此函数内部比较最新的数据和当前使用的数据是否发生改变，判断是否需要阻止更新
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('判断组件是否需要更新 shouldComponentUpdate')
  //   console.log(nextProps, nextState)
  //   if (nextProps.num === this.props.num && nextState.name === this.state.name) {
  //     return false
  //   }
  //   // return true 更新组件，false 阻止组件更新
  //   return true
  // }

  componentDidUpdate() {
    console.log('组件更新完成 componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('组件销毁之前 componentWillUnmount')
  }

  render() {
    console.log('render')
    return (
      <div className="box">
        <h2>Child1</h2>
        <button onClick={() => {
          this.setState({
            name: Math.random()
          })
        }}>修改姓名</button>
        <div>姓名：{this.state.name}</div>
        <div>{this.props.num}</div>
      </div>
    )
  }
}

// 挂载阶段
// 1. constructor 初始化 state 和 props
// 2. render
// 3. componentDidMount
// 更新阶段
// 1. shouldComponentUpdate
// 2. render
// 3. componentDidUpdate
// 销毁阶段
// 1. componentWillUnmount

// const Child1 = props => {
//   return (
//     <div className="box">
//       <h2>Child1</h2>
//       <div>{props.num}</div>
//     </div>
//   )
// }

export default Child1