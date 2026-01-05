const $ = el => document.querySelector(el)
const $all = el => [...document.querySelectorAll(el)]

// 当前展示的题目下标
let questionIndex = 0
// 所有题目
let questions = []

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
})

const questionType = {
  single: '单选题',
  multiple: '多选题'
}

// 渲染题目
function renderQuestion(questionInfo) {
  if (questionIndex === 0) {
    $('.prev').disabled = true
  } else if (questionIndex === questions.length - 1) {
    $('.next').classList.add('hide')
    $('.submit').classList.remove('hide')
  } else {
    $('.prev').disabled = false
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

  $('.question').innerHTML = `
    <div class="info">
      <div class="number">第${questionInfo.id}题</div>
      <div class="score">${questionInfo.score}分</div>
    </div>
    <div class="title">${questionInfo.title}（${questionType[questionInfo.type]}）</div>
    <div class="options">
      ${options}
    </div>
  `
}


// 初始化获取数据
async function getQuestions() {
  const res = await axios.get('/api/question/list')
  questions = res.data.questions
  console.log(questions)
  $('.total-score').textContent = res.data.totalScore
  $('.total-question').textContent = res.data.total
  $('.total-progress').textContent = res.data.total
  renderQuestion(questions[questionIndex])
}

