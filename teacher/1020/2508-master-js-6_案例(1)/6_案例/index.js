const $ = el => document.querySelector(el)
const $all = el => [...document.querySelectorAll(el)]

// 选中的答案
const results = []
// 所有题目
let questions = []


// 获取题目列表数据
const getQuestions = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('get', 'http://39.96.210.90:3000/api/exam_questions')
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        questions = JSON.parse(xhr.responseText)
        renderQuestions(questions)
        renderCardBtns(questions)
      }
    }
  }
  xhr.send()
}
getQuestions()

// 渲染题目列表
const renderQuestions = data => {
  const letters = ['A', 'B', 'C', 'D']
  $('.questions').innerHTML = data.map((item, index) => {
    // 渲染题目选项
    const options = item.options.map((v, i) => `
      <li>
        <input id="option_${index}_${i}" type="radio" name="question${index}" value="${letters[i]}" data-index="${index}" />
        <label for="option_${index}_${i}">${letters[i]}. ${v}</label>
      </li>
    `).join('')
    return `
      <div class="question-item">
        <h4>${index + 1}. ${item.question} (${item.score}分)</h4>
        <ul>
          ${options}
        </ul>
        <div class="answer">正确答案: <span></span></div>
      </div>
    `
  }).join('')

  // 给题目绑定 change 事件
  $('.questions').addEventListener('change', e => {
    // 查找修改的题目的下标，给右侧对应的按钮添加高亮
    const index = e.target.getAttribute('data-index')
    $all('.card .btns button')[index].classList.add('active')
    console.log(`第${index}题, 答案${e.target.value}`)
    // 把选中的答案存到数组中
    results[index] = e.target.value
  })
}
// 渲染答题卡按钮
const renderCardBtns = data => {
  $('.card .btns').innerHTML = data.map((item, index) => {
    return `
      <button class="card-btn" data-index="${index}">${index + 1}</button>
    `
  }).join('')
  $('.card').addEventListener('click', e => {
    if (e.target.classList.contains('card-btn')) {
      // 给答题卡按钮绑定事件，获取点击按钮的下标，跳转到左侧题目对应的位置
      const index = e.target.getAttribute('data-index')
      // 让页面滚动条滚动到对应元素的位置
      document.documentElement.scrollTop = $all('.question-item')[index].offsetTop
    }
  })
}

// 初始化倒计时
const countDown = new CountDown({
  el: $('.count-down'),
  time: 5000, // ms
  onEnd: () => {
    // 倒计时结束回调
    console.log('倒计时结束了')
    submit()
  }
})

// 提交
const submit = () => {
  // 遍历所有题目，和选中的答案对比计算总分
  const total = questions.reduce((prev, question, index) => {
    let n = 0
    if (question.result === results[index]) {
      // 题目的答案和当前选中的题目答案一致就加分
      n += question.score
    } else {
      // 否则把按钮变成错误颜色
      $all('.card .btns button')[index].classList.add('err')
      $all('.question-item h4')[index].style.color = 'red'
    }
    // 展示正确答案
    $all('.answer')[index].classList.add('show')
    $all('.answer span')[index].textContent = question.result
    return prev + n
  }, 0)
  // 禁用所有题目选项
  $all('.questions input').forEach(inp => inp.disabled = true)
  // 停止倒计时
  countDown.stop()
  // 禁用提交按钮
  $('.card-footer button').disabled = true
  $('.card-footer button').textContent = '已交卷'
  console.log('总分', total)
  alert(`共${total}分`)
}
$('.card-footer button').addEventListener('click', submit)