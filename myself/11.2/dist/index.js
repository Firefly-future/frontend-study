const $ = (el, parent = document) => parent.querySelector(el)
const $all = (el, parent = document) => [...parent.querySelectorAll(el)]

// async function getQuestions() {
//     try {
//         const res = await axios.get('/api/questions')
//         console.log(res.data)
//         $('main').innerHTML = res.data.data.map((item, index) => {
//             const lists = item.options.map(opt => `<li><input type="${item.type === 'single' ? 'radio' : 'checkbox'}" name="${item.id}" id="${index}${opt.id}" value="${opt.id}"><label for="${index}${opt.id}">&nbsp;${opt.id}&nbsp;${opt.text}</label></li>`).join('')
//             return `
//              <div class="page" data-page="${index + 1}">
//              <div class="questions">
//                 <div class="qusetions-item">第<span>${item.id}</span>题</div>
//                 <div class="score">分值：<span>${item.score}</span></div>
//             </div>
//             <div class="question">
//                 <div class="title">
//                     <p>${item.title}</p>
//                     <ul>
//                         ${lists}
//                     </ul>
//                 </div>
//                 <div class="answer">
//                     <p>正确答案：<span></span></p>
//                 </div>
//             </div>
//             <div class="btnes">
//                 <button class="btn prev">&larr;上一题</button>
//                 <button class="btn show next">下一题&rarr;</button>
//                 <button class="btn submit">✅提交答案</button>
//                 <button class="btn retest">🔃重新测试</button>
//             </div>
//             </div>
//             `
//         }).join('')
//         if(currentPage==$all('.page').length){
//             $(`.next`).classList.remove('show')
//             $(`.submit`).classList.add('show')
//         }else{
//             $(`.next`).classList.add('show')
//             $(`.submit`).classList.remove('show')
//         }
//         $('.current span').textContent = currentPage
//         $('.completed span').textContent = currentPage * 10 + '%'
//         showPage(currentPage)
//     } catch (e) {
//         console.log('出错了')
//     }
// }
// getQuestions()

// document.addEventListener('click', e => {
//     if (e.target.classList.contains('next')) {
//         currentPage++
//         if (currentPage >$all('.page').length) {
//             currentPage = $all('.page').length
//         }
//         $('.current span').textContent = currentPage
//         $('.completed span').textContent = currentPage * 10 + '%'
//         showPage(currentPage)
//     }

//     if (e.target.classList.contains('prev')) {
//         currentPage--
//         if (currentPage < 1) {
//             currentPage = 1
//         }
//         $('.current span').textContent = currentPage
//         $('.completed span').textContent = currentPage * 10 + '%'
//         showPage(currentPage)
//     }
//     if (e.target.classList.contains('close')) {
//         $('.tip').classList.remove('show')
//         $('.current span').textContent = currentPage
//         $('.completed span').textContent = currentPage * 10 + '%'
//     }
//     if (e.target.classList.contains('retest')) {
//         currentPage = 1
//         $('.current span').textContent = currentPage
//         $('.completed span').textContent = currentPage * 10 + '%'
//         showPage(currentPage)
//     }
// })

// function showPage(page) {
//     $all('.page').forEach(p => {
//         const pageNum = p.getAttribute('data-page')
//         if (pageNum == page) {
//             p.classList.add('show')
//         } else {
//             p.classList.remove('show')
//         }
//     })
// }


//当前展示的题目下标 
let questionIndex = 0
// 所有题目
let questions = []
// 总共的题数
let total = 0
// 满分
let totalScore = 0
// 进入页面即获取题目渲染
getQuestions()

// 点击下一题
$('.next').addEventListener('click', e => {
    questionIndex++
    if (questionIndex > questions.length - 1) {
        questionIndex = questions.length - 1
    }
    renderQuestion(questions[questionIndex])
})
// 点击上一题
$('.prev').addEventListener('click', e => {
    questionIndex--
    if (questionIndex < 0) {
        questionIndex = 0
    }
    renderQuestion(questions[questionIndex])
})
// 点击选项
$('.page').addEventListener('click', e => {
    let target = e.target
    if (target.classList.contains('option-item')) {
        const id = target.getAttribute('data-id')
        // 单选选中答案 放入对应的题目中
        if (questions[questionIndex].type === 'single') {
            questions[questionIndex].answer = id
            $('.option-item.active')?.classList.remove('active')
            target.classList.add('active')
        } else {
            // 多选 无答案就空数组
            if (!questions[questionIndex].answer) {
                questions[questionIndex].answer = []
            }
            //从已选答案中查找当前选项是否存在 
            const index = questions[questionIndex].answer.indexOf(id)
            // 存在就删除 不存在就添加
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
    progressChange()
})
// 点击提交
$('.submit').addEventListener('click', e => {
    $('.submit').disabled = true
    $('.retest').classList.remove('hide')
    $('.tip').classList.add('show')
    const params = questions.filter(v => v.answer).map(item => ({
        id: item.id,
        answer: item.answer
    }))
    submit(params)

})
// 点击关闭
$('.close').addEventListener('click', e => {
    $('.tip').classList.remove('show')
})
//点击重新测试
$('.retest').addEventListener('click', e => {
    restest()
})
// 进度条
function progressChange() {
    const max = questions.length
    let cur = 0
    cur = questions.filter(v => v.answer).length
    $('.line-scroll').style.width = cur / max * 100 + '%'
    $('.completed span').innerHTML = cur / max * 100 + '%'
}
function restest() {
    questionIndex = 0
    getQuestions()
    $('.tip').classList.remove('show')
    $('.submit').disabled = false
    $('.retest').classList.add('hide')
    $('.line-scroll').style.width = 0
    $('.line-progress').innerHTML = `
    <p class="current">进度：<span>0</span>/${total}</p>
    <p class="completed">已完成：<span>0%</span></p>
    `
}
$('.btns-retest').addEventListener('click', e => {
    restest()
})
// 初始化获得信息
async function getQuestions() {
    try {
        const res = await axios.get('/api/questions')
        console.log(res.data)
        questions = res.data.data
        totalScore = res.data.totalScore
        total = res.data.total
        console.log(questions)
        $('.scoreCount').innerHTML = `<p>满分：${res.data.totalScore}分</p>|<p>共${res.data.total}题</p>`
        $('.line-progress').innerHTML = `<p class="current">进度：<span>0</span>/${res.data.total}</p>
        <p class="completed">已完成：<span>0%</span></p>`
        renderQuestion(questions[questionIndex])
    } catch (e) {
        console.log('有错误哦，再检查检查吧')
    }
}
// 题目类型
const questionType = {
    single: '单选题',
    multiple: '多选题'
}
// 渲染题目
function renderQuestion(questionInfo) {
    // 判断页码 不出界 当前为第一页 上一页禁用
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
    // $('.completed span').innerHTML=(`${questionInfo.id}`/total)*100+'%'
    $('.current span').innerHTML = `${questionInfo.id}`
    // $('.line-scroll').width=(`${questionInfo.id}`/total)*100+'%'
    $('.questions-item').innerHTML = `第${questionInfo.id}题`
    $('.questions .score').innerHTML = `分值：${questionInfo.score}分`
    $('.question .title p').innerHTML = `${questionInfo.title}(${questionType[questionInfo.type]})`
    const options = questionInfo.options.map(item => {
        //判断是否选择 保持高亮状态
        let active = ''

        if (questionInfo.type === 'single') {
            active = questionInfo.answer === item.id ? 'active' : ''
        } else {
            active = (questionInfo.answer || []).includes(item.id) ? 'active' : ''
        }
        const src = () => {
            return `${active}?./2.png : ./1.png`
        }
        return `<li class="option-item ${active}" data-id=${item.id}><img src='' /> ${item.id} ${item.text}</li>`
    }).join('')
    $('.question ul').innerHTML = `${options}`
    // 如果有正确答案，显示答案
    if (questionInfo.answer) {
        $('.answer').classList.add('show')
        $('.answer span').innerHTML = questionInfo.answer
    } else {
        $('.answer').classList.remove('show')
        $('.answer span').innerHTML = ''
    }
}
// 提交接口
async function submit(params) {
    try {
        const res = await axios.post('/api/submit', {
            questions: params
        })
        console.log(res)
        if (res.data.code === 200) {
            // 接收有正确答案的题目
            questions = res.data.data
            renderQuestion(questions[questionIndex])
            // 渲染弹窗内容
            $('.tip-message h1 span').innerHTML = `${res.data.totalScore}分`
            $('.tip-message h4').innerHTML = `<span>${res.data.totalScore}</span>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;${totalScore}&nbsp;&nbsp;分`
            $('.tip-message>p').innerHTML = `正确题数：<span>${res.data.correctLength}</span>/${total}`
            $('.tip-message ul').innerHTML = res.data.data.map(item => {
                return `
            <li class='high ${item.isError ? 'err' : ''}'>
                <div>第<span>${item.id}</span>题<p>你的答案：<span>${item.userAnswer ? item.userAnswer : ''}</span>|正确答案：<span>${item.answer}</span></p>
                </div>
                <p><span>${item.isError ? 0 : item.score}</span>/${item.score}</p>
            </li>
            `
            }).join('')
        }
    } catch (e) {
        console.log('有错误哦~再检查检查吧')
    }
}
