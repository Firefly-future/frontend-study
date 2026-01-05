function $(el){
    return document.getElementById(el)
}

function gets(el,parent){
    parent=parent||document
    return parent.getElementsByTagName(el)
}