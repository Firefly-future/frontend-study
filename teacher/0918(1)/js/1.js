// 1 模拟数据
var data = ["java","教程","SEM","SEM基础","柚说","关键词","创意","公众号","排名","网络营销","SEM","网络推广","达内","效果","数据","SEO","DSP","百度网盟","百度DSP","广点通","智慧推","粉丝通","新媒体","微信","微博","问答","百科","博客","ASO","网站","着陆页","网站分析","电商","火焰","水纹","登录","大数据看板","雪花","时钟","鼠标跟随","gsap动画","粒子","播放器","canvas","svg","hover","文字","滑块","导航","红包","vue代码","react代码","bootstrap代码","一个存入","localstorage","待办","事项","便签","系统","视频剪辑","旅拍","社交","西藏","新疆","自驾游","组团游","小麻雀","快下来","找妈妈","乖 听话"];
console.log( data.length )  //70



// console.log( curData )
// 2 初始化数据 渲染
initDataRender();




// 4 点击换一换
$(".tabs").onclick = initDataRender

// 5 给展开 收起 按钮绑定点击事件
$(".toggleBtn").onclick = function(){
    // 判断按钮的内容
    // if( this.innerText === "展开标签库" ){   //需展开  显示downs 且内容为收起标签
    // if( this.innerText.includes("展开") ){  // 检测内容文本包含展开
    //     $(".downs").classList.add("show")
    //     this.innerText = "收起标签库"   // 直接给按钮重新设置内容文本
    // } else {  // 需收起  隐藏downs  且内容为展开标签库
    //     $(".downs").classList.remove("show")
    //     this.innerText = "展开标签库"
    // }

    // 判断downs的是否有show类   contains
    // if( $(".downs").classList.contains("show") ){  // 含有show类 表示已经展开 需收起
    //     $(".downs").classList.remove("show")
    //     this.innerText = this.innerText.replace( "收起" , "展开" )  // 借助字符串的方法 进行替换  
    // } else {
    //     $(".downs").classList.add("show")
    //     this.innerText = this.innerText.replace( "展开" , "收起" )
    // }

    // 注意: 无论以上哪个方法进行实现 都需要对downs进行添加 或 删除类
    //       即 可以直接使用toggle切换类  有则删除 没有则添加
    $(".downs").classList.toggle("show")
    this.innerText = `${ this.innerText.includes("展开") ? '收起' : '展开' }标签库`// 获取按钮内容文本判断包含
    
}


function initDataRender(){
    
    clickMyTag()
    // 注意; 当点击换一批时  只是对所有标签进行了修改
    // 若点击换一批后 这一批内可能会出现我的标签中的部分内容 也可能没有
    // 没有的直接添加即可  但是出现的不能二次添加 但是由于渲染进来 所有标签的状态都是未添加 会导致重复添加
    // 解决一  简单粗暴将我的标签重置 即 清空
    // $(".myTag").innerHTML = ""

    // 解决二 在渲染所有标签时 与我的标签中的内容进行匹配 一致的添加selected标记已添加

    // 由于要实现换一批功能 所以不能全部渲染 , 即只拿取一部分
    // 最少20条 最多40条
    // 在所有数据中 根据 下标 截取 作为当前数据  
    var sI = random( 0 , 29 ) , count = random( 20 , 40 )
    // console.log( sI , count )
    var curData = data.slice( sI , sI + count )
    // 3 渲染
    $(".allTag").innerHTML = curData.map(function(item){
        return `<li class="${gets(".myTag li").find(function(li){
            return li.innerHTML === item
        }) ? 'selected' : '' }">${item}</li>`
    }).join("")

    // 获取所有标签 给每个标签绑定点击事件  实现对我的标签的添加
    var allTag = gets(".allTag li");
    // console.log( allTag )
    allTag.forEach(function(tag){
        tag.onclick = function(){
            // 先判断当前点击的标签是否已添加  即 判断当前标签是否包含selected
            if( !this.classList.contains( "selected" ) ){  // 为真已添加 取反未添加  即创建添加
                // 未添加过的标签能否添加 取决于 我的标签是否达到了上限8  达到 提示显示 
                if( gets(".myTag li").length >= 8 ){
                    $(".tip").classList.add("show")
                    return ;
                }
                // 1 创建li  且给li赋值为 当前点击的内容  最后追击在我的标签myTag中
                // var li = document.createElement("li")
                // li.innerText = this.innerText

                // 创建li 设置内容与当前点击的一致
                // 即 等价于 把当前点击的标签li克隆了一个
                var li = this.cloneNode(true);
                $(".myTag").appendChild(li)
                // 2 给当前点击的标签 设置状态为 已添加
                this.classList.add("selected")
                // 3 给创建好的 我的标签li 绑定点击事件  进行删除
                // li.onclick = function(){
                //     // 在所有标签中 查找与当前点击一致的 进行回退类  即 未添加
                //     gets(".allTag li").forEach(function(allLi){
                //         if( li.innerText === allLi.innerText ){
                //             allLi.classList.remove("selected")
                //             $(".myTag").removeChild( li )
                //             $(".tip").classList.remove("show")
                //         }
                //     })
                // }
            } else {  // 已添加 需回退删除  即 从我的标签中查找与 正在点击一致的 从我的标签中删除该标签
                gets(".myTag li").forEach(function(myTag){
                    if( myTag.innerText === tag.innerText ){
                        $(".myTag").removeChild( myTag )
                        // 设置点击标签的状态为 未添加  即 删除selected类
                        tag.classList.remove("selected")
                    }
                })
                // 每回退删除一个标签 提示消失
                $(".tip").classList.remove("show")
            }
        }
    })
}


// 封装一个我的标签 点击事件
function clickMyTag(){
    var myLis = gets(".myTag li");
    console.log( myLis )
    myLis.forEach(function(itemLi){
        itemLi.onclick = function(){
            $(".myTag").removeChild(itemLi)
            // 在所有标签中  查找与当前一致的   回退高亮   没有也不影响
            gets(".allTag li").forEach(function( allLi ){
                if( allLi.innerHTML === itemLi.innerHTML ){
                    allLi.classList.remove("selected")
                    $(".tip").classList.remove("show")
                }
            })
        }
    })
}

function random( min , max ){
    return Math.floor( Math.random() * ( max - min + 1 ) + min ) 
}


function $( el , parent = document ){
    return parent.querySelector(el)
}


function gets(el , parent = document ){
    return Array.from( parent.querySelectorAll(el) )
}

function fn(){
    console.log( ...arguments )  // Arguments(8) [15, 3, 265, 2, 365, 56, 246, 32]
    // 借助for循环 比较 
        // // 1 将第一项作为初始化的最大值
        // var big = arguments[0];
        // // 2 从下标1拿到每一项 与big比较  找到比big到的进行替换 即可
        // for( var i = 1 ; i < arguments.length ; i++ ){
        //     if( arguments[i] > big ){
        //         big = arguments[i]
        //     }
        // }
        // return big

    // 借助数组的排序   先将伪数组转真数组
    // var arr = [...arguments];
    // arr.sort(function(a,b){return b-a})
    // return arr[0]

    // 借助数学对象Math.max
    // ... es6扩展运算符  可以展开一层对象 或 数组
    return Math.max(...arguments) 
}

console.log( fn( 15,3,265,2,365,56,246,32 ) )  //找对大值