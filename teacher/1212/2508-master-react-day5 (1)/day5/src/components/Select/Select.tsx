import React, { useEffect, useMemo, useState } from 'react'
import style from './Select.module.scss'
import classnames from 'classnames'

interface OptionItem<T extends React.Key = string> {
  label: string
  value: T
}

interface Props<T extends React.Key> {
  placeholder?: string
  options?: OptionItem<T>[]
  value?: T[]
  defaultValue?: T[]
  onChange?: (value: T[]) => void
}

const Select = <T extends React.Key,>({
  placeholder,
  defaultValue,
  value,
  options = [],
  onChange
}: Props<T>) => {
  const isControlled = typeof value !== 'undefined'
  const [showOption, setShowOption] = useState(false)
  const [filterText, setFilterText] = useState('')
  const [selected, setSelected] = useState<OptionItem<T>[]>(() => {
    // 根据传入的 value 或者 defaultValue 去 optios 中筛选数据
    if (value !== undefined) {
      return options.filter(item => value?.includes(item.value))
    }
    return options.filter(item => defaultValue?.includes(item.value))
  })

  // 筛选下拉框
  const filterOptions = useMemo(() => {
    return options.filter(v => v.label.includes(filterText))
  }, [filterText, options])

  // 修改选中状态
  const change = (item: OptionItem<T>) => {
    // 判断是添加还是删除
    let newValue: OptionItem<T>[] = []
    if (selected.includes(item)) {
      newValue = selected.filter(v => v.value !== item.value)
    } else {
      newValue = [...selected, item]
    }
    // 判断是受控还是非受控
    if (!isControlled) {
      setSelected(newValue)
    }
    onChange?.(newValue.map(v => v.value))
  }

  const renderOptions = () => {
    return <div className={style.options}>
      <div className={style.search}>
        <input type="text" placeholder="筛选数据" value={filterText} onChange={e => setFilterText(e.target.value)} />
      </div>
      <ul>
        {filterOptions.map(item =>
          <li
            key={item.value}
            className={classnames({ [style.active]: selected.includes(item) })}
            onClick={() => change(item)}
          >{item.label}</li>
        )}
      </ul>
    </div>
  }

  useEffect(() => {
    const hideOption = () => {
      setShowOption(false)
    }
    document.addEventListener('click', hideOption)
    return () => {
      document.removeEventListener('click', hideOption)
    }
  }, [])

  // 监听父组件更新value
  useEffect(() => {
    if (value !== undefined) {
      setSelected(options.filter(item => value?.includes(item.value)))
    }
  }, [value, options])

  return (
    <div
      className={classnames(style.select_wrap, { [style.active]: showOption })}
      onClick={e => e.stopPropagation()}
    >
      <div
        className={style.selected}
        onClick={() => setShowOption(!showOption)}
      >
        {selected.length === 0 ?
          <div className={style.placeholder}>{placeholder}</div>
        :
          <div className={style.tags}>
            {selected.map(item =>
              <div className={style.tag} key={item.value}>
                {item.label}
                <span onClick={e => {
                  e.stopPropagation()
                  change(item)
                }}>x</span>
              </div>
            )}
          </div>
        }
      </div>
      {showOption &&
        <div className={style.options_wrap}>
          {options.length === 0 ?
            <div className={style.empty}>没有数据</div>
          :
            renderOptions()
          }
        </div>
      }
    </div>
  )
}

export default Select