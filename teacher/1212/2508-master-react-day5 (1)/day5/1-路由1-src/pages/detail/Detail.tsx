import React, { useEffect } from 'react'
import axios from 'axios'
import { useLocation, useSearchParams, useParams, useNavigate } from 'react-router-dom'

const Detail = () => {
  const navigate = useNavigate()

  // 获取当前路由信息
  const location = useLocation()
  console.log(location)

  // 获取 search 参数
  const [searchParams, setSearchParams] = useSearchParams()
  // console.log(searchParams)
  // console.log(searchParams.has('a')) // 判断search中是否存在 a
  // console.log(searchParams.get('id')) // 获取指定参数
  // console.log(searchParams.getAll('a')) // 获取所有 key 为 a 的参数

  // 获取动态路由参数
  const params = useParams()
  console.log(params.id)

  useEffect(() => {
    axios.get('http://39.96.210.90:5001/playlist/detail', {
      params: {
        id: params.id
      }
    })
      .then(res => {
        console.log(res.data.playlist.name)
      })

  }, [params.id])
  
  
  return (
    <div>
      <h2>Detail</h2>
      <button onClick={() => navigate(-1)}>返回</button>
      <button onClick={() => {
        // 修改 search 参数
        // setSearchParams({ id: '1111' })

        navigate('/detail/19723756')
      }}>修改参数</button>
    </div>
  )
}

export default Detail