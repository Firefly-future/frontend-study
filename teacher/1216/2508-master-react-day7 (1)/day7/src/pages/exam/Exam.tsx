import { useEffect, useRef, useState } from 'react'
import { getQuestions, type Question } from '../../services'
import AnswerCard from './components/answerCard/AnswerCard'
import style from './Exam.module.scss'
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import QuestionItem from './components/question/QuestionItem'

type NewQuestion = Question & { myAnswer?: Question['result'] }


const Exam = () => {
  const [questions, setQuestions] = useState<NewQuestion[]>([])
  const questionsWrapEl = useRef<HTMLDivElement | null>(null)
  const [finish, setFinish] = useState(false)
  const [total, setTotal] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const res = await getQuestions()
      setQuestions(res.data)
    }
    getData()
  }, [])
  
  const onSubmit = () => {
    setFinish(true)
    setTotal(questions.reduce((prev, val) => {
      return prev + (val.myAnswer === val.result ? val.score : 0)
    }, 0))
    setIsModalOpen(true)
    // 把本次考试记录存到 store
  }

  return (
    <div className={style.page}>
      <div className={style.left}>
        <h3>单选题</h3>
        <div className={style.questions_wrap} ref={questionsWrapEl}>
          {questions.map((item, index) =>
            <QuestionItem
              key={item.question}
              title={`${index + 1}. ${item.question}`}
              finish={finish}
              options={item.options}
              myAnswer={item.myAnswer}
              result={item.result}
              onChange={value => {
                const newQuestions = [...questions]
                newQuestions[index].myAnswer = value
                setQuestions(newQuestions)
              }}
            />
          )}
        </div>
      </div>
      <AnswerCard
        finish={finish}
        questions={questions}
        goFloor={index => {
          document.documentElement.scrollTop = (questionsWrapEl.current?.children[index] as HTMLDivElement).offsetTop
        }}
        onSubmit={onSubmit}
      />
      <Modal
        title="提交成功"
        open={isModalOpen}
        okText="考试记录"
        cancelText="关闭弹窗"
        onOk={() => navigate('/history', { replace: true })}
        onCancel={() => setIsModalOpen(false)}
      >
        <div style={{ textAlign: 'center', fontSize: 20, padding: '30px 0' }}>考试结果：{total}分</div>
      </Modal>
    </div>
  )
}

export default Exam