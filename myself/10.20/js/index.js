const $ = (el, parent = document) => parent.querySelector(el)
const $all = (el, parent = document) => [...parent.querySelectorAll(el)]

// 选项字母数组
const letters = ['A', 'B', 'C', 'D']
// 答案数组
const results = []
// 问题数组
let data = []
const xhr = new XMLHttpRequest()
xhr.open('get', `http://39.96.210.90:3000/api/exam_questions`)
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText)
            // console.log(data)
            $('.questions').innerHTML = data.map((item, index) => {
                const opts = item.options.map((v, i) => {
                    return `<li><input type="radio" name="${index}" id="${item.question}_${i}" value='${letters[i]}' data-index='${index}'><label for="${item.question}_${i}">${letters[i]}.${v}</label></li>`
                }).join('')
                return `
                <div class="question-item">
                <h3>${index + 1}.${item.question} (${item.score}分)</h3>
                <ul>
                ${opts}
                </ul>
                </div>
                <div class="answer"> <span>正确答案:${item.result}</span></div>
                `
            }).join('')
            $('.btns').innerHTML = data.map((item, index) => {
                return `<span data-index=${index}>${index + 1}</span>`
            }).join('')
        }
    }
}
xhr.send()
const contDown = new ContDown(
    {
        el: $('.times'),
        time: 9000,
        onEnd: () => {
            console.log('倒计时结束')
            submit()
        }
    }
)

// 点击答题卡题目 跳转至对应题目处
$('.btns').addEventListener('click', e => {
    // console.log(e.target)
    const id = e.target.getAttribute('data-index')
    document.documentElement.scrollTop = $all('.question-item')[id].offsetTop
})

// 选中input后 答题卡对应标签 高亮
$('.questions').addEventListener('change', e => {
    // console.log(e.target)
    const id = e.target.getAttribute('data-index')
    // console.log(id)
    $all('.btns span')[id].classList.add('active1')
    // console.log(`第${id}题`,`答案为${e.target.value}`)
    // 将所选中答案保存在数组中
    results[id] = e.target.value
    // console.log(results)
})

const submit = () => {
    const total = data.reduce((prev, data, index) => {
        let n = 0
        if (data.result === results[index]) {
            n += data.score
        } else {
            $all('.btns span')[index].classList.add('active')
            $all('.questions .question-item h3')[index].classList.add('active')
        }
        $all('.answer')[index].classList.add('show')
        $all('.answer')[index].innerHTML = data.result
        return prev + n
    }, 0)
    contDown.stop()
    $all('ul input').forEach(inp => {
        inp.disabled = true
    })
    $('.submit').disabled = true
    $('.submit').innerText = '已交卷'
    // alert(`共${total}分`)
    $('.tip').classList.add('show')
    $('.tip span').innerText=`${total}`
    // console.log(data)
}
$('.submit').addEventListener('click',submit)
$(".ok").addEventListener('click',e=>{
    $('.tip').classList.remove('show')
})
