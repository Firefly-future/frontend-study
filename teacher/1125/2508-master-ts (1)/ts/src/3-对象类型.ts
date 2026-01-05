{

// 定义类型别名
type Obj1 = {
  readonly name: string; // 只读属性
  age: number;
  hobby: string[];
  sex?: string; // 可选属性
  say(text: string): void;
  say1: (a: number) => void;
}

// 接口
interface Obj2 {
  readonly name: string; // 只读属性
  age: number;
  hobby: string[];
  sex?: string; // 可选属性
  say(text: string): void;
  say1: (a: number) => void;
}

const xm: Obj1 = {
  name: '小明',
  age: 22,
  hobby: ['吃饭'],
  sex: 'nan',
  say(text) {
  },
  say1: (a: number) => {

  }
}

const xh: Obj1 = {
  name: '小红',
  age: 24,
  hobby: ['睡觉'],
  say(text) {
  },
  say1: (a: number) => {
  }
}


const list: Obj2[] = [
  {
    name: '小明',
    age: 22,
    hobby: ['吃饭'],
    sex: 'nan',
    say(text) {
    },
    say1: (a: number) => {

    }
  }
]

}