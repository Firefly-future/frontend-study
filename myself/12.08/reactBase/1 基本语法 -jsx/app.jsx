import React from "react"

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
  // 多条件渲染 函数
  const renderNum=num=>{
    if(num>=90){
      return <h1>优秀</h1>
    }else if(num>=80){
      return <h1>良好</h1>
    }else if(num>=70){
      return <h1>一般</h1>
    }else if(num>=60){
      return <h1>勉强够看</h1>
    }else{
      return <h1>不及格，再努力吧</h1>
    }
  }
  return (
    <div>
      <h1>{title}</h1>
      <p>数字：{num}</p>
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

      <p>成绩：{num}</p>
      <div>成绩评价：{renderNum(num)}</div>
      <ul>
        {
          list.map((item, index) => {
            return <li key={item.name}><p>序号：{index + 1}</p><p>姓名：{item.name}</p><p>年龄：{item.age}</p></li>
          })
        }
      </ul>
    </div>
  )
}

export default App