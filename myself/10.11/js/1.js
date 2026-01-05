function GradeClass(){
    

    this.init()
}

GradeClass.prototype.init=function(){
    this.$('tbody').innerHTML=this.data.map(obj=>`
        
        `
    )
}







GradeClass.prototype.$=function(el,parent){
    parent=parent||document
    return parent.querySelector(el)
}
GradeClass.prototype.gets=function(el,parent){
    parent=parent||document
    return [...parent.querySelectorAll(el)]
}
GradeClass.prototype.getEl=function(el){
    if(el.nodeType===1){
        return el
    }else if(typeof el==='string'){
        return this.$(el)
    }else{
        throw new Error('el参数错误 maybe an element or className')
    }
}