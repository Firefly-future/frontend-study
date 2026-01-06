import React, { useEffect, useState } from "react"
import axios from "axios"
import { replace, useNavigate } from "react-router-dom"
import style from "./Film.module.scss"

interface listItem {
	coverImgUrl: string
	id: number
	name: string
	description: string
}

const Film = () => {
	const [list, setList] = useState<listItem[]>([])
	// 跳转页面
	const navigate = useNavigate()
	const getToplist = async () => {
		try {
			const res = await axios.get("http://39.96.210.90:5001/toplist")
			console.log(res.data.list)
			setList(res.data.list)
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		getToplist()
	}, [])
	const goDetail = (id: number) => {
		// 跳转路由
		// navigate("/detail")

		// search 传参数
		// navigate(`/detail?id=${id}`)

		// 动态路由传参数
		// state 可选参数 某方向自定义
			navigate(`/detail/${id}`,{
				state:{
					a:111,
					b:2324234
				}
			})
		// }

		// 替换路由
		// navigate(`/detail/${id}`, { replace: true })
	}
	return (
		<div>
			{list.map((item) => {
				return (
					<div
						key={item.id}
						onClick={() => goDetail(item.id)}
					>
						<h3>
							{item.name}--{item.id}{" "}
						</h3>
						<p>{item.description}</p>
						<p>
							<img
								src={item.coverImgUrl}
								alt=""
							/>
						</p>
					</div>
				)
			})}
		</div>
	)
}

export default Film
