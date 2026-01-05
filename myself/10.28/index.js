document.body.style.backgroundColor = '#ccc'

console.log( 'hello world')





const xhr=new XMLHttpRequest()
xhr.open('post','http://39.96.210.90:3000/api/music')
xhr.onreadystatechange=()=>{
    if(xhr.readyState===4&&xhr.status===200){
        const data=JSON.parse(xhr.responseText)
        console.log(data)
    }
}
xhr.send(JSON.stringify(
    {
        page:1,
        pagesize:10
    }
))