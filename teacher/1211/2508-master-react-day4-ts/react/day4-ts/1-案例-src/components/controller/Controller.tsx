import React from 'react'
import style from './Controller.module.scss'
import Switch from '../switch/Switch'
import Progress from '../progress/Progress'

interface Props {
  id?: string
  power: boolean
  bank: boolean
  onChangePower:  (value: boolean) => void
  onChangeBank: (value: boolean) => void
  onChangeVolume: (value: number) => void
}

const controller: React.FC<Props> = ({
  id,
  power,
  bank,
  onChangeBank,
  onChangePower,
  onChangeVolume
}) => {
  return (
    <div className={style.controller}>
      <Switch value={power} onChange={onChangePower}>Power</Switch>
      <div className={style.title}>{id}</div>
      <div style={{ padding: '15px 30px', width: '80%' }}>
        <Progress onChange={onChangeVolume}/>
      </div>
      <Switch value={bank} onChange={onChangeBank}>Bank</Switch>
    </div>
  )
}

export default controller