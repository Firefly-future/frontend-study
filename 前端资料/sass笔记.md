sass   是早期的css预处理【预编译】语言

sass 的存储格式  
    .scss  书写风格与css完全一致  [推荐]  
    .sass  没有{} 属性值后没有;

注意: 引入的是 生成之后的css文件
      不要修改生成后的css文件

特色功能
    变量  混合宏  继承  占位符  函数  循环  判断 嵌套  等

好处: 这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如 Compass）有助于更好地组织管理样式文件，以及更高效地开发项目。


### sass中的注释
    // 单行注释   注释的内容不会被编译在css文件中
    /* */ 多行注释 块级注释   注释的内容以注释的形式编译在css文件中


嵌套 : 属性嵌套   和  选择器嵌套
    属性嵌套  ->  复合属性
        去 - 加 : {}
        eg : font : {
                size : 18px;
                weight : 900;
                style : oblique;
                family : "楷体"
            }

    选择器嵌套 -> 子可以直接写在父{}内 -> 建议最多三层
        div{
            h2{
                a{}
            }
        }
        编译后: div h2 a{}
        

& 父选择器  也叫当前选择器



继承
    首先得有一个基类【选择器】
    调用: @extend 
    语法: @extend 选择器 
    特点: 不调用也会生成css文件
          调用后以群组的方式呈现
    好处: 减少代码重复量

占位符
    声明: %
    语法: %name
    调用: @extend %name
    特点: 不调用 不会生成css文件
          调用后以群组的方式呈现
    好处: 减少代码重复量

混合宏
    声明: @mixin
    语法: @mixin name  or  @mixin name(p1,p2..){}
    调用: @include 
    特点: 根据需求可以传递不同参数 实现不同效果 


@import 导入外部文件
    将外部的 scss文件 与当前文件合并


sass中的循环
    @for 变量 from start to end  或   @for 变量 from start through end

    区别: to到end-1   through到end

sass中的变量
    $name : 值;

sass中的插值 #{}


C3属性
    transition 属性   需要事件【滑过、点击等】触发的平滑过渡动画
        transition-property 参与过渡的属性
            all 默认值   多个参与过渡的属性之间 逗号 隔开

        transition-duration 参与过渡的时间/动画执行时间
            默认值0   单位 秒(s)  毫秒(ms)

        transition-delay 动画延迟时间
            默认值 0 单位 s ms

        transition-timing-function 动画运动方式
            ease 默认值 平滑过渡 [慢-快-慢]
            linear 匀速
            ease-in 慢-快
            ease-out 快-慢
            ease-in-out 慢-快-慢

    总结 ： transition 是一个复合属性
        注意: 有一个属性是必须的  就是动画执行时间 duration
        注意: 第一个出现的时间是执行时间  第二个是延迟时间

transform 设置或检索元素的变形或转换
    translate() 位移
        translate(x,y,z)  translateX()  translateY()  translateZ()

    scale() 缩放/比例
        scale(x,y)  scale3D(x,y,z) 

    rotate() 旋转  角度deg   默认值Z轴
        rotate3D(x,y,z,deg)  

    skew() 倾斜 扭曲
        注意: 不支持3d

    注意: 3d动画可以开启硬件加速
    注意: 多个值 之间 空格 隔开


transform-origin : x y 设置基点（原点）位置



@keyframes name 定义关键帧动画
    里面有两个关键字  from 起始(0%)  to 结束(100%)
    中间可以使用不同的百分比 表示不同时间段的动画

animation 自执行动画 【关键帧动画】
    animation-name 引用动画名称 多个名称之间 逗号 隔开
    animation-duration 动画执行时间
    animation-delay 动画延迟时间
    animation-timing-function 动画运动方式
    animation-iteration-count 动画播放次数
        默认值 1       num 次        infinite 无限次
    animation-direction 动画执行方向
        normal 默认值 正次序播放 from-to
        alternate 正次序的交替运动  from-to-from
        reverse 反次序运动 to-from
        alternate-revser 反次序交替运动 to-from-to

    animation-play-state 动画播放状态
        running 默认值  播放
        paused 暂停

    animation-fill-mode 动画结束时的预留状态
        none 默认值  初始状态
        forwards 动画结束时最后一帧的状态 (与 次数 与 方向有关)
        backwards 在延迟等待时间内 动画将显示开始状态 (与 方向有关)
        both：向前和向后填充模式都被应用，即动画开始前和结束后，元素分别显示动画的开始状态和结束状态。

    总结: animation 是一个复合属性
    注意: 两个属性是必须的  分别是animation-name名称 和 animation-duration时间
    








如何获取对象的的原型？
    Object.getPrototypeOf(obj) 返回该对象的原型 即 __proto__   【推荐】
    const obj1 = new Array()   // 构造函数创建对象
    console.log( Object.getPrototypeOf(obj1) )
    console.log( Object.getPrototypeOf(obj2) === Array.prototype )   // true

    const obj2 = {a : 1 , b : 2} // 创建自定义对象
    console.log( Object.getPrototypeOf(obj2) )
    console.log( Object.getPrototypeOf(obj2) === Object.prototype )   // true

__proto__   实例的隐式原型属性  不推荐 因为可以修改

构造函数的原型属性 prototype  
    如果使用构造函数创建对象，可以使用该方法获取原型, 但不是已创建对象的原型
    

1．箭头函数和普通函数的区别（10分）
    1 语法简洁: 去function,一个参数去(),一句执行语句去{}和return
    2 没有自己this: 若出现了this挂靠父级环境对象，普通函数 谁调用指向谁
    3 没有arguments实参对象: 
        箭头参数可以通过...rest【接收剩余参数】, 
        普通函数有arguments，它是一个类数组对象

    4 不能用作构造函数: 因此不可以使用new关键字 ， 普通函数可以用作构造函数，可以使用new关键字来构建实例
    5 没有prototype属性: 因为该属性是构造函数上的，是给实例准备的属性和方法
    6 没有super关键字: 因为没有自己的this和prototype，因此不能调用父类的方法，普通函数用于调用父类的方法

2 var let const 的区别？
    1 作用域:
        var 具有 全局作用域 和 函数作用域
        let const 具有块级作用域 {}
    2 提升:
        var 具有变量提升【声明提前】-> 【提升在当前作用域的最顶端】-> 赋值留在原地
        let const 不具备提升，声明之前访问报错。
    3 重复声明且赋值 
        var 在同一作用域内，可以使用var声明多个同名变量，后设覆盖先设
        let const 在同一作用域声明多个同名变量报错
        var let 允许先声明再赋值，可以重新赋值
        const 声明的是常量，一旦声明必须初始化,不能被重新赋值，但是存的是引用对象，可以通过该对象的属性或方法进行修改