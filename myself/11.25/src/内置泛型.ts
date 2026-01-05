{
    // 内置泛型
    interface Person {
        name: string,
        age: number,
        sex: 0 | 1,
        hobby?: string[]
    }

    // 从对象类型中挑选某些属性组成新类型
    type PickObj = Pick<Person, 'name' | 'hobby'>
    // 从对象类型中排除某些属性组成新类型
    type OmitObj = Omit<Person, 'name' | 'hobby'>
    // 构造一个对象类型，string为类型，前面的为key键
    type Obj = Record<'a' | 'b' | 'c', string>
    //将某对象中的所有属性变为必需项
    type RequiredObj=Required<Person>
    // 将某对象中的所有属性变为非必需项
    type PartialObj=Partial<Person>
    // 将某对象中的所有属性变为只读
    type ReadonlyObj=Readonly<Person>
    // 将符合后面类型的去除后组成新类型
    type Result=Exclude<string|number|any[],string>
    // 将不符合后面类型的去除后组成新类型
    type Res2=Extract<'a'|'1'|22|true,string>


    // 提取返回结果的类型
    function fn(a:number,b:string){
        return a+b
    }
    type FnRes=ReturnType<typeof fn>
}