{
    // 对象类型
    // 定义类型别名
    type Obj1={
        readonly name:string  //只读属性
        age:number
        hobby:string[]
        sex?:string  //可选属性
        say(text:string):void
        say1:(a:number)=>void
    }

    // 接口
    interface Obj2{
        readonly name :string 
        age:number
        hobby:string[]
        sex?:string
        say(text:string):void
        say1:(a:number)=>void
    }

    const xm:Obj1={
        name:'小明',
        age:22,
        hobby:['吃饭'],
        sex:'nan',
        say(text){

        },
        say1:(a:number)=>{

        }
    }
    console.log(xm)

    const xh: Obj2[]=[
        {
            name:'小红',
            age:22,
            hobby:['吃饭'],
            say(text){

            },
            say1:(a:number)=>{

            }
        }
    ]
    console.log(xh)

    const list:Obj2[]=[
        {
            name:'小明',
            age:23,
            hobby:['吃饭'],
            sex:'nan',
            say(text){

            },
            say1:(a:Number)=>{

            }
        }
    ]
    console.log(list)
}