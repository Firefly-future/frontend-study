import React from 'react'
import style from './Question.module.scss'
import { Radio, Tag } from 'antd'
import type { Question } from '@/services'

const letters = ['A', 'B', 'C', 'D']

interface Props {
  title: string
  finish: boolean
  options: string[]
  myAnswer?: Question['result']
  result: Question['result']
  onChange?: (value: Question['result']) => void
}

const QuestionItem: React.FC<Props> = ({
  title,
  finish,
  options,
  myAnswer,
  result,
  onChange
}) => {
  return (
    <div className={style.question_item}>
      <h4>{title}</h4>
      <Radio.Group
        disabled={finish}
        vertical
        onChange={e => onChange?.(e.target.value)}
        value={myAnswer}
        options={options.map((option, i) => ({
          label: `${letters[i]}. ${option}`,
          value: letters[i]
        }))}
      />
      {finish &&
        <div style={{ padding: '10px 0' }}>
          正确答案:
          <Tag color={myAnswer === result ? 'success' : 'error'}>
            {result}
          </Tag>
        </div>
      }
    </div>
  )
}

export default QuestionItem