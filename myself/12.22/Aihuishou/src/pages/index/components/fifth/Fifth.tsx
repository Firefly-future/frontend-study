import React, { useState } from "react"
import style from "./fifth.module.scss"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/index"
import Tip from "@/components/tip/Tip"
import classNames from "classnames"
import { FormOutlined } from "@ant-design/icons"

interface FifthProps {
  activeId: any
  setActiveId6: (id: any) => void
  activeId6: any
  // setCurrent: (current: number) => void
}

const Fifth = ({
  activeId,
  activeId6,
  setActiveId6,
  // setCurrent,
}: FifthProps) => {
  const inquery3 = useSelector(
    (state: RootState) => state.inquery3.data.data.propertyNames
  )
  console.log(inquery3)
  const inquery2 = useSelector(
    (state: RootState) => state.inquery2.data.data.propertyNames
  )
  console.log(inquery2)

  let inquery = null
  if (activeId === 823) {
    inquery = inquery3
  } else if (activeId === 822) {
    inquery = inquery2
  } else {
    inquery = null
  }

  const [collapsed, setCollapsed] = useState(false)
  const [showTip, setShowTip] = useState(false)
  if (!inquery?.[4]?.items) return null
  const unRecyle = inquery?.[4].items.filter(
    (item) =>
      item.description?.includes("无法回收") ||
      item.isEnvironmentalRecycling === true ||
      item.isNoAdditional === true ||
      item.noAdditionalTips?.includes("无法回收")
  )

  const handleClick = (item: any) => {
    if (unRecyle?.includes(item)) {
      setShowTip(true)
      return
    }
    setActiveId6(item.id)
    setCollapsed(true)
    // setCurrent(6)
  }
  console.log(activeId6)
  return (
    <div className={style.fifth}>
      <h4>
        {" "}
        <span>6.{inquery?.[4].name}</span>{" "}
        <b onClick={() => setCollapsed(!collapsed)}>
          {" "}
          {activeId6 === ""
            ? ""
            : inquery?.[4].items.find((item) => item.id === activeId6)?.name}
          {activeId6 === "" ? "" : <FormOutlined />}
        </b>
      </h4>
      {!collapsed && (
        <ul>
          {inquery?.[4].items.map((item, ind) => {
            return (
              <li
                key={item.id}
                className={classNames(
                  style.index_item,
                  activeId6 === item.id ? style.active : "",
                  unRecyle?.includes(item) ? style.unRecyle : ""
                )}
                onClick={() => {
                  handleClick(item)
                }}
              >
                <p>{item.name}</p>
                {item.description && (
                  <p className={style.index_description}>{item.description}</p>
                )}
              </li>
            )
          })}
        </ul>
      )}
      {showTip && <Tip setShowTip={setShowTip} />}
    </div>
  )
}

export default Fifth
