import React, { useState } from "react"
import style from "./sixth.module.scss"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/index"
import Tip from "@/components/tip/Tip"
import classNames from "classnames"
import { FormOutlined } from "@ant-design/icons"

interface SixthProps {
  activeId: any
  setActiveId7: (id: any) => void
  activeId7: any
  setCurrent: (current: number) => void
}

const Sixth = ({
  activeId,
  activeId7,
  setActiveId7,
  setCurrent,
}: SixthProps) => {
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
  if (!inquery?.[5]?.items) return null
  const unRecyle = inquery?.[5].items.filter(
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
    setActiveId7(item.id)
    setCollapsed(true)
    // setCurrent(7)
  }
  console.log(activeId7)
  return (
    <div className={style.sixth}>
      <h4>
        {" "}
        <span>7.{inquery?.[5].name}</span>{" "}
        <b onClick={() => setCollapsed(!collapsed)}>
          {" "}
          {activeId7 === ""
            ? ""
            : inquery?.[5].items.find((item) => item.id === activeId7)?.name}
          {activeId7 === "" ? "" : <FormOutlined />}
        </b>
      </h4>
      {!collapsed && (
        <ul>
          {inquery?.[5].items.map((item, ind) => {
            return (
              <li
                key={item.id}
                className={classNames(
                  style.index_item,
                  activeId7 === item.id ? style.active : "",
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

export default Sixth
