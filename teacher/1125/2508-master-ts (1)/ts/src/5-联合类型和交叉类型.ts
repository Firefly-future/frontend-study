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

  // 文字类型
  type keys = 'a' | 'b' | 'c'
  const a: keys = 'a'
  const b: 0 | 1 = 1




  // 交叉类型
  // type Test2 = { name: string } & { age: number; name: number }
  // const obj: Test2 = {
  //   age: 22,
  //   name: 'sss'
  // }


}