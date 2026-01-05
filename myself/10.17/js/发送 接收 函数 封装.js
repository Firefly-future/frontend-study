const request = (
    url,
    {
        method = 'get',
        data = null,
        headers = {},
        onSuccess,
        onFail
    } = {}
) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data=JSON.parse(xhr.responseText)
                onSuccess && onSuccess(data)
            } else {
                onFail && onFail()
            }
        }
    }
    if(headers){
        Object.keys(headers).forEach(key=>{
            xhr.setRequestHeader(key,headers[key])
        })
    }
    xhr.send(data)
}
