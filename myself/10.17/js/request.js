const request = (
    url, {
        data = null,
        method='GET',
        headers={},
        onSuccess,
        onFail
    }={}
) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onreadystatechange = (() => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.stringify(xhr.responseText)
                onSuccess && onSuccess(data)
            } else {
                onFail && onFail()
            }
        }
    })
    if(headers){
        // 获取headers中所有的key并遍历循环
        Object.keys(headers).forEach(key=>{
            xhr.setRequestHeader(key,headers[key])
        })
    }
    xhr.send()
}
