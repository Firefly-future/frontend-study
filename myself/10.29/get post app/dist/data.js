

const xhr=new XMLHttpRequest()
xhr.open('post','http://localhost:3001/api/userlist')
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