import { useEffect, useRef, useState } from "react"
import style from "./exam.module.scss"
import AnswerCard from "./components/card/AnswerCard"
import { getQuestions, type Question } from "../../services"
import QuestionItem from "./components/questionItem/QuestionItem"
import { Modal, Spin } from "antd"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import type { RootDispatch } from "@/store"
import { addExam } from "@/store/modules/exam"

const Exam = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const questionWrapEl = useRef<HTMLDivElement | null>(null)
  const [finish, setFinish] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [total, setTotal] = useState<number>(0)
  const navigate = useNavigate()
  const dispatch: RootDispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const timer = useRef<number | null>(null)

  const [start,setStart] = useState(false)

  useEffect(() => {
    timer.current = setTimeout(() => {
      setLoading(false)
      setStart(true)
    }, 3000)
    return () => clearTimeout(timer.current!)
  }, [])

  const handleOk = () => {
    setIsModalOpen(false)
    navigate("/history", { replace: true })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onSubmit = () => {
    console.log(questions)
    setFinish(true)
    const totalScore = questions.reduce((prev, val) => {
      return prev + (val.myAnswer === val.result ? val.score : 0)
    }, 0)
    setTotal(totalScore)
    const correctCount = questions.filter((v) => v.myAnswer === v.result).length
    const errorCount = questions.filter(
      (v) => v.myAnswer && v.myAnswer !== v.result
    ).length
    setIsModalOpen(true)
    // 添加考试记录
    dispatch(
      addExam({
        id: Date.now(),
        examTime: Date.now(),
        list: questions,
        correctCount,
        score: totalScore,
        errorCount,
      })
    )
  }

  useEffect(() => {
    const getQuestionsList = async () => {
      try {
        const res = await getQuestions()
        console.log(res.data)
        setQuestions(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getQuestionsList()
  }, [])
  return (
    <Spin spinning={loading} tip="正在加载资源，请稍后。。。">
    <div className={style.exam}>
      <div className={style.questions}>
        <h3>单选题</h3>
        <div className={style.questionWrap} ref={questionWrapEl}>
          {questions.map((item, index) => {
            return (
              <QuestionItem
                key={item.question}
                title={`${index + 1}.${item.question}`}
                finish={finish}
                myAnswer={item.myAnswer}
                options={item.options}
                result={item.result}
                onChange={(value) => {
                  const newQuestions = [...questions]
                  newQuestions[index].myAnswer = value
                  setQuestions(newQuestions)
                }}
              />
            )
            // return (
            //   <div key={item.question} className={style.question_item}>
            //     <h4>
            //       {index + 1}. {item.question}
            //     </h4>
            //     <Radio.Group
            //       vertical
            //       disabled={finish}
            //       onChange={(e) => {
            //         console.log(e.target.value)
            //         const newQuestions = [...questions]
            //         newQuestions[index].myAnswer = e.target.value
            //         setQuestions(newQuestions)
            //       }}
            //       value={item.myAnswer}
            //       options={item.options.map((option, i) => {
            //         return {
            //           label: `${letters[i]}.${option}`,
            //           value: letters[i],
            //         }
            //       })}
            //     />
            //     {finish && (
            //       <div className={style.answer}>
            //         正确答案：
            //         <Tag
            //           color={
            //             item.myAnswer === item.result ? "success" : "error"
            //           }
            //         >
            //           {" "}
            //           {item.result}{" "}
            //         </Tag>
            //       </div>
            //     )}
            //   </div>
            // )
          })}
        </div>
      </div>
      <AnswerCard
        start={start}
        finish={finish}
        questions={questions}
        onSubmit={onSubmit}
        goFloor={(index) => {
          console.log(
            index,
            (questionWrapEl.current?.children[index] as HTMLDivElement)
              .offsetTop,
            (document.documentElement.scrollTop = (
              questionWrapEl.current?.children[index] as HTMLDivElement
            ).offsetTop)
          )
        }}
      />
      {finish && (
        <Modal
          title="提交成功"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="考试记录"
          cancelText="关闭弹窗"
        >
          <p>考试分数：{total}分</p>
        </Modal>
      )}
    </div>
    </Spin>
  )
}

export default Exam
