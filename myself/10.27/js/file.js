const $ = (el, parent = document) => parent.querySelector(el)
const $all = (el, parent = document) => [...parent.querySelectorAll(el)]

const fileInp = $('input')

fileInp.addEventListener('change', e => {
    console.log(e.target)
    const files = [...e.target.files]
    console.log(files)
    renderFile(files)

    Promise.all(files.map(getImgUrl))
    .then(res=>{
        console.log(res)
        $all('li img').forEach((img,i)=>{
            img.src=res[i]
        })
    })
})


// 渲染文件数据
function renderFile(data) {
    $('ul').innerHTML = data.map((item, index) => {
        return `
        <li><img src='' height="300" /></li>
        <li>文件名称：${item.name}</li>
        <li>文件类型：${item.type}</li>
        <li>文件大小：${item.size}</li>
        <li>文件最后修改时间：${new Date(item.lastModifiedDate).toLocaleString()}</li>
        `
    }).join('')
}

// 获取图片
function getImgUrl(file){
    return new Promise((resolve,reject)=>{
        const f=new FileReader()
        f.readAsDataURL(file)
        f.onload=()=>{
            resolve(f.result)
        }
    })
}