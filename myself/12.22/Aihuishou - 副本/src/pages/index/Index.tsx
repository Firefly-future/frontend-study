import React, { useState } from "react"
import style from "./index.module.scss"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/index"
import Tip from "@/components/tip/Tip"
import classNames from "classnames"
import { FormOutlined } from "@ant-design/icons"

interface IndexProps {
  setCurrent: (current: number) => void
  activeId1: any,
  setActiveId1: (id: any) => void
}

const Index = ({ setCurrent, activeId1, setActiveId1 }: IndexProps) => {
  const inquery1 = useSelector(
    (state: RootState) => state.inquery1.data.data.quickInquiry
  )
  console.log(inquery1)
  const [showTip, setShowTip] = useState(false)
  // const [activeId, setActiveId] = useState<any>("")
  const [collapsed, setCollapsed] = useState(false)
  // 判断无法回收
  const unRecyle = inquery1.items.filter(
    (item) =>
      item.description?.includes("无法回收") ||
      item.isEnvironmentalRecycling === true ||
      item.isNoAdditional === true ||
      item.noAdditionalTips?.includes("无法回收")
  )
  const handleClick = (item: any) => {
    if (unRecyle.includes(item)) {
      setShowTip(true)
      return
    }
    setActiveId1(item.id)
    setCollapsed(true)
    // setCurrent(1)
  }
  return (
    <div>
      <div className={style.index}>
        <h4>
          {" "}
          <span>1.{inquery1.name}</span>{" "}
          <b onClick={() => setCollapsed(!collapsed)}>
            {" "}
            {activeId1 === ""
              ? ""
              : inquery1.items.find((item) => item.id === activeId1)?.name}
            {activeId1 === "" ? "" : <FormOutlined />}
          </b>
        </h4>
        {!collapsed && (
          <ul>
            {inquery1.items.map((item, ind) => {
              return (
                <li
                  key={item.id}
                  className={classNames(
                    style.index_item,
                    activeId1 === item.id ? style.active : "",
                    unRecyle.includes(item) ? style.unRecyle : ""
                  )}
                  onClick={() => {
                    handleClick(item)
                  }}
                >
                  <p>{item.name}</p>
                  {item.description && (
                    <p className={style.index_description}>
                      {item.description}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        )}
        {showTip && <Tip setShowTip={setShowTip} />}
      </div>
    </div>
  )
}

export default Index
