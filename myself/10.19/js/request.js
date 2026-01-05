

const Data=(
    url,{
        data=null,
        method='GET',
        onSuccess,
        onFail
    }={}
)=>{
    const xhr=new XMLHttpRequest()
    xhr.open(method,url)
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===4){
            if(xhr.status===200){
                const data=JSON.parse(xhr.responseText)
                onSuccess&&onSuccess(data)
            }else{
                onFail&&onFail()
            }
        }
    }
    xhr.send()
}




