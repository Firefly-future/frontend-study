document.body.style.backgroundColor='#ccc'

const xhr=new XMLHttpRequest()
xhr.open('POST','http://10.55.5.7:3001/api/userlist')
xhr.onreadystatechange=()=>{
    if(xhr.readyState===4&&xhr.status===200){
        const data=JSON.parse(xhr.responseText)
        console.log(data)
    }
}
xhr.send(JSON.stringify({
    page:1,
    pagesize:10
}))


// document.body.style.background = '#ccc'

// console.log('我是js文件');

// const xhr = new XMLHttpRequest()
// xhr.open('post', 'http://10.55.5.7:3001/api/userlist')
// xhr.onreadystatechange = () => {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     const data = JSON.parse(xhr.responseText)
//     console.log(data)
//   }
// }
// xhr.send(JSON.stringify({
//   page: 1,
//   pagesize: 5
// }))


