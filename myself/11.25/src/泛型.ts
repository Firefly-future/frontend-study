{
    // 泛型
    function ref<T>(a: T) {
        return {
            value: a
        }
    }

    const title = ref<string>('标题')  //{value : '标题'}
    const num = ref<number>(10)       //{value :10}
    const arr = ref<number[]>([1, 2, 3, 4]) //{value: [1,2,3,4]}
    console.log(title, num, arr)

    type Obj<T, U> = {
        name: string,
        age: number,
        gender: T,
        hobby: U[]
    }
    interface Obj1<T, U> {
        name: string,
        age: number,
        gender: T,
        hobby: U[]
    }

    const xm: Obj1<number, string> = {
        name: '小明',
        age: 22,
        gender: 1,
        hobby: ['到点下班']
    }
    console.log(xm)

    type DeepArr<T> = T | DeepArr<T>[]
    const arr1: DeepArr<number>[] = [1, [2, 3, [4, [5, 6, [7, 8, [9]]]]]]
    const arr2: DeepArr<string>[] = ['a', 'b', ['c', 'd', ['e', 'f', ['g']]]]

    function flat<T>(arr: DeepArr<T>[]): T[] {
        return arr.reduce((prev: T[], val) => {
            return prev.concat(Array.isArray(val) ? flat(val) : val)
        }, [] as T[])
    }
    const res1 = flat(arr1)
    const res2 = flat(arr2)
    console.log(res1, res2)


    // 泛型约束
    function getLen<T extends { length: number }>(a: T) {
        return a.length
    }

    console.log(getLen('abcdefg'))
    console.log(getLen([1, 2, 3, 4]))
    console.log(getLen({ a: 100, length: 10 }))
    // console.log(getLen(100))
    // console.log(getLen(true))

    function fn2<T extends string | number>(a: T) {
        return console.log(a)
    }
    fn2('aaa')

    // keyof:返回对象类型中所有的key组成的联合类型
    interface Person {
        name: string,
        age: number,
        a: boolean,
        d: number[]
    }
    type keys = keyof Person
    type kes = 'name' | 'age' | 'a' | 'b'
    const k: keys='name'
    console.log(k)


    function getVal<T,K extends keyof T>(obj:T,key:K):T[K]{
        return obj[key]
    }

    const obj1={name:'xxx',age:23,sex:'aaa'}
    const name=getVal(obj1,'name')
    const age=getVal(obj1,'age')
    console.log(name,age)

    const obj2={type:'最新',list:[1,2,3]}
    const list=getVal(obj2,'list')
    console.log(list)

    interface Test{
        size:number
        type:string
        disabled:boolean
    }
    const size:Test['size']=100
    console.log(size)


    const obj={
        a:100,
        b:true,
        id:'adaffsa'
    }
    console.log(obj)
    // typeof 获取某个变量的ts类型
    // keyof  获取key
    type IObj=typeof obj
    type ObjKeys=keyof typeof obj
}