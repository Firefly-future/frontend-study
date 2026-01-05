// index.js
Page({
  data:{
    text:'abc',
    title:'我是标题',
    arr:['a','b','c'],
    num:10,
    obj:{
      desc:'我是一个对象',
      info:{
        a:{
          b:{
            c:100
          }
        }
      }
    },
    list:[
      {name:'小蝶',age:17},
      {name:'小小涟',age:16},
      {name:'小白',age:18}
    ],
  },
  changeDesc(e){
    console.log(e.detail.value)
    this.setData({
      "obj.desc":e.detail.value
    })
  },
   changeNum(e){
    const {num}=e.target.dataset
    console.log('chang',num)
    this.setData({
      num:this.data.num + num
    })
   },
   add(){
    this.setData({
      "obj.info.a.b.c":this.data.obj.info.a.b.c+1,
      "list[2].age":this.data.list[2].age+1
    })
   },
   push(){
    this.setData({
      list:[...this.data.list,{name:this.data.title,age:Math.random()}]
    })
   },
   del(e){
    console.log(e.target.dataset)
    const {index}=e.target.dataset
    const list=[...this.data.list]
    list.splice(index,1)
    this.setData({
      list
    })
   }
})
