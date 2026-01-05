const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

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

const PORT = 8002
app.listen(PORT, () => {
  console.log(`running http://localhost:${PORT}`)
})