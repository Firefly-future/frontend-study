import { Empty, Button, Flex, Tag, Space, Radio, Spin } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import style from "./mistakes.module.scss"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import type { ExamHistoryItem } from "@/store/modules/exam"
import { useEffect, useRef, useState } from "react"

const Mistakes = () => {
  const navigate = useNavigate()
  const examHistory = useSelector((state: RootState) => state.exam.examHistory)
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const timer = useRef<number | null>(null)
  useEffect(() => {
    timer.current = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => {
      clearTimeout(timer.current!)
    }
  }, [examHistory])
  console.log(location)
  const newExamHistory: ExamHistoryItem[] = examHistory.filter((v) =>
    location.search.includes(v.id.toString())
  )
  const examtime = newExamHistory.find((item) => item.examTime)?.examTime
  const totalscore = newExamHistory.find((item) => item.score)?.score || 0
  const errorcount =
    newExamHistory.find((item) => item.errorCount)?.errorCount || 0
  const fail = newExamHistory.flatMap((item) =>
    item.list.filter((v) => v.myAnswer && v.myAnswer !== v.result)
  )
  const letters = ["A", "B", "C", "D"]
  console.log(fail)

  return (
    <>
    <Spin spinning={loading} tip="加载中。。。请稍后" size="large">
      {newExamHistory.length === 0 ? (
        <Empty description="未找到考试记录" className={style.empty}>
          <footer>
            <Button type="primary" onClick={() => navigate("/history")}>
              返回考试记录
            </Button>
          </footer>
        </Empty>
      ) : (
        <div className={style.mistakes}>
          <div className={style.header}>
            <Flex justify="space-between" align="center">
              <div className={style.headerLeft}>
                <h2>错题本</h2>
                <p>
                  考试时间：
                  <span>{new Date(examtime!).toLocaleString()} </span>|
                  考试得分：<span>{totalscore}分</span>| 错题数量：
                  <span>{errorcount}题</span>
                </p>
              </div>
              <div className={style.headerRight}>
                <Button onClick={() => navigate("/history")}>返回记录</Button>
              </div>
            </Flex>
          </div>
          {errorcount === 0 ? (
            <Empty
              description="恭喜！本次考试全部答对，没有错题"
              className={style.empty}
            />
          ) : (
            <div className={style.fail}>
              {fail.map((item, index) => {
                return (
                  <div className={style.failItem} key={item.question}>
                    <div className={style.header}>
                      <h4>
                        <Space>
                          <Tag color="error" className={style.tag}>
                            错题
                          </Tag>
                          {index + 1}.{item.question}
                        </Space>
                      </h4>
                      <Tag color="cyan" className={style.tag}>
                        分值：{item.score}分
                      </Tag>
                    </div>
                    <Radio.Group
                      vertical
                      disabled
                      style={{ padding: "10px" }}
                      options={item.options.map((option, i) => {
                        const label = (
                          <>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color:
                                    letters[i] === item.myAnswer
                                      ? "red"
                                      : letters[i] === item.result
                                      ? "green"
                                      : "inherit",
                                }}
                              >
                                {letters[i]}. {option}
                              </span>

                              {letters[i] === item.myAnswer && (
                                <Tag
                                  color="red"
                                  style={{ marginLeft: 24 }}
                                  className={style.tags}
                                >
                                  你的答案
                                </Tag>
                              )}
                              {letters[i] === item.result && (
                                <Tag
                                  color="green"
                                  style={{ marginLeft: 24 }}
                                  className={style.tags}
                                >
                                  正确答案
                                </Tag>
                              )}
                            </div>
                          </>
                        )
                        return {
                          label,
                          value: `${letters[i]}`,
                          style: {
                            padding: "8px",
                            width: "100%",
                            borderRadius: "10px",
                            border:
                              letters[i] === item.result
                                ? "1px solid #B7EB8F"
                                : letters[i] === item.myAnswer
                                ? "1px solid #FFCCC7"
                                : "1px solid #D9D9D9",
                            background:
                              letters[i] === item.myAnswer
                                ? "#FFF2F0"
                                : letters[i] === item.result
                                ? "#F6FFED"
                                : "#FAFAFA",
                          },
                        }
                      })}
                    />
                    <div className={style.answer}>
                      <div className={style.myAnswer}>
                        {" "}
                        你的答案:<span>{item.myAnswer}</span>
                      </div>
                      <div className={style.result}>
                        {" "}
                        正确答案:<span>{item.result} </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
      </Spin>
    </>
  )
}

export default Mistakes
