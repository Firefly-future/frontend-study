import React, { useEffect } from 'react'
import style from './Keyboard.module.scss'
import type { MusicItem } from '../../services'
import classNames from 'classnames'

export type KeyboardItem = MusicItem & { isDown: boolean }

interface Props {
  power: boolean
  list: KeyboardItem[]
  onPlay: (item: KeyboardItem) => void
  onMouseup: (keyCode: number) => void
}

// const Keyboard = (props: Props) => {
const Keyboard: React.FC<Props> = ({
  power,
  list,
  onPlay,
  onMouseup
}) => {

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      const item = list.find(v => v.keyCode === e.keyCode)
      if (item) {
        onPlay(item)
      }
    }
    const keyup = (e: KeyboardEvent) => {
      onMouseup(e.keyCode)
    }
    document.addEventListener('keydown', keydown)
    document.addEventListener('keyup', keyup)
    return () => {
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('keyup', keyup)
    }
  }, [list, onPlay])

  return (
    <div className={style.keyboard}>
      <ul>
        {list.map(item =>
          <li
            key={item.id}
            className={classNames({
              [style.down]: item.isDown,
              [style.active]: item.isDown && power
            })}
            onMouseDown={() => onPlay(item)}
            onMouseUp={() => onMouseup(item.keyCode)}
          >{item.keyTrigger}</li>
        )}
      </ul>
    </div>
  )
}

export default Keyboard