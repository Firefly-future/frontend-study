"use strict";
{
    // 类型注解
    let a = 100;
    let str = 'xxxx';
    let b = true;
    let n = null;
    let un = undefined;
    let s = Symbol('aaa');
    // 定义数组方式一：
    let arr1 = [1, 2, 3, 3];
    let arr2 = ['a', 'b', 'c', 'd'];
    // 定义数组方式二：范型方式
    let arr3 = [1, 2, 3];
    // 元组：确定长度和类型的数组
    let x = ["hello", 10];
    // 任意类型，相当于放弃了类型校验
    let test = '123';
    test = true;
    test = [];
    // void 没有值，在函数没有返回值时使用
    function fn() {
        console.log(111);
    }
    let ff = fn();
    // never 永不存在的值的类型
    let ne;
    // unknown 暂时不确定类型，使用时再确定
    let value;
    value = 100;
    value.toFixed(2);
}
