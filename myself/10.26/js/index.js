
const $ = (el, parent = document) => parent.querySelector(el)
const $all = (el, parent = document) => [...parent.querySelectorAll(el)]

async function getMusic() {
    try {
        const res = await axios.get('http://39.96.210.90:3000/api/music')
        console.log(res.data)
        // const code=res.data.map(item=>{
        //     return item.keyCode
        // }).join('')
        // console.log(code)

        $('ul').innerHTML = res.data.map(item => {
            return `
            <li data-id="${item.id}" code=${item.keyCode} url='${item.url}' bankUrl='${item.bankUrl}'>${item.keyTrigger}</li>
            `
        }).join('')
        $all('ul li',).forEach((item, index) => {
            item.addEventListener('mousedown', e => {
                // console.log(e)
                const id = item.getAttribute('data-id')
                const url = item.getAttribute('url')
                e.target.classList.add('show')
                $('.content').innerHTML = id
                $('audio').src = url
                // console.log(id)
                firstOne()
            })
        })
        $all('ul li',).forEach((item, index) => {
            item.addEventListener('mouseup', e => {
                // console.log(e)
                const id = item.getAttribute('data-id')
                e.target.classList.remove('show')
                $('.content').innerHTML = id
                // console.log(id)
                firstOne()
            })
        })
        // console.log($('html'))
        document.addEventListener('keydown', e => {
            $all('ul li',).forEach((item, index) => {
                // console.log(e)
                const code = Number(item.getAttribute('code'))
                if (e.keyCode === code) {
                    const id = item.getAttribute('data-id')
                    const url = item.getAttribute('url')
                    item.classList.add('show')
                    $('.content').innerHTML = id
                    $('audio').src = url
                }
                // console.log(id)
                firstOne()
            })
        })
        document.addEventListener('keyup', e => {
            $all('ul li',).forEach((item, index) => {
                // console.log(e)
                const code = Number(item.getAttribute('code'))
                if (e.keyCode === code) {
                    const id = item.getAttribute('data-id')
                    const url = item.getAttribute('url')
                    item.classList.remove('show')
                    $('.content').innerHTML = id
                    $('audio').src = url
                }
                // console.log(id)
                firstOne()
            })
        })
        $('.head .btn1').addEventListener('click', e => { 
            $('.head .btn').classList.toggle('active')
            if ($('.content').textContent !== '') {
                $('.content').textContent = ''
                $('audio').src = ''
            }
        })
        function firstOne() {
            if ($('.head .btn').classList.contains('active')) {
                $('.content').textContent = ''
                $('audio').pause()
                $('audio').src = ''
            }
            if (!($('.head .btn').classList.contains('active'))&&($('audio').src)) {
                $('audio').play()
            }
        }
        // firstOne()
    } catch (e) {
        console.log('请稍后重试')
    }
}
getMusic()


let init=false
let clientX=0
let originX=0
let maxLeft=$('.line').clientWidth-$('.line-light').clientWidth
$('.line-light').addEventListener('mousedown',e=>{
    init=true
    clientX=e.clientX
    originX=$('.line').getBoundingClientRect().left
    console.log(clientX,originX)
})
document.addEventListener('mousemove',e=>{
    if(init){
        let left=originX+e.clientX-clientX
        if(left<=0) left=0
        if(left>=maxLeft)left=maxLeft
        $('.line-light').style.left=left+'px'
        // $('audio').volume=x/3
    }
})
document.addEventListener('mouseup',e=>{
    init=false
})



// /* 音量条拖动 */
// const line      = $('.line');
// const lineLight = $('.line-light');
// const audio     = $('audio');

// let dragging = false;
// let originX  = 0;   // 鼠标按下时的 clientX
// let originL  = 0;   // 按钮当前的 left

// lineLight.addEventListener('mousedown', e => {
//     dragging = true;
//     originX = e.clientX;
//     originL = parseInt(getComputedStyle(lineLight).left); // 当前 left
//     e.preventDefault();  // 防止选中文本
// });

// document.addEventListener('mousemove', e => {
//     if (!dragging) return;

//     const dx = e.clientX - originX;              // 鼠标移动差值
//     let newLeft = originL + dx;                  // 按钮新位置

//     const maxLeft = line.clientWidth - lineLight.clientWidth;
//     if (newLeft < 0) newLeft = 0;
//     if (newLeft > maxLeft) newLeft = maxLeft;

//     lineLight.style.left = newLeft + 'px';

//     /* 音量 0~1 */
//     const ratio = newLeft / maxLeft;
//     audio.volume = ratio;
// });

// document.addEventListener('mouseup', () => {
//     dragging = false;
// });