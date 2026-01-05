

const letters=['A','B','C','D']
Data(`http://39.96.210.90:3000/api/exam_questions`, {
    onSuccess: res => {
        // alert('1')
        document.querySelector('.box').innerHTML = res.map((item,index) => {
            const opts=item.options.map((opt,i)=>{
                // console.log(opt,i)
                
                return `<li><input type='radio' name='${index} value='${opt}'><label for=''>${opt}</label></li>`
            }).join('')
            // console.log(index)
            return `
        <p>${index+1}.${item.question} (${item.score})</p>
        <ul>
        ${opts}
        </ul>
        <div class='answer'>答案：'${item.result}'</div>
        `
        }).join('')
        document.querySelector('.limit ol').innerHTML=res.map((item,index)=>{
                return `<li class='list${index}'>${index+1}</li>`
        }).join('')
    },
    onFail: res => {
        alert('请稍后重试')
    }
})