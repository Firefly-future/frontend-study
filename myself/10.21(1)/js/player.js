

const query = getQuery()

// 获取基础信息
async function getBound() {
    try {
        const res = await axios.get('http://39.96.210.90:5001/song/detail?', {
            params: {
                ids: query.id
            }
        })
        // console.log(res)
        const list = res.data.songs[0]
        console.log(list)
        $('.mask-pic img').src = list.al.picUrl
        $('.song-name').innerHTML = `${list.name}<span></span>`
        $('.name').innerHTML = list.ar[0].name
    } catch (e) {
        console.log('请稍后重试')
    }
}
getBound()


// 获取红心数量
async function getHotheart() {
    try {
        const res = await axios.get('http://39.96.210.90:5001/song/red/count',
            {
                params: {
                    id: query.id
                }
            }
        )
        console.log(res)
        $('.like span').innerHTML=res.data.data.countDesc
    }catch(e){
        console.log('请稍后重试')
    }
}
getHotheart()
// 获取评论数量
async function getComment() {
    try {
        const res = await axios.get('http://39.96.210.90:5001/comment/music',
            {
                params: {
                    id: query.id
                }
            }
        )
        console.log(res)
        $('.comment span').innerHTML=Int(res.data.total)
    }catch(e){
        console.log('请稍后重试')
    }
}
getComment()

let lyric=[]
// 获取歌词信息
async function  getlyric(){
    try{
        const res= await axios.get(`http://39.96.210.90:5001/lyric`,{
            params:{
                id:query.id
            }
        })
        console.log(res.data.lrc)
        lyric=res.data.lrc.lyric.split('\n').map(item=>{
            const [key,val]=item.split(']')
            return{
                key:formatLyricTime(key.slice(1)),
                val
            }
        }).filter(item=>item.val)
         console.log(lyric)
        $('.lyric').innerHTML=lyric.map(item=>{
            // console.log(item)
            return`
            <div class="lyric-item">
            <p>${item.val}</p>
            </div>
            `
        }).join('')
    }catch(e){
        console.log(`请稍后重试`)
    }
}
getlyric()

// 获取歌曲url
async function getSongUrl(){
    try{
        const res=await axios.get('http://39.96.210.90:5001/song/url',{
            params:{
                id:query.id
            }
        })
        // console.log(res)
        const url=res.data.data[0]
        $('audio').src=url.url
        // console.log($('audio').src)
        if(url.freeTrialInfo){
            $('.song-name span').innerHTML=`VIP`
        }
        // console.log(url)
    }catch(e){
        console.log(`请稍后重试`)
    }
}
getSongUrl()

const playEnd=[
    'https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/34207669669/f020/7908/a749/34315097c835773c4e003e72fbbae607.png',
    'https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/34207667955/0616/bd45/3537/50928579d6616a7f811d19da1162e149.png'
]

const  audioEl=$('audio')
function play(){
    audioEl.play()
    $('.pause img').src=playEnd[1]
    $('.mask').classList.remove('play')
}
function pause(){
    audioEl.pause()
    $('.pause img').src=playEnd[0]
    $('.mask').classList.add('play')
}
$('.pause').addEventListener('click',()=>{
    if(audioEl.paused){
        play()
    }else{
        pause()
    }
})


audioEl.addEventListener('timeupdate',()=>{
    const index=lyric.findIndex((item,index)=>{
        // console.log(item,index)
        // index+1位置不存在，说明是最后一行
        if(!lyric[index+1])return true
        // 播放到当前时间，且下一个时间大于当前时间，说明是当前行
        return audioEl.currentTime>=item.key&&audioEl.currentTime<lyric[index+1].key
    })
    // 去重
    $(".lyric .active")?.classList.remove('active')
    $all(".lyric-item")[index]?.classList.add('active')
    // console.log($('.lyric').scrollTop)
    // console.log($all('.lyric-item')[index]?.offsetTop)
    $('.lyric').scrollTop=$all('.lyric-item')[index]?.offsetTop-460
    $('.start').innerHTML=formatDuration(audioEl.currentTime)
    const progress=audioEl.currentTime/audioEl.duration
    // console.log(progress)
    $('.line').style.width=progress*100+'%'
    // console.log(progress*100+'%')
    $('.heiht-line').style.left=$('.line').clientWidth*progress
    // console.log($('.line').clientWidth)
    // console.log($('.line').clientWidth*progress)
})
audioEl.addEventListener('ended',()=>{
    pause()
})

// 可以播放，获取总时长
audioEl.addEventListener('canplay',()=>{
    $('.end').innerHTML=formatDuration(audioEl.duration)
})
//  $(".end").innerHTML=formatDuration(audioEl.duration)

// 绑定触摸事件
let isDown=false

$('.progress').addEventListener('touchstart',e=>{
    // console.log(e)
    isDown=true
    $('.heiht-line').classList.add('idDown')
})
$('.progress').addEventListener('touchmove',e=>{
    if(isDown){
        let left=e.touches[0].pageX-$('.progress-item').offsetLeft
        const maxLeft=$('.progress-item').clientWidth
        if(left<=0)left=0
        if(left>=maxLeft)left=maxLeft
        $('.line').style.width=left
        $('.heiht-line').style.left=left-5+'px'

        console.log( $('.line').style.width)
        console.log($('.heiht-line').style.left)

        audioEl.currentTime=left/maxLeft *audioEl.duration
    }
})
$('.progress').addEventListener('touchend',e=>{
    isDown=false
    $('.heiht-line').classList.remove('idDown')
})