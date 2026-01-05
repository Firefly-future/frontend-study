{
    const p=new Promise<number>((resolve,reject)=>{
        resolve(100)
    })

    p.then(res=>{
        console.log(res.toFixed(2))
    })
}