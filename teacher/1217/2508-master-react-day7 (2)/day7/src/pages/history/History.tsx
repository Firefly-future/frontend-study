import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import style from './History.module.scss'
import { Button, Flex, Row, Col, Table } from 'antd'
import type { TableProps } from 'antd'
import type { ExamHistoryItem } from '@/store/models/exam'
import { useNavigate } from 'react-router-dom'


const History = () => {
  const navigate = useNavigate()
  const examHistory = useSelector((s: RootState) => s.exam.examHistory)

  const columns: TableProps<ExamHistoryItem>['columns'] = [
    {
      title: '序号',
      key: 'index',
      render: (_, record, index) => index + 1
    },
    {
      title: '考试时间',
      dataIndex: 'examTime',
      key: 'examTime',
      render: (_) => new Date(_).toLocaleString()
    },
    {
      title: '总题数',
      key: 'total',
      render: (_, record) => record.list.length
    },
    {
      title: '正确题数',
      dataIndex: 'correctCount',
      key: 'correctCount'
    },
    {
      title: '错误题数',
      dataIndex: 'errorCount',
      key: 'errorCount'
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return <Button size="small" type="primary" onClick={() => {
          navigate(`/mistakes?id=${record.id}`)
        }}>查看错题</Button>
      }
    }
  ]
  
  return (
    <div className={style.page}>
      <Flex justify="space-between" style={{ marginBottom: 20 }}>
        <h2>考试记录</h2>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </Flex>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <div className={style.box}>111</div>
        </Col>
        <Col span={6}>
          <div className={style.box}>222</div>
        </Col>
        <Col span={6}>
          <div className={style.box}>333</div>
        </Col>
        <Col span={6}>
          <div className={style.box}>444</div>
        </Col>
      </Row>
      <Table<ExamHistoryItem>
        columns={columns}
        dataSource={examHistory}
        rowKey={row => row.id}
      />
    </div>
  )
}

export default History