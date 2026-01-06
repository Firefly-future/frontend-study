{

  // 类型推论：ts可以根据值反推变量的类型
  // const arr = [1,2,3,4,5]
  // const res = arr.map(v => {
  //   return {
  //     value: v * 2
  //   }
  // })

  // res.forEach(item => {
  //   console.log(item.value.toFixed(2))    
  // })

  // 类型断言
  const title = document.querySelector('.title') as HTMLHeadingElement
  const inp = <HTMLInputElement>document.querySelector('.inp')

  // ! 非空断言，确定变量不为 null、undefined
  const h2 = document.querySelector('h2')!

  console.log(inp.value)
  h2.addEventListener('click', e => {
    console.log((e.target as HTMLHeadingElement).innerHTML)
  })

}