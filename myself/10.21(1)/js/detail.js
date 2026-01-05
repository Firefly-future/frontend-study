




const query = getQuery()
console.log(query)
// 头部
async function head() {
    try {
        const res = await axios.get('http://39.96.210.90:5001/playlist/detail', {
            params: {
                id: query.id
            }
        })
        // console.log(res.data)
        const list=res.data.playlist
        $('.headleft').innerHTML=`<img src="${list.coverImgUrl}" alt="">`
        $('.headright').innerHTML=`
                <h1>${list.name}</h1>
                <div>
                    <img src="${list.creator.avatarUrl}" alt="">
                    <h3>${list.creator.nickname}</h3>
                </div>
        `
        $('.bg').style.backgroundImage=`${list.coverImgUrl}`
        $('.desc').innerHTML=`${list.description}`
    } catch (e) {
        console.log('请稍后重试')
    }
}
head()
// 歌曲列表
async function section1(){
    try{
        const res=await axios.get( `http://39.96.210.90:5001/playlist/detail`,{
            params:{
                id:query.id,
            }
        })
        // console.log(res.data.playlist)
        const songlist=res.data.playlist.tracks.slice(0,20)
        // console.log(songlist)
        $('.song-list').innerHTML=songlist.map((item,index)=>{
             const artist=item.ar.map(v=>v.name).join('/')
             console.log(artist)
            //  console.log(item)
            return `
                <div class="list-item" data-id=${item.id}>
                    <div style="pointer-events: none;">
                        <div class="page">${index+1}</div>
                        <div>
                            <div class="name">${item.name}</div>
                            <div class="artist">${artist} - ${item.al.name}</div>
                            <div class="bg1"></div>
                        </div>
                    </div>
                </div>
            `
        }).join('')
        $all('.list-item').forEach(item=>{
            item.addEventListener('click',()=>{
                const id=item.getAttribute('data-id')
                location.href=`./player.html?id=${id}`
            })
        })
    }catch(e){
        console.log('请稍后重试')
    }
}
section1()

// 精彩评论区
async function Hotcomment(){
    try{
        const res=await axios.get('http://39.96.210.90:5001/comment/playlist',{
            params:{
                id:query.id
            }
        })
        console.log(res)
        
        $('.Hotcomment').innerHTML=res.data.hotComments.map((item,index)=>{
            const reply=item.beReplied.length>0?`回复<span style='color:blue'>@${item.beReplied[0].user.nickname}</span>:`:``
            const content=item.beReplied.length>0?`<div>${item.beReplied[0].user.nickname}:${item.beReplied[0].content}</div>`:``
            // console.log(item.time)
            const time=new Date(item.time)
            const update=time.getFullYear()+'年'+time.getMonth()+1+'月'+time.getDate()+'日'
            return `
                <div class="comment-list">
                    <div class='pic'><img src="${item.user.avatarUrl}" alt=""></div>
                    <div class='user'>
                        <div class="name">${item.user.nickname} <span>${item.likedCount}</span></div>
                        <div class="date">${item.timeStr}</div>
                        <div class="con">${reply}${item.content}</div>
                        ${content}
                    </div>
                </div>
            `
        }).join('')
    }catch(e){
            console.log('请稍后重试')
        }
}
Hotcomment()

// 最新评论区
async function Newcomment(){
    try{
        const res=await axios.get('http://39.96.210.90:5001/comment/playlist',{
            params:{
                id:query.id
            }
        })
        console.log(res)
        $('.Newcomment').innerHTML=res.data.comments.map((item,index)=>{
            const reply=item.beReplied.length>0?`回复<span style='color:blue'>@${item.beReplied[0].user.nickname}:</span>`:``
             const content=item.beReplied.length>0?`<div>${item.beReplied[0].user.nickname}:${item.beReplied[0].content}</div>`:``
            // console.log(item.time)
            // console.log(item.time)
            const time=new Date(item.time)
            const update=time.getFullYear()+'年'+time.getMonth()+1+'月'+time.getDate()+'日'
            return `
                <div class="comment-list">
                    <div class='pic'><img src="${item.user.avatarUrl}" alt=""></div>
                    <div class='user'>
                        <div class="name">${item.user.nickname} <span>${item.likedCount}</span></div>
                        <div class="date">${item.timeStr}</div>
                        <div class="con">${reply}${item.content}</div>
                        ${content}
                    </div>
                </div>
            `
        }).join('')
    }catch(e){
            console.log('请稍后重试')
        }
}
Newcomment()