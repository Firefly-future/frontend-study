## 什么是TypeScript？
+ <font style="color:rgb(13, 13, 13);">TypeScript是一个由Microsoft开发的开源编程语言，它在JavaScript的基础上添加了静态类型系统。作为JavaScript的一个超集，TypeScript包含了JS的所有功能，同时引入了类型注解和编译时类型检查。</font>
+ TS无法直接在浏览器上运行，需编译成JS来运行。

## TypeScript 的优势
1. **与JavaScript的兼容性**
    - <font style="color:rgb(13, 13, 13);">TypeScript完全兼容JavaScript的代码和库，这意味着任何现有的JavaScript代码可以无缝地在TypeScript项目中使用，反之亦然。</font>
    - <font style="color:rgb(13, 13, 13);">这种兼容性确保了开发者可以渐进式地采用TypeScript，而不需要对现有项目进行大规模重写。</font>
2. **静态类型检查**
    - **<font style="color:rgb(13, 13, 13);">静态类型检查可以在代码运行之前发现潜在的类型错误，减少运行时错误的发生</font>**<font style="color:rgb(13, 13, 13);">。</font>
    - <font style="color:rgb(13, 13, 13);">类型注解和接口提供了一种方式来定义变量、函数参数和返回值的类型，使得代码更加清晰和易于理解。</font>
3. **增强的代码质量和可维护性**
    - <font style="color:rgb(13, 13, 13);">类型系统和编译时检查强化了代码质量，使得开发过程中的错误更容易被发现和修正。</font>
    - **<font style="color:rgb(13, 13, 13);">类型注解也充当了代码的文档，提高了代码的可读性和维护性。</font>**
4. **IDE支持和开发体验**
    - <font style="color:rgb(13, 13, 13);">大多数现代IDE和编辑器都对TypeScript提供了优秀的支持，包括自动完成、代码导航、重构工具和实时的错误检测。</font>
    - <font style="color:rgb(13, 13, 13);">这些特性显著提升了开发效率和体验。</font>

## 安装和编译ts
1. 全局安装编译工具 `npm i -g typescript `
2. 查看工具的版本号 `tsc -v`
3. 生成 tsconfig.json, 编译时的规则配置 `tsc --init`
4. 监听 ts 文件改变，实时编译成 js `tsc --watch`

## TS基础数据类型
<font style="color:rgb(13, 13, 13);">typescript 引入了静态类型检查。这意味着你可以在编写代码时指定变量、参数、返回值等的类型。这样不仅能提前发现潜在的错误，还能提高代码的可读性和可维护性。</font>

**TS的基础数据类型：**

1. **boolean**<font style="color:rgb(13, 13, 13);">: 最基本的数据类型，只有两个值：</font>**true**<font style="color:rgb(13, 13, 13);">和</font>**false**<font style="color:rgb(13, 13, 13);">。</font>

```typescript
let isDone: boolean = false;
```

2. **number**<font style="color:rgb(13, 13, 13);">: 所有数字，包括整数和浮点数，都是</font>**number**<font style="color:rgb(13, 13, 13);">类型，支持十进制、十六进制、二进制和八进制字面量。</font>

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

3. **string**<font style="color:rgb(13, 13, 13);">: 用于表示文本数据，可以使用双引号（</font>**" "**<font style="color:rgb(13, 13, 13);">）、单引号（</font>**' '**<font style="color:rgb(13, 13, 13);">）或者模板字符串（</font>**` `**<font style="color:rgb(13, 13, 13);">）。</font>

```typescript
let color: string = "blue";
color = 'red';
let fullName: string = `Bob Bobbington`;
let sentence: string = `Hello, my name is ${ fullName }.`;
```

4. **array**<font style="color:rgb(13, 13, 13);">: TypeScript中数组可以有两种方式定义：一种是使用元素类型后面接上</font>**[]**<font style="color:rgb(13, 13, 13);">，另一种是使用数组泛型</font>**Array<元素类型>**<font style="color:rgb(13, 13, 13);">。</font>

```typescript
let list: number[] = [1, 2, 3];
let listGeneric: Array<number> = [1, 2, 3];
```

5. **tuple**<font style="color:rgb(13, 13, 13);">: 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。</font>

```typescript
let x: [string, number];
x = ["hello", 10]; // OK
```

6. **enum**<font style="color:rgb(13, 13, 13);">: 枚举类型是对JavaScript标准数据类型的一个补充，让我们可以为一组数值赋予友好的名字。</font>

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

7. **any**<font style="color:rgb(13, 13, 13);">: 对于那些我们不想给出一个具体类型的变量，可以使用</font>**any**<font style="color:rgb(13, 13, 13);">类型，相当于放弃类型检查。</font>

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

8. **void**<font style="color:rgb(13, 13, 13);">: 与</font>**any**<font style="color:rgb(13, 13, 13);">相反，</font>**void**<font style="color:rgb(13, 13, 13);">用于那些没有任何类型的情况，通常用在没有返回值的函数。</font>

```typescript
function warnUser(): void {
  console.log("This is my warning message");
}
```

9. **null 和 undefined**<font style="color:rgb(13, 13, 13);">: TypeScript里，</font>**undefined**<font style="color:rgb(13, 13, 13);">和</font>**null**<font style="color:rgb(13, 13, 13);">两者各自有自己的类型分别叫做</font>**undefined**<font style="color:rgb(13, 13, 13);">和</font>**null**<font style="color:rgb(13, 13, 13);">。</font>

```typescript
let u: undefined = undefined;
let n: null = null;
```

10. **never**<font style="color:rgb(13, 13, 13);">: 表示的是那些永不存在的值的类型，例如，</font>**never**<font style="color:rgb(13, 13, 13);">类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。</font>

```typescript
function error(message: string): never {
  throw new Error(message);
}
```

11. **<font style="color:rgb(13, 13, 13);">unknown</font>**<font style="color:rgb(13, 13, 13);">: 类型代表任何值，与</font>**<font style="color:rgb(13, 13, 13);">any</font>**<font style="color:rgb(13, 13, 13);">类型相似，但是</font>**<font style="color:rgb(13, 13, 13);">unknown</font>**<font style="color:rgb(13, 13, 13);">类型更加安全使用属性和方法前必须使用类型断言或者类型守卫确定类型。</font>

```typescript
let value: unknown = "hello";

// 直接使用value会出错，因为它的类型是unknown
// console.log(value.length); // Error: Object is of type 'unknown'.

// 使用类型断言
if (typeof value === "string") {
  console.log(value.length); // 正确: value被识别为string
}

// 或者使用类型守卫
if (value instanceof Date) {
  // 在这个代码块中，value的类型被识别为Date
  console.log(value.toISOString());
} else {
  // 在这里，value的类型仍然是unknown
}
```

## 定义函数类型
### 定义函数类型
```typescript
// 函数声明式
function fn1(a: number, b: string): number {
  return a + b.length
}
// 函数表达式
const fn2 = function(a: number, b: string): number {
  return a + b.length
}
const fn3 = (a: number, b: string): number => {
  return a + b.length
}
// 对象中的函数
const obj = {
  fn4(a: number, b: string): number{
    return a + b.length
  }
}
// 函数表达式的完整写法
const fn5: (a: number, b: string) => number = (a: number, b: string): number => {
  return a + b.length
}
```

### 可选参数
<font style="color:rgb(13, 13, 13);">可选参数必须跟在必须参数后面。如果调用时没有提供可选参数，它的值将是</font>**<font style="color:rgb(13, 13, 13);">undefined</font>**<font style="color:rgb(13, 13, 13);">。</font>

```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}

let result1 = buildName("Bob"); // works correctly now
let result2 = buildName("Bob", "Adams"); // ah, just right
```

### 默认参数
<font style="color:rgb(13, 13, 13);">当调用函数而没有传递这个参数或者传递的参数值是</font>**<font style="color:rgb(13, 13, 13);">undefined</font>**<font style="color:rgb(13, 13, 13);">时，会使用该默认值。</font>

```typescript
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still returns "Bob Smith"
let result3 = buildName("Bob", "Adams");         // returns "Bob Adams"
```

### 剩余参数
```typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

### 函数重载
为<font style="color:rgb(13, 13, 13);">同一个函数提供多个函数类型定义，</font>根据调用函数时使用的参数类型来确定使用哪个重载

```typescript
// 函数重载声明
function fn7(a: string): number
function fn7(a: number, b: number): string
// 函数实现
function fn7(a: any, b?: any): any  {
  if (typeof a === 'string') {
    return a.length
  } else {
    return a.toFixed(b)
  }
}
// 函数调用示例
const a = fn7('abcdefg')
const b = fn7(100, 2)
```

## 定义对象类型
### <font style="color:rgb(13, 13, 13);">对象字面量类型</font>
<font style="color:rgb(13, 13, 13);">直接在变量声明时指定对象的类型。这种方法适用于一次性的对象结构，不需要复用。</font>

```typescript
let car: { 
  readonly make: string; 
  model: string; 
  year?: number; // 可选属性
  say: (hobby: string) => void;
} = {
  make: "Toyota",
  model: "Corolla",
  year: 2020,
  say(hobby: string){}
};
```

### <font style="color:rgb(13, 13, 13);">类型别名定义对象类型</font>
<font style="color:rgb(13, 13, 13);">类型别名允许你给一个类型起个新名字，方便该类型重复使用。</font>

```typescript
type Point = {
  x: number;
  y: number;
};
const point1: Point = {
  x: 10,
  y: 20
};
const point2: Point = {
  x: 20,
  y: 10
};
```

### <font style="color:rgb(13, 13, 13);">interface定义对象类型</font>
```typescript
interface User {
  id: number;
  name: string;
  email?: string; // 可选属性
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com"
};
```

## interface 接口
### 定义对象类型[（详情查看6.3）](#giNyV)
### 定义函数类型
```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function(source: string, subString: string) {
  return source.search(subString) > -1;
}
```

### 定义数组类型
```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];
```

### 继承
<font style="color:rgb(13, 13, 13);">接口可以通过继承一个或多个其他接口来增加新的属性和方法。这是通过</font>**extends**<font style="color:rgb(13, 13, 13);">关键字实现的，支持多接口继承。</font>

```typescript
interface Shape {
  color: string;
}
interface PenStroke {
  penWidth: number;
}

// 继承单接口
interface Square extends Shape {
  sideLength: number;
}
let square: Square = { color: "blue", sideLength: 10 };

// 继承多借口
interface Square extends Shape, PenStroke {
  sideLength: number;
}
let square: Square = { color: "red", sideLength: 20, penWidth: 5.0 };
```

## type 和 interface
<font style="color:rgb(13, 13, 13);">在TypeScript中，</font>**<font style="color:rgb(13, 13, 13);">type</font>**<font style="color:rgb(13, 13, 13);">和</font>**<font style="color:rgb(13, 13, 13);">interface</font>**<font style="color:rgb(13, 13, 13);">都可以用于定义类型，但它们在某些方面有着不同的使用场景和特性。</font>**<font style="color:rgb(13, 13, 13);">interface是定义类型，type是给现有的类型定义别名。</font>**

### <font style="color:rgb(13, 13, 13);">相同点</font>
+ ****<font style="color:rgb(13, 13, 13);">都可以描述一个对象或函数的形状。</font>
+ ****<font style="color:rgb(13, 13, 13);">都可以被扩展。</font>

### <font style="color:rgb(13, 13, 13);">不同点</font>
+ **type 可以声明基本类型、联合类型，而interface不行。**
+ **interface 通过继承扩展，type通过交叉类型组合多个类型的方式扩展。**
+ **interface重复定义时****<font style="color:rgb(13, 13, 13);">会自动合并，而 </font>****type ****<font style="color:rgb(13, 13, 13);">重名会报错。</font>**

```typescript
interface User {
  name: string;
}

interface User {
  age: number;
}

// User 现在拥有 name 和 age 属性
const obj: User = {
  name: '',
  age: 20
}
```

## 联合类型和交叉类型
### <font style="color:rgb(13, 13, 13);">联合类型（Union Types）</font>
<font style="color:rgb(13, 13, 13);">联合类型表示一个值可以是几种类型之一。它通过使用</font>**|**<font style="color:rgb(13, 13, 13);">符号连接类型来定义。</font>

```typescript
type mixedType = string | number
let a: mixedType = ''
let b: mixedType = 100

function process(input: mixedType) {
  // 使用类型守卫缩小联合类型的范围
  if (typeof input === "string") {
    console.log(input.toUpperCase());
  } else {
    console.log(input.toFixed(2));
  }
}
```

**注意事项：**

1. **公共属性**<font style="color:rgb(13, 13, 13);">：只能安全访问所有成员类型共有的属性或方法。对于特定类型的属性，需要先缩小类型范围。</font>
2. **类型守卫**<font style="color:rgb(13, 13, 13);">：在处理联合类型的值时，通常需要使用类型守卫来确保类型安全的访问或操作。</font>

### <font style="color:rgb(13, 13, 13);">交叉类型（Intersection Types）</font>
<font style="color:rgb(13, 13, 13);">交叉类型表示一个值同时拥有多种类型。它通过使用</font>**&**<font style="color:rgb(13, 13, 13);">符号来组合类型，允许你将多个类型合并成一个类型。</font>

```typescript
interface Runnable {
  run(): void;
}

interface Flyable {
  fly(): void;
}

type ActionHero = Runnable & Flyable;

function actionHero(hero: ActionHero) {
  hero.run();
  hero.fly();
}
```

**<font style="color:rgb(13, 13, 13);">注意事项：</font>**

1. **属性冲突**<font style="color:rgb(13, 13, 13);">：如果不同类型中包含相同名称但类型不兼容的属性，则会导致类型错误。在设计交叉类型时，需要确保所有类型可以兼容地合并。</font>

## 类型断言和类型推论
### <font style="color:rgb(13, 13, 13);">类型推论 (Type Inference)</font>
<font style="color:rgb(13, 13, 13);">类型推论是TypeScript的一个特性，它允许编译器自动地推断出表达式的类型，从而无需显式指定。TypeScript会根据变量的使用上下文来推断其类型，这使得代码更简洁并减少了编码工作量。</font>

+ **初始化时推断**<font style="color:rgb(13, 13, 13);">：当你初始化变量时，TypeScript会根据赋值的数据类型推断变量的类型。</font>

```typescript
let num = 5; // 类型推断为 number
```

+ **最佳通用类型**<font style="color:rgb(13, 13, 13);">：当需要从多个表达式推断类型时，TypeScript会计算一个“最佳通用类型”来兼顾所有候选类型。</font>

```typescript
let arr = [1, 2, null]; // 类型推断为 (number | null)[]
```

+ **上下文类型**<font style="color:rgb(13, 13, 13);">：在表达式的类型由其所处的位置决定时，TypeScript会使用上下文来推断类型。</font>

```typescript
window.onmousedown = function(event) {
  // event 被推断为 MouseEvent 类型
};
```

### <font style="color:rgb(13, 13, 13);">类型断言 (Type Assertion)</font>
<font style="color:rgb(13, 13, 13);">类型断言是一种方式，允许你告诉编译器：“我知道这个变量的类型是什么。”类型断言像是一种方式，用于“重载”变量或对象的类型。当你比TypeScript更了解某个值的类型时，这会非常有用。</font>

**<font style="color:rgb(13, 13, 13);">使用场景</font>**

+ **当你确定变量的类型比TypeScript推断的类型更具体时。**
+ **当TypeScript无法确切知道一个联合类型的具体类型，但你确定知道时。**

**<font style="color:rgb(13, 13, 13);">TypeScript中类型断言有两种形式：</font>**

```typescript
// 尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

**<font style="color:#DF2A3F;">注意：在JSX中，只能使用 as 语法进行类型断言，因为尖括号语法与JSX的标签语法冲突。</font>**

## 枚举
<font style="color:rgb(13, 13, 13);">在TypeScript中，枚举（Enums）是一种特殊的类型，它允许为一组数值赋予友好的名字。枚举的主要作用是提升代码的可读性和可维护性，使数值集合更易于理解和使用。</font>

**<font style="color:rgb(13, 13, 13);">作用：</font>**

1. **可读性**<font style="color:rgb(13, 13, 13);">：使用枚举可以使代码更易于阅读和理解。使用单词给数值命名，代码的意图变得更加明显。</font>
2. **易于维护**<font style="color:rgb(13, 13, 13);">：枚举提供了一个集中的位置定义一组相关的常量。如果以后需要更改这些值，只需在枚举定义中修改即可。</font>
3. **减少错误**<font style="color:rgb(13, 13, 13);">：使用枚举可以避免魔术字符串（magic strings）或数字，减少因拼写错误或值错误引入的bug。</font>

**<font style="color:rgb(13, 13, 13);">如何使用：</font>**

1. **<font style="color:rgb(13, 13, 13);">数字枚举：</font>**<font style="color:rgb(13, 13, 13);">数字枚举的值默认从</font>**0**<font style="color:rgb(13, 13, 13);">开始自动增加，但你也可以手动指定成员的数值。</font>

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
console.log(Direction.Up);    // 输出: 1
console.log(Direction.Left);  // 输出: 3
```

**<font style="color:rgb(13, 13, 13);">字符串枚举：要求每个成员都必须用字符串字面量或另一个字符串枚举成员初始化。</font>**

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
console.log(Direction.Up);    // 输出: "UP"
```

## 泛型
:::danger
**<font style="color:rgb(13, 13, 13);">泛型允许你在定义函数、接口或类时不具体指定数据类型，而是在使用时指定类型。可以理解为定义类型时的形参。</font>**

:::

### 定义泛型函数
```typescript
// val 可以传入任意类型，次函数返回指定类型和长度的数组
function createArray<T>(val: T, num: number): T[] {
  return new Array(num).fill(val)
}
let a1 = createArray<string>('abc', 10)
let b1 = createArray<number>(100, 10)
let c1 = createArray<{ name: string }>({ name: '小明' }, 10)
```

### 泛型别名
```typescript
// 定义多维数组类型
type deepArr<T> = T | deepArr<T>[]
const arr1: deepArr<number>[] = [[1,[2,[3,4,5],6],7,8],9]
const arr2: deepArr<string>[] = [['a', ['b'], ['c', 'd'], 'e'], 'f']

```

### 泛型接口
```typescript
// hobby属性的类型不确定，调用时再传入指定的类型
interface Person<T> {
  name: string;
  age: number;
  hobby: T
}
const obj: Person<string> = {
  name: '小明',
  age: 33,
  hobby: '吃饭'
}
const obj1: Person<number> = {
  name: '小明',
  age: 33,
  hobby: 100
}
```

### <font style="color:rgb(13, 13, 13);">泛型约束</font>
<font style="color:rgb(13, 13, 13);">限制泛型传入的类型可以通过泛型约束实现，使用</font>**extends**<font style="color:rgb(13, 13, 13);">关键字。</font>

```typescript
// 泛型约束：泛型 T 必须符合 extends 后的条件
// 限制 T 必须符合 { length: number } 类型，必须有 length 属性且值是数字
function getLen<T extends { length: number }>(a: T): number {
  return a.length
}
console.log(getLen<string>('100'))
console.log(getLen<number[]>([1,2,3,4,5,6,7]))
console.log(getLen<{ a: number, length: number }>({ a: 100, length: 10 }))
```

<font style="color:rgb(13, 13, 13);">在这个例子中，</font>**loggingIdentity**<font style="color:rgb(13, 13, 13);">要求其类型参数</font>**T**<font style="color:rgb(13, 13, 13);">必须符合</font>**Lengthwise**<font style="color:rgb(13, 13, 13);">接口，即必须包含</font>**length**<font style="color:rgb(13, 13, 13);">属性。</font>

## keyof和typeof
### <font style="color:rgb(13, 13, 13);">typeof</font>
**typeof**<font style="color:rgb(13, 13, 13);">操作符用于获取一个变量或对象的类型。在JavaScript中，</font>**typeof**<font style="color:rgb(13, 13, 13);">可以告诉你一个值的基础类型（如</font>**"number"**<font style="color:rgb(13, 13, 13);">、</font>**"string"**<font style="color:rgb(13, 13, 13);">等）。而在TypeScript中，</font>**typeof**<font style="color:rgb(13, 13, 13);">还被用于捕获变量的类型，以便在类型注解中使用。</font>

```typescript
let exampleVar = "hello world";
// 使用 typeof 获取 exampleVar 的类型
// exampleVarType 的类型为 string
type exampleVarType = typeof exampleVar

// 获取对象的类型
const obj =  { name: '小明', age: 22 }
type IObj = typeof obj // { name: string;age: number; }
```

### <font style="color:rgb(13, 13, 13);">keyof</font>
**keyof **<font style="color:rgb(13, 13, 13);">操作符用于取得一个对象类型的所有 </font>**<font style="color:rgb(13, 13, 13);">key</font>**<font style="color:rgb(13, 13, 13);"> 的联合类型。简单地说，它会返回由该对象所有 </font>**<font style="color:rgb(13, 13, 13);">key</font>**<font style="color:rgb(13, 13, 13);"> 组成的联合类型。</font>

```typescript
interface Person {
    name: string;
    age: number;
}

// 使用 keyof 获取 Person 接口的所有键作为联合类型
type PersonKeys = keyof Person; // "name" | "age"
```

### <font style="color:rgb(13, 13, 13);">组合使用</font>
**keyof**<font style="color:rgb(13, 13, 13);">和</font>**typeof**<font style="color:rgb(13, 13, 13);">可以组合使用，以创建更复杂的类型表达式。</font>

<font style="color:rgb(13, 13, 13);">在这个例子中，先使用</font>**typeof**<font style="color:rgb(13, 13, 13);">捕获</font>**person**<font style="color:rgb(13, 13, 13);">对象的类型，然后通过</font>**keyof**<font style="color:rgb(13, 13, 13);">获取这个类型的所有键，结果是一个包含</font>**"name"**<font style="color:rgb(13, 13, 13);">和</font>**"age"**<font style="color:rgb(13, 13, 13);">的联合类型。</font>

```typescript
const person = {
  name: "John",
  age: 30
};

// 使用 typeof 获取 person 的类型，然后使用 keyof 获取该类型的键的联合
type PersonKeys = keyof typeof person; // "name" | "age"
// 现在 PersonKeys 类型是 "name" | "age"
```



## 内置泛型
### <font style="color:rgb(13, 13, 13);">Partial<T></font>
**<font style="color:rgb(13, 13, 13);">作用：</font>**<font style="color:rgb(13, 13, 13);">把参数</font>**<font style="color:rgb(13, 13, 13);">T</font>**<font style="color:rgb(13, 13, 13);">类型的所有属性改成可选属性。</font>

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

let partialUser: Partial<User> = {
  email: "example@example.com"
};
```

### <font style="color:rgb(13, 13, 13);">Required<T></font>
**<font style="color:rgb(13, 13, 13);">作用：</font>**<font style="color:rgb(13, 13, 13);">与</font>**Partial**<font style="color:rgb(13, 13, 13);">相反，将参数</font>**T**<font style="color:rgb(13, 13, 13);">类型的所有属性设置为必填属性。</font>

```typescript
interface Props {
  id?: number;
  name?: string;
}

let props: Required<Props> = {
  id: 1,
  name: "Required Name"
};
```

### **<font style="color:rgb(13, 13, 13);">Readonly</font>**<font style="color:rgb(13, 13, 13);"><T></font>
**<font style="color:rgb(13, 13, 13);">作用：</font>**<font style="color:rgb(13, 13, 13);">将参数</font>**T**<font style="color:rgb(13, 13, 13);">类型的所有属性设置为只读属性。</font>

### <font style="color:rgb(13, 13, 13);">Pick<T, K></font>
**<font style="color:rgb(13, 13, 13);">作用：</font>**<font style="color:rgb(13, 13, 13);">从类型</font>**T**<font style="color:rgb(13, 13, 13);">中选择一组属性来构造类型，获取对象类型中的指定属性。</font>

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todoItem: Pick<Todo, "id" | "title"> = {
  id: 1,
  title: "Buy milk"
};
```

### <font style="color:rgb(13, 13, 13);">Omit<T, K></font>
**<font style="color:rgb(13, 13, 13);">作用：</font>**<font style="color:rgb(13, 13, 13);">剔除对象类型中的指定属性。</font>

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todoItem: Omit<Todo, "completed"> = {
  id: 1,
  title: "Buy milk"
};
```

### **<font style="color:rgb(13, 13, 13);">Exclude</font>**<font style="color:rgb(13, 13, 13);"><T, U></font>
**<font style="color:rgb(13, 13, 13);">作用：</font>**<font style="color:rgb(13, 13, 13);">从类型</font>**<font style="color:rgb(13, 13, 13);">T</font>**<font style="color:rgb(13, 13, 13);">中排除可以赋值给类型</font>**<font style="color:rgb(13, 13, 13);">U</font>**<font style="color:rgb(13, 13, 13);">的类型。</font>

```typescript
type T = string | number | boolean;
type U = string | number;

type Result = Exclude<T, U>; // boolean
```

### **<font style="color:rgb(13, 13, 13);">Extract<T, U></font>**
**<font style="color:rgb(13, 13, 13);">作用：</font>**<font style="color:rgb(13, 13, 13);">从类型</font>**<font style="color:rgb(13, 13, 13);">T</font>**<font style="color:rgb(13, 13, 13);">中提取出可以赋值给类型</font>**<font style="color:rgb(13, 13, 13);">U</font>**<font style="color:rgb(13, 13, 13);">的所有类型，提取</font>**<font style="color:rgb(13, 13, 13);">T</font>**<font style="color:rgb(13, 13, 13);">和</font>**<font style="color:rgb(13, 13, 13);">U</font>**<font style="color:rgb(13, 13, 13);">中的公共类型。</font>

```typescript
type T = string | number | boolean;
type U = string | boolean;
type CommonTypes = Extract<T, U>; // string | boolean
```

### **<font style="color:rgb(13, 13, 13);">ReturnType<T></font>**
**<font style="color:rgb(13, 13, 13);">作用：</font>**<font style="color:rgb(13, 13, 13);">用于获取一个函数类型的返回类型。</font>

```typescript
function add(a: number, b: number): number {
  return a + b;
}
type ResultType = ReturnType<typeof add>;
// ResultType 的类型是 number
```

## 类型声明文件
1. **<font style="color:rgb(13, 13, 13);">typescript中有两种文件类型</font>**
    1. **<font style="color:rgb(13, 13, 13);">.ts 文件：可以定义类型和逻辑</font>**
    2. **<font style="color:rgb(13, 13, 13);">.d.ts 类型声明文件：只能定义类型</font>**
2. **<font style="color:rgb(13, 13, 13);">typescript 默认会直接读取全局的 .d.ts 文件中的类型</font>**
    1. **<font style="color:rgb(13, 13, 13);">.d.ts 文件中没有使用 import 或者 export 就是全局文件</font>**
3. **<font style="color:rgb(13, 13, 13);">在 ts 文件中引入第三方包 </font>**
    1. **<font style="color:rgb(13, 13, 13);">自带声明文件，例如：axios </font>**
    2. **<font style="color:rgb(13, 13, 13);">没有声明文件，例如：mockjs, 尝试从 npm 下载对应的声明文件 </font>**`**<font style="color:rgb(13, 13, 13);">npm i --save-dev @types/包名</font>**`
    3. **<font style="color:rgb(13, 13, 13);">如果 `npm i --save-dev @types/包名` 没有对应的声明文件，需要手动定义对应的模块类型</font>**

## 定义全局变量类型
```typescript
// 在全局的 .d.ts 文件中
declare let myBlockScopedVar: number;
declare const myConstantVar: boolean;
declare function testfn(a: string): number;
// 扩展Window对象
declare global {
  interface Window {
    myGlobalFunction: () => void;
  }
}

// 现在你可以像使用其他window属性一样使用myGlobalFunction
window.myGlobalFunction = () => console.log("This is a global function");
```











## 




