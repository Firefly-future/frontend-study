import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { useSearchParams } from 'react-router-dom'
import QuestionItem from '@/components/question/QuestionItem'

const Mistakes = () => {
  const [searchParams] = useSearchParams()
  const examHistory = useSelector((s: RootState) => s.exam.examHistory)

  const curExamList = useMemo(() => {
    const id = Number(searchParams.get('id'))
    return examHistory.find(v => v.id === id)?.list.filter(v => v.myAnswer !== v.result)
  }, [examHistory, searchParams])

  console.log(curExamList)

  return (
    <div style={{ padding: 20 }}>
      {curExamList?.map((item, index) =>
        <QuestionItem
          key={item.question}
          title={index + 1 + '. ' +item.question}
          options={item.options}
          result={item.result}
          myAnswer={item.myAnswer}
          finish
        />
      )}
    </div>
  )
}

export default Mistakes