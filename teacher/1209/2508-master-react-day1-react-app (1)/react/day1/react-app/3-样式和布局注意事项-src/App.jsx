import React from 'react'
import classNames from 'classnames'

const App = () => {
  const title = '标题'
  const num = 70
  const list = [
    { name: '小明', age: 22 },
    { name: '小红', age: 23 },
    { name: '小李', age: 25 },
  ]
  const navlist = ['周杰伦', '凤凰传奇', '许嵩']
  const activeIndex = 0
  const navClassNames = index => [
    'item',
    activeIndex === index ? 'active' : '',
    num > 50 ? 'large' : 'small'
  ].join(' ')

  return (
    <div>
      {/* class => className
          for => htmlFor
          style 只能写对象
       */}
      <h1 className='title'>我是标题</h1>
      <label htmlFor="man">男</label>
      <input type="radio" id="man" value={1} />
      <label htmlFor="woman">女</label>
      <input type="radio" id="woman" value={0} />
      <ul style={{ color: 'red', background: '#ccc', fontSize: 12 }}>
        {list.map((item, index) => {
          return <li key={item.name}>
            <p>姓名： {item.name}</p>
            <p>年龄： {item.age}</p>
          </li>
        })}
      </ul>
      <nav>
        {navlist.map((item, index) =>
          <span
            // className={`item ${activeIndex === index ? 'active' : ''} ${num > 50 ? 'large' : 'small'}`}
            // className={navClassNames(index)}
            className={classNames('item', {
              active: activeIndex === index,
              large: num > 50,
              small: num <= 50
            })}
            key={item}
          >
              {item}
          </span>
        )}
      </nav>
    </div>
  )
}

export default App