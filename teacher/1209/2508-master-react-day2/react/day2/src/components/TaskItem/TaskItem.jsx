import React from 'react'
import style from './TaskItem.module.scss'
import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'

const TaskItem = ({
  title,
  id,
  isDone,
  onDel,
  onChange
}) => {
  const [showEdit, setShowEdit] = useState(false)
  const [editText, setEditText] = useState(title)
  const inpRef = useRef(null)

  const showEditInput = () => {
    setShowEdit(true)
  }

  const save = () => {
    setShowEdit(false)
    onChange(id, 'title', editText)
  }

  useEffect(() => {
    if (showEdit) {
      inpRef.current?.focus()
    }
  }, [showEdit])

  const editRender = () => {
    return (
      <>
        <div className={style.title}>
          <input
            ref={inpRef}
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                save()
              }
            }}
          />
        </div>
        <div className={style.btns}>
          <button className="button primary" onClick={save}>保存</button>
          <button className="button" onClick={() => setShowEdit(false)}>取消</button>
        </div>
      </>
    )
  }

  return (
    <div className={classNames(style.taskItem, {
      [style.done]: isDone
    })}>
      <input type="checkbox" checked={isDone} onChange={e => onChange(id, 'isDone', e.target.checked)} />
      {showEdit ?
        editRender()
      :
        <>
          <div className={style.title}>
            <p onDoubleClick={showEditInput}>{title}</p>
          </div>
          <div className={style.btns}>
            <button className="button warn" onClick={showEditInput}>编辑</button>
            <button className="button danger" onClick={() => onDel(id)}>删除</button>
          </div>
        </>
      }
    </div>
  )
}

export default TaskItem