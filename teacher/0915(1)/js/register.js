var codeStr = "9874563210QWERTYUIOPLJHGFDSAZXCVBMmnbvcxzasdfghjklpoiuytrewq";
// 1 点击上一步 回到 启动页
    // window.open
    // location.href = 
    // location.assign()
    // location.replace()
$("back").onclick = function(){
    // history.go(-1)  // 负数  表示后退n步    -1后退一步
    history.back()   // 直接上一步
}
// 2 初始化验证码
initVerifyCode()
// 3 点击换一换 切换验证码
$("change").onclick =  function(){
    initVerifyCode()
}
// 4 点击注册
$("regBtn").onclick = function(){
    // 获取输入框的值
    var user = $("userName").value.trim(),
        pwd = $("userPwd").value.trim() ,
        email = $("userEmail").value.trim() ,
        verify = $("userCode").value.trim().toUpperCase() ,
        code = $("code").innerHTML.toUpperCase() ;  

    // 判断用户名 未输入
    if( !user ) return alert("用户名不为空")
    // 判断密码未输入
    if( !pwd ) return alert("密码不为空")
    // 判断密码 不再6-8的范围
    if( pwd.length < 6 || pwd.length > 8 ) return alert("请设置6-8位的密码")
    // 判断密码是纯数字
    if( !isNaN(pwd) ) return alert("密码不能是纯数字") 
    // 判断邮箱未输入
    if( !email ) return alert("邮箱不为空")
    // 邮箱必须包含@  且 不能@开始 ，邮箱必须有后缀.什么结束  且.不能结束
    // 获取@的位置   获取.的位置
    var pos = email.indexOf("@") ,  // 4
        dot = email.indexOf(".") ;  // 6
        // console.log( pos , dot )
    if( pos < 0 ) return alert("邮箱必须含有@")
    if( pos === 0 ) return alert("不能以@开始")
    if( dot < pos + 3 ) return alert("@右面可以是qq/163/yahoo等")
    if( dot === email.length - 1 ) return alert("邮箱不能以.结束")

    // 判断输入验证码 与 验证码不一致  忽略大小
    if( verify !== code ) return alert("验证码有误")

    alert("输入正确, 3s后将带着用户信息跳转成功页")
    setTimeout(function(){
        location.href = `./success.html?userName=${user}&userPwd=${pwd}&userEmail=${email}`
    } , 3000)
}

// 封装验证码函数   
function initVerifyCode( str = codeStr , n = 4 ){
    // console.log("hello")
    // console.log( str )
    var resStr = "" ; // 结果
    // 1 按照指定的验证码个数循环
    for( var i = 0 ; i < n ; i++ ){
        // 随机下标
        var index = Math.floor( Math.random() * str.length );
        // console.log( index )
        // 根据下标找到字符
        resStr += str[index]
    }
    // 给元素赋值验证码
    $("code").innerHTML = resStr
}