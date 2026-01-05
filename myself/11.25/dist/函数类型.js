"use strict";
{
    // 函数类型
    function fn(a, b) {
        return a + b.length;
    }
    console.log(fn(100, 'djawodjo'));
    const sum = (a, b) => {
        return a + b.length;
    };
    const obj = {
        say1(text) {
            console.log(text);
        },
        say2: (text) => {
            console.log(text);
        }
    };
    console.log(obj);
    const a = sum(20, '100');
    console.log(a);
    // 可选参数
    function fn1(a, b) {
        console.log(a);
    }
    fn1(100);
    // 默认参数
    function fn2(url, method = 'get') {
        console.log(url, method);
    }
    fn2('100');
    // 剩余参数
    function fn3(...args) {
        return args.reduce((prev, val) => prev + val, 0);
    }
    const res = fn3(1, 2, 3, 4, 56);
    console.log(res);
}
