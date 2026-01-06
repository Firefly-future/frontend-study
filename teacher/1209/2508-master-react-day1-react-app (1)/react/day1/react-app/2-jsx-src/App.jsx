import React from 'react'

const App = () => {
  const title = '标题'
  const num = 50
  const list = [
    { name: '小明', age: 22 },
    { name: '小红', age: 23 },
    { name: '小李', age: 25 },
  ]
  const arr = [
    <span>1111</span>,
    <span>22222</span>,
    <span>33333</span>
  ]
  const obj = { a: 1 }

  const render = num => {
    if (num >= 90) {
      return <div>90以上</div>
    } else if (num >= 80) {
      return <div>80以上</div>
    } else if (num >= 70) {
      return <div>70以上</div>
    } else if (num >= 60) {
      return <div>60以上</div>
    } else if (num >= 50) {
      return <div>50以上</div>
    } else {
      return <div>80以上</div>
    }
  }


  return (
    <div>
      {/* 渲染变量 */}
      <h1>{ title }</h1>
      <p>数字：{ 111 }</p>
      <p>布尔值：{ true }</p>
      <p>布尔值：{ false }</p>
      <p>null：{ null }</p>
      <p>undefined：{ undefined }</p>
      <p>数组：{ arr }</p>
      {/* <p>对象: { obj }</p> 直接渲染对象会报错 */}
      <p>对象: { JSON.stringify(obj) }</p>

      {/* 条件判断 */}
      {/* {num >= 60 ?
        <div>
          <p>sssss</p>
          <div>考试及格</div>
        </div>
      :
        <div>
          <h3>不及格</h3>
        </div>
      } */}

      {/* {num >= 90 ?
        <div>
          <p>90分以上</p>
          <div>考试及格</div>
        </div>
      : null} */}

      {/* {num >= 90 &&
        <div>
          <p>90分以上</p>
          <div>考试及格</div>
        </div>
      } */}

      {render(num)}

      {/* 列表渲染 */}
      <ul>
        {list.map((item, index) => {
          return <li key={item.name}>
            <p>姓名： {item.name}</p>
            <p>年龄： {item.age}</p>
          </li>
        })}
      </ul>
    </div>
  )
}

export default App


// 类组件
// 函数组件