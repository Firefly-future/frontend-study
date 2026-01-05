"use strict";
{
    // 泛型
    function ref(a) {
        return {
            value: a
        };
    }
    const title = ref('标题'); //{value : '标题'}
    const num = ref(10); //{value :10}
    const arr = ref([1, 2, 3, 4]); //{value: [1,2,3,4]}
    console.log(title, num, arr);
    const xm = {
        name: '小明',
        age: 22,
        gender: 1,
        hobby: ['到点下班']
    };
    console.log(xm);
    const arr1 = [1, [2, 3, [4, [5, 6, [7, 8, [9]]]]]];
    const arr2 = ['a', 'b', ['c', 'd', ['e', 'f', ['g']]]];
    function flat(arr) {
        return arr.reduce((prev, val) => {
            return prev.concat(Array.isArray(val) ? flat(val) : val);
        }, []);
    }
    const res1 = flat(arr1);
    const res2 = flat(arr2);
    console.log(res1, res2);
    // 泛型约束
    function getLen(a) {
        return a.length;
    }
    console.log(getLen('abcdefg'));
    console.log(getLen([1, 2, 3, 4]));
    console.log(getLen({ a: 100, length: 10 }));
    // console.log(getLen(100))
    // console.log(getLen(true))
    function fn2(a) {
        return console.log(a);
    }
    fn2('aaa');
    const k = 'name';
    console.log(k);
    function getVal(obj, key) {
        return obj[key];
    }
    const obj1 = { name: 'xxx', age: 23, sex: 'aaa' };
    const name = getVal(obj1, 'name');
    const age = getVal(obj1, 'age');
    console.log(name, age);
    const obj2 = { type: '最新', list: [1, 2, 3] };
    const list = getVal(obj2, 'list');
    console.log(list);
    const size = 100;
    console.log(size);
    const obj = {
        a: 100,
        b: true,
        id: 'adaffsa'
    };
    console.log(obj);
}
