


function $( el , parent = document ){
    return parent.getElementById(el)
}

function gets( el , parent = document ){
    return  Array.from( parent.getElementsByTagName(el) )
}

