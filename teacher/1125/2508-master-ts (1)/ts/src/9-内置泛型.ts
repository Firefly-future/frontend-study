{

  interface Person {
    name: string
    age: number
    sex: 0 | 1
    hobby?: string[]
  }

  // 内置泛型
  // 从对象类型中挑选某些属性组成新类型
  type PickObj = Pick<Person, 'name' | 'hobby'>
  // 从对象类型中排除某些属性组成新类型
  type OmitObj = Omit<Person, 'name' | 'hobby'>


  type Obj = Record<'a' | 'b' | 'c', string>
  type RequiredObj = Required<Person>
  type PartialObj = Partial<Person>
  type ReadonlyObj = Readonly<Person>
  type Result = Exclude<string | number | any[], string>
  type Res2 = Extract<'a' | '1' | 22 | true, string>


  function fn(a: number, b: string) {
    return a + b
  }
  type FnRes = ReturnType<typeof fn>

}