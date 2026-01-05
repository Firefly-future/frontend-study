{

// 接口定义对象类型
interface Obj2 {
  readonly name: string; // 只读属性
  age: number;
  hobby: string[];
  sex?: string; // 可选属性
  say(text: string): void;
  say1: (a: number) => void;
}

const xm: Obj2 = {
  name: '小明',
  age: 22,
  hobby: ['吃饭'],
  sex: 'nan',
  say(text) {
  },
  say1: (a: number) => {

  }
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


// 接口定义函数类型
// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc = function(source: string, subString: string) {
//   return source.search(subString) > -1;
// }


// 接口定义数组类型
// interface Arr {
//   [index: number]: number
// }
// const arr: Arr = [1, 2]

// const arr: number[] = [1,2,3]



// interface 定义新的类型
// type 给现有类型定义别名
// 区别
// 1. 可以定义基础类型，interface不可以
// 2. type不可以重名，interface 重名会合并
// 3. interface 可以通过 extends 继承，type 可以通过交叉类型扩展

// type Test = number | string
// const a: Test = 100

// 重名
// type Obj = {
//   name: string
// }
// type Obj = {
//   age: number
// }
// interface Obj {
//   name: string
// }
// interface Obj {
//   age: number
// }
// const obj1: Obj = {
//   name: 'xxxx',
//   age: 22,
// }


// 扩展
// interface Base {
//   name: string
//   age: number
// }

// interface Obj extends Base {
//   sex: number
//   hobby: string[]
// }

// const obj3: Obj = {
//   name: 'xx',
//   age: 22,
//   sex: 1,
//   hobby: ['sss']
// }


type Base = {
  name: string
  age: number
}

type Obj = Base & {
  sex: number
  hobby: string[]
}

const obj3: Obj = {
  name: 'xx',
  age: 22,
  sex: 1,
  hobby: ['sss']
}


}