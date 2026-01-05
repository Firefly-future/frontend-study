
// 点击切换高亮
$all('.nav-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        $('.nav-item.active').classList.remove('active')
        item.classList.add('active')
        $('.tab.show').classList.remove('show')
        $all('.tab')[index].classList.add('show')
    })
})




// 编辑推荐列表
async function playlist() {
    try {
        const res = await axios.get("http://39.96.210.90:5001/top/playlist/highquality")
        console.log(res)
        res.data.playlists.sort(() => Math.random() - 0.4)
        const list = res.data.playlists.slice(0, 6)
        console.log(list)
        $('.edit').innerHTML = list.map(item => {
            return `
             <div class="edit-item" data-id="${item.id}">
             <div style="potinter-events:none">
                        <img src="${item.coverImgUrl}" alt="">
                        <p>${item.name}</p>
                        <div class="playCount">${Int(item.playCount)}</div>
            </div>
            </div>
            `
        }).join('')
        //  点击推荐列表跳转至详情页
        $('.recommend.edit').addEventlistener('click', e => {
            if (e.target.classList.contains('.edit-item')) {
                const id = e.target.getAttribute('data-id')
                location.href = `./detail.html?id=${id}`
            }
        })
} catch (e) {
    alert('请求失败，请稍后重试')
}
}
playlist()


// 最新音乐列表

async function newSong() {
    try {
        const res = await axios.get("http://39.96.210.90:5001/personalized/newsong")
        console.log(res)

        $('.edit-list').innerHTML = res.data.result.map((item, index) => {
            const artists = item.song.artists.map(v => v.name).join('/')
            return `
            <div class="new-song-item" data-id="${item.id}">
            <div style="pointer-events:none">
            <div class='song-info'>
            <div class="new-song-name">
              ${index + 1}.${item.name}
            </div>
            <div class="artist">${artists} - ${item.name}</div>
            </div>
            <div class="bg"></div>
            </div>
            </div>
            `
        }).join('')
    } catch (e) {
        alert('请求失败，请稍后重试！')
    }
}
newSong()