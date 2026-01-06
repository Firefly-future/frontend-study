import React, { useState } from "react"
import style from "./ninth.module.scss"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/index"
import Tip from "@/components/tip/Tip"
import classNames from "classnames"
import { FormOutlined } from "@ant-design/icons"

interface NinthProps {
  activeId: any
  setActiveId10: (id: any) => void
  activeId10: any
  setCurrent: (current: number) => void
}

const Ninth = ({
  activeId,
  activeId10,
  setActiveId10,
  setCurrent,
}: NinthProps) => {
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
  if (!inquery?.[8]?.items) return null
  const unRecyle = inquery?.[8].items.filter(
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
    setActiveId10(item.id)
    setCollapsed(true)
    // setCurrent(10)
  }
  console.log(activeId10)
  return (
    <div className={style.ninth}>
      <h4>
        {" "}
        <span>10.{inquery?.[8].name}</span>{" "}
        <b onClick={() => setCollapsed(!collapsed)}>
          {" "}
          {activeId10 === ""
            ? ""
            : inquery?.[8].items.find((item) => item.id === activeId10)?.name}
          {activeId10 === "" ? "" : <FormOutlined />}
        </b>
      </h4>
      {!collapsed && (
        <ul>
          {inquery?.[8].items.map((item, ind) => {
            return (
              <li
                key={item.id}
                className={classNames(
                  style.index_item,
                  activeId10 === item.id ? style.active : "",
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

export default Ninth
