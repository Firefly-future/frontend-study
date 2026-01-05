{
    // 函数类型
    function fn(a: number, b: string): number {
        return a + b.length
    }
    console.log(fn(100,'djawodjo'))
    const sum = (a: number, b: string): number => {
        return a + b.length
    }

    const obj = {
        say1(text: string): void {
            console.log(text)
        },
        say2: (text: string): void => {
            console.log(text)
        }
    }
    console.log(obj)

    const a = sum(20, '100')
    console.log(a)
    // 可选参数
    function fn1(a: number, b?: string): void {
        console.log(a)
    }
    fn1(100)

    // 默认参数
    function fn2(url:string,method:string='get'):void{
        console.log(url,method)
    }
    fn2('100')

    // 剩余参数
    function fn3(...args:number[]):number{
        return args.reduce((prev,val)=>prev+val,0)
    }
    const res=fn3(1,2,3,4,56)
    console.log(res)
}