"use strict";
{
    const xm = {
        name: '小明',
        age: 22,
        hobby: ['吃饭'],
        sex: 'nan',
        say(text) {
        },
        say1: (a) => { }
    };
    const xh = {
        name: '小红',
        age: 24,
        hobby: ['睡觉'],
        say(text) {
        },
        say1: (a) => {
        }
    };
    console.log(xm, xh);
    let mySearch = function (source, subString) {
        return source.search(subString) > -1;
    };
    const arr1 = [1, 2];
    const arr2 = [1, 2, 2];
    console.log(arr1, arr2);
    const a = 100;
    console.log(a);
    const Obj1 = {
        name: '小明',
        age: 22
    };
    console.log(Obj1);
    const obj4 = {
        name: 'xx',
        age: 22,
        sex: 1,
        hobby: ['assd']
    };
    console.log(obj4);
}
