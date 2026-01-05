import axios from "axios"
import React, { useEffect } from "react"
import { useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom"

const Detail = () => {
	const navigate=useNavigate()
	// 获取当前路由信息
	const location = useLocation()
	console.log(location)
	// 获取search参数
	// const [searchParams, setSearchParams] = useSearchParams()
	// console.log(searchParams.get("id")) //获取指定参数
	// console.log(searchParams.getAll("id")) //获取所有key为id 的参数  返回一个数组
	// console.log(searchParams.has("id")) //判断是否有此key  boolean值

	// 获取动态路由
	const params=useParams()
	console.log(params.id)

	// 获取歌单详情
	useEffect(()=>{
		axios.get("http://39.96.210.90:5001/playlist/detail",{
			params:{
				id:params.id
			}
		})
		.then(res=>{
			console.log(res)
		})
	},[params.id])

	return (
		<div>
			<button
				onClick={() => {
					// searchParams.append("id", "djawodjioawdoawjidoiwdawd")
					// console.log(searchParams.getAll('id'))

					// 修改search参数
					// setSearchParams("id=bbb")
					navigate(`/detail/24381616`)
				}}
			>
				修改参数
			</button>
			<button onClick={()=>{navigate(-1)}}>返回</button>
		</div>
	)
}

export default Detail
