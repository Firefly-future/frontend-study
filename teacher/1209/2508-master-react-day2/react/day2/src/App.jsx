import { useState } from 'react'
import Header from './components/header/Header'
import Filter from './components/Filter/Filter'
import TaskItem from './components/TaskItem/TaskItem'
import { FilterType } from './constants'
import { useEffect } from 'react'

const App = () => {
  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem('list')) || []
  })
  const [curKey, setCurKey] = useState(FilterType.ALL)

  const push = title => {
    setList([
      ...list,
      {
        id: Date.now(),
        title,
        isDone: false
      }
    ])
  }

  const del = id => {
    setList(list.filter(v => v.id !== id))
  }

  const change = (id, key, value) => {
    setList(list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [key]: value
        } 
      }
      return item
    }))
  }

  const total = list.length
  const doneLen = list.filter(item => item.isDone).length
  const filterList = list.filter(item => {
    if (curKey === FilterType.TODO) {
      return !item.isDone
    } else if (curKey === FilterType.DONE) {
      return item.isDone
    } else {
      return true
    }
  })

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <div className="app">
      <Header onSubmit={push} />
      <Filter curKey={curKey} onChange={setCurKey} />
      <div className="task-stats">总任务: {total} | 已完成: {doneLen} | 未完成: {total - doneLen}</div>
      <div className="task-list">
        {filterList.map(item => 
          <TaskItem
            key={item.id}
            {...item}
            onDel={del}
            onChange={change}
          />
        )}
      </div>
    </div>
  )
}

export default App