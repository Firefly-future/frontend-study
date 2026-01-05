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
// function(){
//     console.log( 123 )
// }


// 封装验证码函数   
function initVerifyCode( str = codeStr , n = 4 ){
    console.log("hello")
    console.log( str )
    var resStr = "" ; // 结果
    // 1 按照指定的验证码个数循环
    for( var i = 0 ; i < n ; i++ ){
        // 随机下标
        var index = Math.floor( Math.random() * str.length );
        console.log( index )
        // 根据下标找到字符
        resStr += str[index]
    }
    // 给元素赋值验证码
    $("code").innerHTML = resStr
}

// 分别给用户名、密码、邮箱、验证码赋值
// 若用户名为空白或无内容，弹出请输入有效用户名
// 密码为6-8位均可
// 邮箱必须带有@且不能是第一位且有.com
// 验证码必须与右边验证码一致（大小写均可）
// 点击注册的提示
var user=$('userName')
var psd=$('userPwd')
var Email=$('userEmail')
var code=$('userCode')
$('regBtn').onclick=function(){

}
