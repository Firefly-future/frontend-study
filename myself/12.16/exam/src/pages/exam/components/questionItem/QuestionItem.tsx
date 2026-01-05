import React from "react"
import style from "./questionItem.module.scss"
import { Radio, Tag } from "antd"
import type { Question } from "../../../../services"

interface Props {
  title: string
  finish: boolean
  myAnswer?: Question["result"]
  result: Question["result"]
  options: string[]
  onChange?:(value:Question["result"])=>void
}

const QuestionItem: React.FC<Props> = ({
  title,
  finish,
  myAnswer,
  result,
  options,
  onChange
}) => {
  const letters = ["A", "B", "C", "D"]
  return (
    <div className={style.question_item}>
      <h4>{title}</h4>
      <Radio.Group
        vertical
        disabled={finish}
        onChange={(e) => {
          console.log(e.target.value)
          // const newQuestions = [...questions]
          // newQuestions[index].myAnswer = e.target.value
          // setQuestions(newQuestions)
          onChange?.(e.target.value)
        }}
        value={myAnswer}
        options={options.map((option, i) => {
          return {
            label: `${letters[i]}.${option}`,
            value: letters[i],
          }
        })}
      />
      {finish && (
        <div className={style.answer}>
          正确答案：
          <Tag color={myAnswer === result ? "success" : "error"}>
            {" "}
            {result}{" "}
          </Tag>
        </div>
      )}
    </div>
  )
}

export default QuestionItem
