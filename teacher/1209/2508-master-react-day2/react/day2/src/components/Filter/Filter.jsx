import style from './Filter.module.scss'
import { filterList } from '../../constants'
import classNames from 'classnames'

const Filter = ({ curKey, onChange }) => {
  
  return (
    <div className={style.filter}>
      {filterList.map(item =>
        <button
          className={classNames('button', { primary: curKey === item.key })}
          key={item.key}
          onClick={() => onChange(item.key)}
        >
          {item.text}
        </button>
      )}
    </div>
  )
}

export default Filter