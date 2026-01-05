const $ = (el, parent = document) => parent.querySelector(el)
const $all = (el, parent = document) => [...parent.querySelectorAll(el)]
const audio = $('audio')

let musicData = []
let power = true
let bank = false


// 获取数据
async function getData() {
    try {
        const res = await axios.get('http://39.96.210.90:3000/api/music')
        console.log(res.data)
        musicData = res.data
        render(res.data)
    } catch (e) {
        console.log('请稍后重试')
    }
}
getData()


// 渲染键盘数据函数  
function render(list) {
    $('ul').innerHTML = list.map(item => {
        return `<li class='item' code='${item.keyCode}'>${item.keyTrigger}</li>`
    }).join('')
}

// 音乐播放函数
function play(code) {
    const index = musicData.findIndex(v => v.keyCode === Number(code))
    if (index > -1) {
        $all('.item')[index].classList.add('active')
        if (power) {
            // 若power打开 则播放音乐并添加高亮
            audio.src = bank ? musicData[index].bankUrl : musicData[index].url
            audio.autoplay = true
            $all('.item')[index].classList.add('show')
            $('.content').textContent = musicData[index].id
        }
    }
}

// 事件委托 绑定鼠标按下抬起和键盘按下抬起事件
$('ul').addEventListener('mousedown', e => {
    if (e.target.classList.contains('item')) {
        const code = e.target.getAttribute('code')
        play(code)
    }
})
$('ul').addEventListener('mouseup', e => {
    $('.active')?.classList.remove('active')
    $('.show')?.classList.remove('show')
})
document.addEventListener('keydown', e => {
    play(e.keyCode)
})
document.addEventListener('keyup', e => {
    $('.active')?.classList.remove('active')
    $('.show')?.classList.remove('show')
})

// 两个开关
$('.head .btn1').addEventListener('click', e => {
    power = !power//切换开关
    $('.head .btn').classList.toggle('active')
    if (!power) {
        $('.content').textContent = ''
    }
})
$('.foot .btn1').addEventListener('click', e => {
    bank = !bank//切换歌曲类型的开关
    $('.foot .btn').classList.toggle('active')
})


// 音量

let volumnisDown=false
let originLeft=0
let maxLeft=$('.line').clientWidth-$('.line-light').clientWidth

$('.line-light').addEventListener('mousedown',e=>{
    volumnisDown=true
    originLeft=$('.line').getBoundingClientRect().left
})
document.addEventListener('mouseup',e=>{
    volumnisDown=false
})
document.addEventListener('mousemove',e=>{
    if(volumnisDown){
        let left=e.clientX-originLeft
        if(left<=0)left=0
        if(left>=maxLeft)left=maxLeft
        $('.line-light').style.left=left+'px'
        audio.volumn=left/maxLeft
    }
})