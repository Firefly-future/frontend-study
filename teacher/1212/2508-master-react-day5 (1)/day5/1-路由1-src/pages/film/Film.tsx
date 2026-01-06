import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface ListItem {
  coverImgUrl: string
  id: number
  name: string
  description: string
}


const Film = () => {
  const [list, setList] = useState<ListItem[]>([])
  // 跳转页面的 hook
  const navigate = useNavigate()

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get<{ list: ListItem[] }>('http://39.96.210.90:5001/toplist')
      console.log(res.data.list)
      setList(res.data.list)    
    }

    getList()
  }, [])

  const goDetail = (id: number) => {
    // 跳转路由
    // navigate('/detail')

    // search 传参数
    // navigate(`/detail?id=${id}`)

    // 动态路由传参数
    navigate(`/detail/${id}`)

    // 替换路由
    // navigate(`/detail/${id}`, { replace: true })

    // state 传参数
    // navigate(`/detail/${id}`, {
    //   state: {
    //     a: 111,
    //     b: 2222
    //   }
    // })
  }

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      {list.map(item => 
        <div key={item.id} onClick={() => goDetail(item.id)}>
          <img src={item.coverImgUrl} width={100} alt="" />
          <h3>{item.name} - {item.id}</h3>
          <p>{item.description}</p>
        </div>
      )}
    </div>
  )
}

export default Film