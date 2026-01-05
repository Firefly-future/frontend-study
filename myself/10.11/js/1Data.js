
const nameArr=['小红','小明','小白','小蝶','小灰','小青龙','灰宝','教授','丹宝','蛋黄','蝶宝','提宝','金织','门径','死亡','救世','负世','记忆']

const ageArr=[17,18,19,16]
const classArr=['A','B','C','D']

const classFn=function(grade){
    if(grade>=60&&grade<70)return 'D'
    if(grade>=70&&grade<80)return 'C'
    if(grade>=80&&grade<90)return 'B'
    if(grade>=90)return 'A'
}
const random=(min,max)=>Math.floor(Math.random()*(max-min+1)+min)

let ar=function(n,Arr){
    let arr=[]
    while(arr.length<n){
        let index=random(0,Arr.length-1)
        if(arr.indexOf(Arr[index]===-1))arr.push(Arr[index])
    }
return arr
}



// 数据函数
const createData=function(total){
    const data=[]
    for(let i=0;i<total;i++){
        const grade=random(60,100)
        data.push({
            name:ar(1,nameArr),
            age:ar(1,ageArr),
            grade,
            class:classFn(grade),
        })
    }
    return data
}
console.log(createData(10))