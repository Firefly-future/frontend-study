{

// 类型注解
let a: number = 100
let str: string = 'xxxx'
let b: boolean = true
let n: null = null
let un: undefined = undefined
let s: symbol = Symbol('aaa')

// 定义数组方式一：
let arr1: number[] = [1, 2, 3, 3]
let arr2: string[] = ['a', 'b', 'c', 'd']
// 定义数组方式二：范型方式
let arr3: Array<number> = [1,2,3]

// 元组：确定长度和类型的数组
let x: [string, number] = ["hello", 10]


// 任意类型，相当于放弃了类型校验
let test: any = '123'
test = true
test = []

// void 没有值，在函数没有返回值时使用
function fn(): void {
  console.log(111)
}
let ff = fn()

// never 永不存在的值的类型
let ne: string & number

// unknown 暂时不确定类型，使用时再确定
let value: unknown

value = 100
// 使用变量时通过类型断言确定类型
;(value as number).toFixed(2)


}