import style from "./history.module.scss"
import { useNavigate } from "react-router-dom"
import { Flex, Space, Button, Card, Table, Tag, Spin } from "antd"
import { type TableProps, Empty } from "antd"
import {
  FileTextOutlined,
  LikeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import type { ExamHistoryItem } from "@/store/modules/exam"
import { useEffect, useRef, useState } from "react"

const History = () => {
  const navigate = useNavigate()
  const examHistory = useSelector((state: RootState) => state.exam.examHistory)
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

  const columns: TableProps<ExamHistoryItem>["columns"] = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
      render: (_, _record, index) => index + 1,
      align: "center",
    },
    {
      title: "考试时间",
      dataIndex: "examTime",
      key: "examTime",
      render: (_) => new Date(_).toLocaleString(),
      align: "center",
    },
    {
      title: "总题数",
      dataIndex: "total",
      key: "total",
      render: (_, _record) => _record.list.length,
      align: "center",
    },
    {
      title: "正确题数",
      key: "correctCount",
      dataIndex: "correctCount",
      align: "center",
      render: (text) => {
        return (
          <div className={style.icon2}>
            <CheckCircleOutlined />
            <span>{text}</span>
          </div>
        )
      },
    },
    {
      title: "错误题数",
      key: "errorCount",
      dataIndex: "errorCount",
      align: "center",
      render: (text) => {
        return (
          <div className={style.icon3}>
            <CloseCircleOutlined />
            <span>{text}</span>
          </div>
        )
      },
    },
    {
      title: "得分",
      key: "score",
      dataIndex: "score",
      align: "center",
      render: (text) => {
        return (
          <Tag color="default" style={{background:"#FF4D4F",padding:"3px 15px"}}>
            <span>{text}</span>
          </Tag>
        )
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, _record) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              navigate(`/mistakes?id=${_record.id}`)
            }}
          >
            查看错题
          </Button>
        )
      },
    },
  ]
  const average = examHistory.map((item) => {
    return item.score
  })
  const averageScore =
    average.reduce((sum, score) => sum + score, 0) / average.length
  return (
    <div className={style.history}>
      <div className={style.header}>
        <Flex justify="space-between" align="center">
          <div className={style.headerLeft}>
            <Space>
              <FileTextOutlined className={style.icon1} />
              <h2>考试记录</h2>
            </Space>
          </div>
          <div className={style.headerRight}>
            <Button onClick={() => navigate("/")}>返回首页</Button>
          </div>
        </Flex>
      </div>

      {examHistory.length > 0 && (
        <div className={style.body}>
          <Flex>
            <Space>
              <Card className={style.card}>
                <p>考试次数</p>
                <p className={style.count}>{examHistory.length + "次"}</p>
              </Card>
              <Card className={style.card}>
                <p>平均分</p>
                <p className={style.average}>
                  {averageScore.toFixed(1) + "分"}
                </p>
              </Card>
              <Card className={style.card}>
                <p>最高分</p>
                <p className={style.maxScore}>
                  <LikeOutlined /> {Math.max(...average) + "分"}
                </p>
              </Card>
              <Card className={style.card}>
                <p>最低分</p>
                <p className={style.minScore}>{Math.min(...average) + "分"}</p>
              </Card>
            </Space>
          </Flex>
        </div>
      )}

      <Spin spinning={loading} tip="加载中。。。">
        <div className={style.message}>
          <Table<ExamHistoryItem>
            className={style.table}
            columns={columns}
            dataSource={examHistory}
            rowKey="id"
            size="large"
            pagination={{
              total: examHistory.length,
              defaultCurrent:1,
              defaultPageSize: 5,
              showTotal: (total) => `共 ${total} 条记录`,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
              showQuickJumper:true
            }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="暂无考试记录，快去考试吧！"
                >
                  <footer>
                    <Button type="primary" onClick={() => navigate("/exam")}>
                      开始考试
                    </Button>
                  </footer>
                </Empty>
              )
            }}
          />
        </div>
      </Spin>
    </div>
  )
}

export default History
