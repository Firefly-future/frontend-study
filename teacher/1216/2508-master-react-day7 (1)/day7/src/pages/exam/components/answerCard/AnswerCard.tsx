import React, { useEffect } from 'react'
import style from './AnswerCard.module.scss'
import { Card, Button } from 'antd'
import type { Question } from '../../../../services'
import { useCountDown } from '../../../../hooks/useCountDown'
import { useNavigate } from 'react-router-dom'

type NewQuestion = Question & { myAnswer?: Question['result'] }

interface Props {
  finish: boolean
  questions: NewQuestion[]
  goFloor: (index: number) => void
  onSubmit: () => void
}

const AnswerCard: React.FC<Props> = (props) => {
  const navigate = useNavigate()

  const { timeStr, stop } = useCountDown(10, true, () => {
    props.onSubmit()
  })

  const onSubmit = () => {
    stop()
    props.onSubmit()
  }

  const renderActions = () => {
    const actions = [
      <Button type="primary" disabled={props.finish} onClick={onSubmit}>提交试卷</Button>
    ]
    return props.finish ? [
      ...actions,
      <Button type="primary" onClick={() => navigate('/history', { replace: true })}>考试记录</Button>
    ] : actions
  }


  return (
    <div className={style.card_wrap}>
      <Card
        className={style.card}
        title="答题卡"
        extra={<b>{timeStr}</b>}
        actions={renderActions()}
      >
        <div className={style.btns}>
          {props.questions.map((v, i) =>
            <Button
              key={v.question}
              className={style.btn}
              type={v.myAnswer ? 'primary' : 'default'}
              onClick={() => props.goFloor(i)}
            >{i + 1}</Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default AnswerCard