import React, { useState, useRef, useEffect } from "react"
import Child from "./components/Child"
import axios from "axios"
// useEffect：处理组件副作用，例如进入页面调用接口，创建定时器，绑定原生事件等，也可实现类似生命周期的功能
// useEffect(callback,[依赖项1,依赖项2,...])
// 1.依赖项数组不写：组织中只要有变量更新就会执行callback，类似组件更新完成，componentDidUpdate
// 2.依赖项传空数组：callback只执行一次，在组件渲染完成后执行，类似组件挂载完成 componentDidMount
// 3.依赖项传入具体变量:依赖项改变时执行callback
// 4.callback中的return函数：清除副作用，依赖项改变时先执行上一次return 的函数，再执行当前的callback,组件销毁时会执行return的函数
// 5.依赖项中传空数组，callback中的return函数，可以实现类似 componentWillUnmount
const App = () => {
	const [title, setTitle] = useState("默认标题")
	const [num, setNum] = useState(0)
	const [banners, setBanners] = useState([])

	// useEffect(()=>{
	//   // 等待组件渲染完成后执行callback
	//   console.log(title,document.querySelector('h2').outerHTML)
	// })

	// useEffect(() => {
	// 	console.log("num", num)
	// },[num,title])

	// useEffect(()=>{
	//   console.log('num',num)
	//   return ()=>{
	//     console.log('return返回的num',num)
	//   }
	// },[num])

	// useEffect(() => {
	// 	axios.get("http://39.96.210.90:5001/banner").then((res) => {
	// 		console.log(res.data.banners)
	// 		setBanners(res.data.banners)
	// 	})
	// }, [])

	// useEffect(async()=>{
	//   const res=await axios.get('http://39.96.210.90:5001/banner')
	//   console.log(res.data.banners)
	//   setBanners(res.data.banners)
	// })             //这样写报错  useEffect不能直接返回一个函数 需要返回一个清理函数或 undefined 而async会直接返回一个Promise函数 导致错误

	// 修改后的代码
	useEffect(() => {
		const getBanners = async () => {
			const res = await axios.get("http://39.96.210.90:5001/banner")
			console.log(res.data.banners)
			setBanners(res.data.banners)
		}
    getBanners()
	},[])

  // useEffect(()=>{
  //   getUserList()
  // },[pagesize,pagenum])

  useEffect(()=>{
    const keydown=e=>{
      if(e.keyCode===13){
        console.log('回车键')
      }
    }
    document.addEventListener('keydown',keydown)
    return ()=>{
      document.removeEventListener('keydown',keydown)
    }
  },[])
	return (
		<div>
			<h2> {title} </h2>
			<input
				type="text"
				value={title}
				onChange={(e) => {
					setTitle(e.target.value)
				}}
			/>
			<hr />
			<button onClick={() => setNum(num - 1)}>-</button>
			<div> {num} </div>
			点击的次数：<button onClick={() => setNum(num + 1)}> {num} </button>
			<hr />
			{num > 0 && <Child></Child>}
			<ul>
				{banners.map((item) => {
					return (
						<li key={item.bigImageUrl}>
							<img
								src={item.bigImageUrl}
								width={300}
								alt=""
							/>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default App
