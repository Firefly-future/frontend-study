import React, { useReducer } from 'react'
import Child1 from './components/Child1'
import Child2 from './components/Child2'


const App = () => {

  return (
    <div>
      <h2>app</h2>
      <Child1 />
      <Child2 />

      {/* selectValue = [100, 101] */}
      {/* <Select
        value={selectValue}
        options={[
          { label: '北京', value: 100 },
          { label: '上海', value: 101 },
          { label: '天津', value: 102 }
        ]}
        onChange={value => {
          // value: [100, 101]  // [{ label: '北京', value: 100 }, { label: '上海', value: 101 }]
          setSelectValue(value)
        }}
      /> */}
    </div>
  )
}

export default App