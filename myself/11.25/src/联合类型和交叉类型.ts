{
    // 联合类型
    type Test1 = number[] | string

    function fn(a: Test1) {
        // 联合类型的变量只能使用所有类型共有的属性和方法
        // 使用类型守卫缩小联合类型的范围
        if (typeof a === 'string') {
            console.log(a.slice(1))
        } else {
            console.log(a.map(v => v))
        }
    }
    fn('123')
    fn([1, 2, 3])

    // 交叉类型  如果不同类型中包含相同名称但类型不兼容的属性，则会导致类型错误
    // type Text2 = { name: string } & { age: number; name: number }
    // const obj: Text2 = {
    //     age: 22,
    //     name: 'sss'  //报错了
    // }
}