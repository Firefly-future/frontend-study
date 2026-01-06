const $ = el => document.querySelector(el)
const $all = el => [...document.querySelectorAll(el)]

// 当前展示的题目下标
let questionIndex = 0
// 所有题目
let questions = []
// 满分
let maxScore = 0

// 进入页面获取题目
getQuestions()

// 上一题
$('.prev').addEventListener('click', () => {
  questionIndex--
  if (questionIndex < 0) questionIndex = 0
  renderQuestion(questions[questionIndex])
})
// 下一题
$('.next').addEventListener('click', () => {
  questionIndex++
  if (questionIndex > questions.length - 1) questionIndex = questions.length - 1
  renderQuestion(questions[questionIndex])
})
// 点击选项
$('.question').addEventListener('click', e => {
  const { target } = e
  if (target.classList.contains('option-item')) {
    const id = target.getAttribute('data-id')
    if (questions[questionIndex].type === 'single') {
      questions[questionIndex].answer = id
      $('.option-item.active')?.classList.remove('active')
      target.classList.add('active')
    } else {
      if (!questions[questionIndex].answer) {
        questions[questionIndex].answer = []
      }
      // 从已选答案中查找当前选项是否存在
      const index = questions[questionIndex].answer.indexOf(id)
      // 存在就删除，不存在就添加
      if (index === -1) {
        questions[questionIndex].answer.push(id)
      } else {
        questions[questionIndex].answer.splice(index, 1)
      }
      // 切换高亮
      target.classList.toggle('active')
    }
    console.log(questions[questionIndex])
  }
  changeProgress()
})

// 提交试卷
$('.submit').addEventListener('click', () => {
  const params = questions.filter(v => v.answer).map(item => ({
    id: item.id,
    answer: item.answer
  }))
  submit(params)
})
// 关闭弹窗
$('.dialog-close').addEventListener('click', () => {
  $('.dialog').classList.remove('show')
})
// 点击重新测试
$('.dialog-restart').addEventListener('click', restart)
$('.restart').addEventListener('click', restart)

// 改变进度条
function changeProgress() {
  const max = questions.length
  const cur = questions.filter(v => v.answer).length
  $('.progress').style.width = cur / max * 100 + '%'
  $('.progress-percent').textContent = cur / max * 100
  $('.current-progress').textContent = cur
  
}

// 重新测试
function restart() {
  $('.dialog').classList.remove('show')
  questionIndex = 0
  getQuestions()
  $('.submit').disabled = false
  $('.restart').classList.add('hide')
}

// 调用提交接口
async function submit(params) {
  const res = await axios.post('/api/submit', { questions: params })
  if (res.data.code === 200) {
    // 接收有正确答案的题目
    questions = res.data.data
    renderQuestion(questions[questionIndex])
    // 渲染弹窗内容
    $('.dialog').classList.add('show')
    $('.dialog-total-score').textContent = `${res.data.totalScore}分`
    $('.dialog-score').textContent = `${res.data.totalScore} / ${maxScore}分`
    $('.dialog-que-len').textContent = `${res.data.correctLen} / ${questions.length}`
    $('.dialog-list').innerHTML = questions.filter(v => v.userAnswer).map(item => {
      return `
        <div class="dialog-item ${item.isError ? 'err' : ''}">
          <h3>第 ${item.id} 题</h3>
          <div>你的答案：${item.userAnswer} | 正确答案：${item.answer}</div>
        </div>
      `
    }).join('')
    // 禁用提交按钮
    $('.submit').disabled = true
    $('.restart').classList.remove('hide')
  }
}

const questionType = {
  single: '单选题',
  multiple: '多选题'
}

// 渲染题目
function renderQuestion(questionInfo) {
  if (questionIndex === 0) {
    $('.prev').disabled = true
  } else {
    $('.prev').disabled = false
  }
  if (questionIndex === questions.length - 1) {
    $('.next').classList.add('hide')
    $('.submit').classList.remove('hide')
  } else {
    $('.next').classList.remove('hide')
    $('.submit').classList.add('hide')
  }
  const options = questionInfo.options.map(item => {
    let active = ''
    if (questionInfo.type === 'single') {
      active = questionInfo.answer === item.id ? 'active' : ''
    } else {
      active = (questionInfo.answer || []).includes(item.id) ? 'active' : ''
    }
    return `
      <div class="option-item ${active}" data-id="${item.id}">
        <i></i>
        ${item.id} ${item.text}
      </div>
    `
  }).join('')

  const correct = questionInfo.hasOwnProperty('isError') ? `<div class="correct">正确答案：${questionInfo.answer}</div>` : ''

  $('.question').innerHTML = `
    <div class="info">
      <div class="number">第${questionInfo.id}题</div>
      <div class="score">${questionInfo.score}分</div>
    </div>
    <div class="title">${questionInfo.title}（${questionType[questionInfo.type]}）</div>
    <div class="options">
      ${options}
    </div>
    ${correct}
  `
}


// 初始化获取数据
async function getQuestions() {
  const res = await axios.get('/api/question/list')
  questions = res.data.questions
  maxScore = res.data.totalScore
  $('.total-score').textContent = res.data.totalScore
  $('.total-question').textContent = res.data.total
  $('.total-progress').textContent = res.data.total
  renderQuestion(questions[questionIndex])
}

