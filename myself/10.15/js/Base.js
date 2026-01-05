class Base{
    constructor(){

    }
    $(el,parent=document){
        return parent.querySelector(el)
    }
    gets(el,parent=document){
        return [...parent.querySelectorAll(el)]
    }
}