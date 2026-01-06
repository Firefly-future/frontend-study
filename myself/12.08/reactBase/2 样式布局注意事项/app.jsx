import React from "react"
import classNames from "classnames"
const App = () => {
  const title = '我是标题'
  const num = 80
  const list = [
    {
      name: '小明',
      age: 20
    },
    {
      name: '小红',
      age: 18
    },
    {
      name: '李华',
      age: 16
    }
  ]
  const arr = ['a', 'b', 'c']
  const obj = {
    name: '小小明',
    age: 10
  }
  const navList = ['周杰伦', '王力宏', '林俊杰']
  const activeIndex = 0
  const navClassNames = index => [
    'item',
      activeIndex === index ? 'active' : '',
      num >= 60 ? 'large' : 'small'
  ].join(' ')
  return (
    <div>
      {/* 标签属性类名从class改为className */}
      <h1 className="title">{title}</h1>

      {/* label的for属性从for改为htmlFor */}
      <input type="radio" name="person" id="man" /><label htmlFor="man">男</label>
      <input type="radio" name="person" id="woman" /><label htmlFor="woman">女</label>

      {/* style属性只能是对象 */}
      <p style={{ color: 'red', fontSize: '20px', background: "#ccc", padding: "10px" }}>数字：{num}</p>
      <p>布尔值：{true}</p>
      <p>布尔值：{false}</p>
      <p>null： {null}</p>
      <p>undefined：{undefined}</p>
      <p>数组：{arr}</p>
      <p>对象：{JSON.stringify(obj)}</p>
      {/* 对象需转化为字符串才会渲染 否则报错 */}
      {/* 条件渲染 */}
      {num > 60 ?
        <div><h1>及格了</h1></div> : <div><h1>不及格</h1></div>
      }
      <ul>
        {
          list.map((item, index) => {
            return <li key={item.name}><p>序号：{index + 1}</p><p>姓名：{item.name}</p><p>年龄：{item.age}</p></li>
          })
        }
      </ul>

      <nav>
        {/* 添加className的三种写法  classNames为插件 需安装引入 */}
        {navList.map((item, index) => {
          return <span key={index}
          // className={`item ${activeIndex===index?'active':''} ${num>=60?'large':'small'}`}

            // className={navClassNames(index)}

          // className={classNames("item", {
          //   active: activeIndex === index,
          //   large: num >= 60,
          //   small: num < 60
          // })}
          >{item}</span>
        })}
      </nav>
    </div>
  )
}

export default App