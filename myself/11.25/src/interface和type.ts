{
    // 接口定义对象类型
    interface Obj2 {
        readonly name: string
        age: number
        hobby: string[]
        sex?: string
        say(text: string): void
        say1: (a: number) => void
    }

    const xm: Obj2 = {
        name: '小明',
        age: 22,
        hobby: ['吃饭'],
        sex: 'nan',
        say(text) {

        },
        say1: (a: number) => { }
    }

    const xh: Obj2 = {
        name: '小红',
        age: 24,
        hobby: ['睡觉'],
        say(text) {

        },
        say1: (a: number) => {

        }
    }
    console.log(xm, xh)
    // 接口定义函数类型
    interface SearchFunc {
        (source: string, subString: string): boolean
    }

    let mySearch: SearchFunc = function (source: string, subString: string) {
        return source.search(subString) > -1
    }
    // console.log(mySearch)
    // 接口定义数组类型
    interface Arr {
        [index: number]: number
    }
    const arr1: Arr = [1, 2]
    const arr2: number[] = [1, 2, 2]
    console.log(arr1, arr2)

    // interface 定义新的类型
    // type给现有类型定义别名
    // 区别：
    // 1.可以定义基础类型，  interface不可以
    // 2.type不可以重名，interface重名会合并
    // 3.interface 可以通过extends继承，type可以通过交叉类型扩展

    type Test = number | string
    const a: Test = 100
    console.log(a)

    // 重名
    // type Obj={
    //     name:string
    // }
    // type Obj={         //重名报错
    //     age:number
    // }

    interface Obj {
        name: string
    }
    interface Obj {   //悬停可看到此处进行了合并
        age: number
    }
    const Obj1: Obj = {
        name: '小明',
        age: 22
    }
    console.log(Obj1)

    // 扩展
    // interface Base {
    //     name: string,
    //     age: number
    // }

    // interface Obje extends Base {
    //     sex: number,
    //     hobby: string[]
    // }

    // const obj4: Obje = {
    //     name: 'ss',
    //     age: 22,
    //     sex: 1,
    //     hobby: ['sss']
    // }

    // console.log(obj4)

    type Base={
        name:string,
        age:number
    }
    type Obje=Base &{
        sex:number,
        hobby:string[]
    }

    const obj4:Obje={
        name:'xx',
        age:22,
        sex:1,
        hobby:['assd']
    }

    console.log(obj4)
}