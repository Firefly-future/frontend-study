const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static('./public'))

app.get('/api/question/list', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, './data.json')))
  res.send({
    code: 200,
    message: '成功',
    total: data.length,
    totalScore: data.reduce((prev, val) => prev + val.score, 0),
    questions: data.map(item => {
      const { answer, ...other } = item
      return {
        ...other
      }
    })
  })
})

app.post('/api/submit', (req, res) => {
  const { questions } = req.body
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, './data.json')))
  // 遍历所有的题目
  const totalScore = data.reduce((prev, val) => {
    val.isError = true
    // 用此项题目的id去前端传入的答案中查找对应的题
    const curQuestion = questions.find(v => v.id === val.id)
    // 如果前端没有传入此道题的答案，此题不用算分数
    if (!curQuestion) {
      return prev
    }
    let score = 0
    // 如果此题是单选题并且和数据库中的答案一致就加分
    if (val.type === 'single' && val.answer === curQuestion.answer) {
      score = val.score
      val.isError = false
    } else if (val.type === 'multiple' && val.answer.length === curQuestion.answer.length) {
      // 如果此题是多选题，并且答案数量一致再计算每个答案是否正确
      if (val.answer.every(v => curQuestion.answer.includes(v))) {
        score = val.score
        val.isError = false
      }
    }
    // 把前端传入的参数添加到 val 中
    val.userAnswer = curQuestion.answer
    return prev + score
  }, 0)

  res.send({
    code: 200,
    message: '成功',
    totalScore,
    correctLen: data.filter(v => !v.isError).length,
    data
  })
})

const PORT = 8002
app.listen(PORT, () => {
  console.log(`running http://localhost:${PORT}`)
})