import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

// jsx: js + xml
{/* <xxxx></xxxx> */}

// 虚拟dom： 描述真实 dom 的对象

// diff算法：数据更新时对比新旧虚拟dom找出真正需要变化的部分

// 创建react元素（虚拟dom）
// const box = createElement('div', { className: 'box', id: 'box' }, [
//   createElement('h1', null, [
//     '我是标题',
//     createElement('span', null, ['!'])
//   ]),
//   createElement('p', null, ['我是一段描述']),
//   createElement('ul', null, [
//     createElement('li', null, ['11111']),
//     createElement('li', null, ['222222'])
//   ]),
// ])

const box = <div>
  <h1>我是标题<span>!!!!1</span></h1>
  <p>aaaaaa</p>
  <ul>
    <li>1111</li>
    <li>222222</li>
  </ul>
</div>

// console.log(box)
// setTimeout(() => {
//   console.log(document.querySelector('#root'))
// }, 1000)


const root = createRoot(document.getElementById('root'))
root.render(box)
