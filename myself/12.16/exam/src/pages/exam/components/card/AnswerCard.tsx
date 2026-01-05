import React, { useEffect, useRef, useState } from "react"
import style from "./card.module.scss"
import { Card, Button, Tag } from "antd"
import type { Question } from "../../../../services"
import { useTime } from "../../../../hooks/useTime"
import { replace, useNavigate } from "react-router-dom"

interface Props {
  start:boolean
  finish: boolean
  questions: Question[]
  goFloor: (index: number) => void
  onSubmit: () => void
}

const AnswerCard: React.FC<Props> = (props) => {
  const { timeStr, second, stop } = useTime(10, props.start)
  const navigate = useNavigate()
  const onsubmit = () => {
    stop()
    props.onSubmit()
  }

  const renderActions = () => {
    const actions = [
      <Button type="primary" onClick={onsubmit} disabled={props.finish}>
        提交试卷
      </Button>,
    ]
    return props.finish
      ? [
          ...actions,
          <Button
            type="primary"
            onClick={() => {
              navigate("/history", { replace: true })
            }}
          >
            考试记录
          </Button>,
        ]
      : actions
  }

  useEffect(() => {
    if (second <= 0) {
      props.onSubmit()
    }
  }, [second])
  return (
    <div className={style.Answercard}>
      <Card
        className={style.card}
        title="答题卡"
        extra={<b>{timeStr}</b>}
        actions={renderActions()}
      >
        <div className={style.btns}>
          {props.questions.map((v, i) => {
            return props.finish ? (
              <Tag
                key={v.question}
                className={style.btn}
                color={
                  v.myAnswer
                    ? v.myAnswer === v.result
                      ? "success"
                      : "error"
                    : "warning"
                }
                onClick={() => props.goFloor(i)}
              >
                {i + 1}
              </Tag>
            ) : (
              <Button
                key={v.question}
                className={style.btn}
                type={v.myAnswer ? "primary" : "default"}
                onClick={() => props.goFloor(i)}
              >
                {i + 1}
              </Button>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

export default AnswerCard
