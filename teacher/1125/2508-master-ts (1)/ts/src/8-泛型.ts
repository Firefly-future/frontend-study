{
  // 泛型
  function ref<T>(a: T) {
    return {
      value: a
    }
  }

  const title = ref<string>('标题') // { value: '标题' }
  const num = ref<number>(10) // { value: 10 }
  const arr = ref<number[]>([1,2,3,4]) // { value: 10 }

  // type Obj<T, U> = {
  //   name: string
  //   age: number
  //   gender: T
  //   hobby: U[]
  // }

  interface Obj<T, U> {
    name: string
    age: number
    gender: T
    hobby: U[]
  }
  
  const xm: Obj<number, string> = {
    name: '小明',
    age: 22,
    gender: 1,
    hobby: ['吃饭']
  }


  type DeepArr<T> = T | DeepArr<T>[]
  const arr1: DeepArr<number>[] = [[[[1,[2,[3,[4,5],6],7],8],9, 10], 11], 12]
  const arr2: DeepArr<string>[] = [[[['a', 'b'], 'c'], 'd'], 'e']
  function flat<T>(arr: DeepArr<T>[]): T[] {
    return arr.reduce((prev: T[], val) => {
      return prev.concat(Array.isArray(val) ? flat(val) : val)
    }, [] as T[])
  }

  const res1 = flat(arr1)
  const res2 = flat(arr2)
  console.log(res1)
  console.log(res2)



  // 泛型约束
  function getLen<T extends { length: number }>(a: T) {
    return a.length
  }
  console.log(getLen('abcddee'))
  console.log(getLen([1,2,2,3]))
  console.log(getLen({ a: 100, length: 10 }))
  // console.log(getLen(100))
  // console.log(getLen(true))


  function fn2<T extends string | number>(a: T) {
    return a
  }
  fn2('aaaa')


  // keyof: 返回对象类型中所有的 key 组成的联合类型
  // interface Person {
  //   name: string
  //   age: number
  //   a: boolean
  //   d: number[]
  // }
  // type keys = keyof Person
  // // type keys = 'name' | 'age' || 'a' || 'b'
  // const k: keys = 'name'




  function getVal<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
  }

  const obj1 = { name: 'xxx', age: 23, sex: 'aaa' }
  const name = getVal(obj1, 'name')
  const age = getVal(obj1, 'age')
  console.log(name, age)


  const obj2 = { type: '最新', list: [1,2,3]}
  const list = getVal(obj2, 'list')
  console.log(list)
  



  interface Test {
    size: number
    type: string
    disabled: boolean
  }
  const size: Test['size'] = 100


  // typeof: 获取某个变量的 ts 类型
  const obj = {
    a: 100,
    b: true,
    id: 'aaaaaaa'
  }
  console.log(obj)

  type IObj = typeof obj
  type ObjKeys = keyof typeof obj


}