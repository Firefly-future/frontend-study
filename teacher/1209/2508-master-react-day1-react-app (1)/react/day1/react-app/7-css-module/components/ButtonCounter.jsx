import style from './ButtonCounter.module.scss'

// 使用 css module 实现样式隔离，让样式只在当前组件内生效
// 原理：编译 css 类名，让每个组件的类名都不重复
console.log(style)


const ButtonCounter = (props) => {
  console.log('父组件传入的参数', props)

  return (
    <div className={style.counter_wrap}>
      <h3 className={style.test}>{props.title}</h3>
      <p className={style.large}>价格：¥{props.price}</p>
      {props.count > 0 &&
        <>
          <button className="btn" onClick={() => props.onChangeCount(props.count - 1)}>-</button>
          {props.count}
        </>
      }
      <button className="btn" onClick={() => props.onChangeCount(props.count + 1)}>+</button>
    </div>
  )
}

export default ButtonCounter