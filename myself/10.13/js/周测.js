function Popup() {

}
Popup.prototype.$ = function (el, parent = document) {
    return parent.querySelector(el)
}
Popup.prototype.gets = function (el, parent = document) {
    return [...parent.querySelectorAll(el)]
}
Popup.prototype.createEl = function (title, content) {
    const afterEl = document.createElement('div')
    afterEl.className = 'afterElThis'
    afterEl.innerHTML = `
    <div class='article'>
    <div class='header'>
    <h4>${title}</h4><span>&times;</span>
    </div>
    <div class='section'>
    <div class='main'>${content}</div>
    <div class='Btns'>
    <button>确定</button></div>
    </div>
    <div>
    `
    document.body.appendChild(afterEl)
    this.$('span', afterEl).addEventListener('click', () => {
        document.body.removeChild(afterEl)
    })
    return afterEl
}

Popup.prototype.alert = function (params) {
    const options = {
        title: '默认内容',
        content: ''
    }
    if (typeof params === 'string') { options.content = params }
    else if (Object.prototype.toString.call(params) === '[object Object]') {
        Object.assign(options, params)
    } else { throw new Error('参数错误') }

    const alertDialog = this.createEl(options.title, options.content)
    this.$('.section button').addEventListener('click', () => {
        document.body.removeChild(alertDialog)
    })
}

Popup.prototype.confirm = function (params) {
    const options = {
        title: '默认按钮',
        content: '',
        btns: [{ text: '确认', onClick: function () { document.body.removeChild(confirmDialog) } },
        { text: '取消', onClick: function () { document.body.removeChild(confirmDialog) } }]
    }
    if (typeof params === 'string') { options.content = params }
    else if (Object.prototype.toString.call(params) === '[object Object]') {
        Object.assign(options, params)
    } else { throw new Error('参数错误') }

    const confirmDialog = this.createEl(options.title, options.content)
    this.$('.Btns', confirmDialog).innerHTML = options.btns.map((item) => {
        return `<button>${item.text}</button>`
    }).join('')
    this.gets('.Btns button', confirmDialog).forEach((btn, index) => {
        btn.addEventListener('click', options.btns[index].onClick)
    })
}

Popup.prototype.msg=function(message,params={}){
    const options={
        icon:-1,
        time:2000
    }
    Object.assign(options,params)
    const box=document.createElement('div')
    box.className='toast-total'
    if(options.icon===-1){
        box.innerHTML=`<div class="toast">${message}</div>`
    }else {
        const iconMap={
            0:'×',
            1:'√'
        }
        box.innerHTML=`
        <div class="toast-icon">
        <span>${iconMap[options.icon]}<span>
        ${message}
        </div>
        `
    }
    document.body.appendChild(box)
    setTimeout(()=>{
        document.body.removeChild(box)
    },options.time)
}

Popup.prototype.load = function (message) {
    // 如果已经存在loading元素，则不重复创建
    if (document.querySelector('.loading') && document.querySelector('.loading').classList.contains('loading-active')) {
        return;
    }

    const loadingEl = document.createElement('div');
    loadingEl.className = 'loading loading-active';
    loadingEl.innerHTML = `
        <div class="spinner"></div>
        <div class="text">${message || '加载中...'}</div>
    `;
    
    document.body.appendChild(loadingEl);
    
    // 添加点击遮罩层关闭的功能
    loadingEl.addEventListener('click', () => {
        document.body.removeChild(loadingEl);
    });
    
    return loadingEl;
};





const popup = new Popup()

document.addEventListener('click', (e) => {
    let target = e.target || window.event.srcElement
    if (target.className === 'alert btn1') {
        // console.log(target)
        popup.alert('默认标题')
    }
    if (target.className === 'alert btn2') {
        popup.alert({
            title: '自定义标题',
            content: '自定义内容'
        })
    }
    if (target.className === 'confirm btn1') {
        popup.confirm('操作成功')
    }
    if (target.className === 'confirm btn2') {
        popup.confirm({
            title: '标题',
            content: '操作成功',
            btns: [
                { text: 'ok', onClick: function () { alert('点击了ok') } },
                { text: 'no', onClick: function () { alert('点击了no') } }
            ]
        })
    }
    if(target.className==='msg btn1'){
        popup.msg('显示的内容')
    }
    if(target.className==='msg btn2'){
        popup.msg('成功的状态',{
            icon:1
        })
    }
    if(target.className==='msg btn3'){
         popup.msg('失败的状态',{
            icon:0,
            time:5000
        })
    }
    if(target.className==='show-loading'){
        popup.load('加载中')
    }
})