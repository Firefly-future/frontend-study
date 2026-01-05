function Popup() {
    // this.data=obj.data
    // this.box = this.getEl('.box')
    this.html = this.getEl('html')
    this.init()
}

Popup.prototype.init = function () {
    this.bindEvent()
}

Popup.prototype.bindEvent = function () {
    this.html.addEventListener('click', (e) => {
        let target = e.target || window.event.srcElement
        if (target.className === 'tit') {
            this.$('.tip').classList.add('show')
            this.$('.hn').innerHTML = `默认标题`
            this.$('.body').innerHTML= `默认内容`
        }
        if (target.className === 'con') {
            this.$('.tip').classList.add('show')
            this.$('.hn').innerHTML = `自定义标题`
            this.$('.body').innerHTML = `自定义内容`
        }
        if (target.className === 'btn') {
            // console.log('点到了')
            this.$('.tip1').classList.add('show')
            this.$('.tip1 .hn').innerHTML = `默认按钮`
            this.$('.tip1 .body').innerHTML= `操作成功`
        }
        if (target.className === 'event') {
            this.$('.tip2').classList.add('show')
            this.$('.tip2 .hn').innerHTML = `自定义按钮文字`
            this.$('.tip2 .body').innerHTML = `自定义事件`
        }
        if (target.className === 'set') {
            this.$('.tip3').classList.add('show')
            this.$(".tip3 .nr").innerHTML='提示的内容'
            setTimeout(() => {
                this.$('.tip3').classList.remove('show')
            }, 2000)
        }
        if (target.className === 'pic') {
            this.$('.tip4').classList.add('show')
            this.$('.tip4 .nr').innerHTML=`√操作成功`
            setTimeout(() => {
                this.$('.tip4').classList.remove('show')
            }, 3000)
        }
        if (target.className === 'close') {
            this.$('.tip4').classList.add('show')
            this.$('.tip4 .nr').innerHTML=`×操作失败`
            setTimeout(() => {
                this.$('.tip4').classList.remove('show')
            }, 5000)
        }
        if (target.className === 'load') {
            this.$('.loading').classList.add('show')
            setTimeout(() => {
                this.$('.loading').classList.remove('show')
            }, 10000)
        }
        if (target.className === 'false') {
            this.$('.tip').classList.remove('show')
            this.$('.tip1').classList.remove('show')
            this.$('.tip2').classList.remove('show')
        }
        if(target.className==='ok1'){
            this.$('.tip').classList.remove('show')
        }
        if(target.className==='ok2'){
            this.$('.tip1').classList.remove('show')
        }
        if(target.className==='default'){
            this.$('.tip1').classList.remove('show')
        }
        if(target.className==='yes'){
            alert('点击了yes')
            this.$('.tip2').classList.remove('show')
        }
        if(target.className==='no'){
            alert('点击了no')
            this.$('.tip2').classList.remove('show')
        }
    })
}

Popup.prototype.$ = function (el, parent) {
    parent = parent || document
    return parent.querySelector(el)
}
Popup.prototype.gets = function (el, parent) {
    parent = parent || document
    return [...parent.querySelectorAll(el)]
}
Popup.prototype.getEl = function (el) {
    if (el.nodeType === 1) return el
    else if (typeof el === 'string') return this.$(el)
    else { throw new Error('el类型错误 maybe an element or className') }
}