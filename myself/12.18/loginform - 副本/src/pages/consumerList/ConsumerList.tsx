import React, { useState } from "react"
import { listApi } from "@/services"

const ConsumerList = () => {
  const [list, setList] = useState([])

  const getListData = async () => {
    try {
      
    } catch (e) {
      console.log(e)
    }
  }
  return <div>用户列表</div>
}

export default ConsumerList
