function $(el, parent = document) {
    return parent.querySelector(el)
}
function gets(el, parent = document) {
    return [...parent.querySelectorAll(el)]
}
var date = new Date()
var da = date.toString().slice(0, 15)
var time = $('.time')
time.innerHTML = da

var box = $('.box')

var task = gets('.allTasks li')
box.addEventListener('keydown', function (e) {
    var key = e.keyCode || window.event.keyCode
    if (key === 13) {
        var inp = $('.inp').value.trim()
        if (!inp) return alert('输入的任务不能为空哦')
        var li = document.createElement('li')
        li.innerHTML = `<input type='checkbox'>
        ${inp}<span class='no'>&times;</span>`
        $('.allTasks').insertBefore(li, $('.allTasks').firstElementChild)
        $('.allTasks').classList.add('show')
        $('.active') && $('.active').classList.remove('.active')
        $('.all').classList.add('active')
        // 同时清空输入的内容
        $('.inp').value = ''
        countFn()
    }
})
box.addEventListener('change', function (e) {
    var target = e.target || window.event.srcElement
    if (target.type === 'checkbox') {
        target.checked ? target.parentNode.classList.add('acti') : target.parentNode.classList.remove('acti')
    }
})
box.addEventListener('click', function (e) {
    var target = e.target || window.event.srcElement
    if (target.className === 'all') {
        $('.active') && $('.active').classList.remove('active')
        $('.all').classList.add('active')
    }
    if (target.className === 'act') {
        task.forEach(function (li) {
            var check = li.querySelector('input[type=checkbox]')
            if (check.checked) {
                item.style.display = 'none'
            } else {
                item.style.display = 'block'
            }
        })
        $('.active') && $('.active').classList.remove('active')
        $('.act').classList.add('active')

    }
    if (target.className === 'finish') {
        $('.active') && $('.active').classList.remove('active')
        $('.finish').classList.add('active')
    }
    if (target.className === 'no') {
        target.parentNode.remove()
        countFn()
    }
})
// box.addEventListener('mousemove',function(e){
//     var target=e.target||window.event.srcElement
//     if(target.nodeName==='LI'){
//         $('.show')&&$('.show').classList.remove('show')
//         $('.no').classList.add('show')
//     }
// })
// box.addEventListener('mouseout',function(e){
//     var target=e.target||window.event.srcElement
//     if(target.nodeName==='LI'){
//         $('.show')&&$('.show').classList.remove('show')
//        $('.no').classList.remove('show') 
//     }
// })
function countFn() {
    $('.count').innerText = $('.allTasks').children.length
}
