// import React, { useState } from "react"
// import { LeftOutlined } from "@ant-design/icons"
// import style from "./home.module.scss"
// import { Button, Progress } from "antd"
// import { Outlet, useNavigate } from "react-router-dom"
// import Index from "../index/Index"
// import First from "../index/components/first/First"
// import { useSelector } from "react-redux"
// import type { RootState } from "@/store/index"
// import Second from "../index/components/second/Second"
// import Third from "../index/components/third/Third"
// import Fourth from "../index/components/fourth/Fourth"
// import Fifth from "../index/components/fifth/Fifth"
// import Sixth from "../index/components/sixth/Sixth"
// import Seventh from "../index/components/seventh/Seventh"
// import Ninth from "../index/components/ninth/Ninth"
// import Eighth from "../index/components/eighth/Eighth"
// const home = () => {
//   const inquery1 = useSelector((state: RootState) => state.inquery1.data.data)
//   console.log(inquery1)
//   const navigate = useNavigate()
//   const [current, setCurrent] = useState(0)
//   const [activeId1, setActiveId1] = useState<any>("")
//   const [activeId2, setActiveId2] = useState<any>("")
//   const [activeId3, setActiveId3] = useState<any>("")
//   const [activeId4, setActiveId4] = useState<any>("")
//   const [activeId5, setActiveId5] = useState<any>("")
//   const [activeId6, setActiveId6] = useState<any>("")
//   const [activeId7, setActiveId7] = useState<any>("")
//   const [activeId8, setActiveId8] = useState<any>("")
//   const [activeId9, setActiveId9] = useState<any>("")
//   const [activeId10, setActiveId10] = useState<any>("")
//   let total = 0
//   if (activeId1 === 822) {
//     total = 10
//   } else if (activeId1 === 823) {
//     total = 4
//   } else {
//     total = 0
//   }
//   const percent = (current / total) * 100
//   console.log(activeId1)
//   return (
//     <div className={style.home}>
//       <div className={style.home_title}>
//         <div className={style.home_title_content}>
//           {" "}
//           <span className={style.home_title_content_span}>
//             <LeftOutlined
//               style={{ fontSize: 24 }}
//               onClick={() => navigate(-1)}
//             />
//           </span>
//           <h3>询价详情</h3>
//         </div>
//         <div className={style.progress}>
//           <Progress
//             percent={percent}
//             type="line"
//             size={{ height: 14 }}
//             showInfo={false}
//             strokeColor={{
//               "0%": "#E9E9E9",
//               "100%": "#F9E72C",
//             }}
//           />
//           {percent > 0 ? (
//             <span className={style.progress_span}>{`${current}/${total}`}</span>
//           ) : null}
//         </div>
//         <div className={style.product}>
//           <span>至高+￥{inquery1.couponPrice}</span>
//           {inquery1.productName}
//         </div>
//       </div>
//       <main>
//         <Index
//           setCurrent={setCurrent}
//           activeId1={activeId1}
//           setActiveId1={setActiveId1}
//         />
//         {activeId1 !== "" && (
//           <First
//             activeId={activeId1}
//             activeId2={activeId2}
//             setActiveId2={setActiveId2}
//             setCurrent={setCurrent}
//           />
//         )}
//         {activeId1 !== "" && activeId2 !== "" && (
//           <Second
//             activeId={activeId1}
//             activeId3={activeId3}
//             setActiveId3={setActiveId3}
//             setCurrent={setCurrent}
//           />
//         )}
//         {activeId1 !== "" && activeId2 !== "" && activeId3 !== "" && (
//           <Third
//             activeId={activeId1}
//             activeId4={activeId4}
//             setActiveId4={setActiveId4}
//             setCurrent={setCurrent}
//           />
//         )}
//         {activeId1 !== "" &&
//           activeId2 !== "" &&
//           activeId3 !== "" &&
//           activeId4 !== "" && (
//             <Fourth
//               activeId={activeId1}
//               activeId5={activeId5}
//               setActiveId5={setActiveId5}
//               setCurrent={setCurrent}
//             />
//           )}
//         {activeId1 !== "" &&
//           activeId2 !== "" &&
//           activeId3 !== "" &&
//           activeId4 !== "" &&
//           activeId5 !== "" && (
//             <Fifth
//               activeId={activeId1}
//               activeId6={activeId6}
//               setActiveId6={setActiveId6}
//               setCurrent={setCurrent}
//             />
//           )}
//         {activeId1 !== "" &&
//           activeId2 !== "" &&
//           activeId3 !== "" &&
//           activeId4 !== "" &&
//           activeId5 !== "" &&
//           activeId6 !== "" && (
//             <Sixth
//               activeId={activeId1}
//               activeId7={activeId7}
//               setActiveId7={setActiveId7}
//               setCurrent={setCurrent}
//             />
//           )}
//         {activeId1 !== "" &&
//           activeId2 !== "" &&
//           activeId3 !== "" &&
//           activeId4 !== "" &&
//           activeId5 !== "" &&
//           activeId6 !== "" &&
//           activeId7 !== "" && (
//             <Seventh
//               activeId={activeId1}
//               activeId8={activeId8}
//               setActiveId8={setActiveId8}
//               setCurrent={setCurrent}
//             />
//           )}
//         {activeId1 !== "" &&
//           activeId2 !== "" &&
//           activeId3 !== "" &&
//           activeId4 !== "" &&
//           activeId5 !== "" &&
//           activeId6 !== "" &&
//           activeId7 !== "" &&
//           activeId8 !== "" && (
//             <Eighth
//               activeId={activeId1}
//               activeId9={activeId9}
//               setActiveId9={setActiveId9}
//               setCurrent={setCurrent}
//             />
//           )}
//         {activeId1 !== "" &&
//           activeId2 !== "" &&
//           activeId3 !== "" &&
//           activeId4 !== "" &&
//           activeId5 !== "" &&
//           activeId6 !== "" &&
//           activeId7 !== "" &&
//           activeId8 !== "" &&
//           activeId9 !== "" && (
//             <Ninth
//               activeId={activeId1}
//               activeId10={activeId10}
//               setActiveId10={setActiveId10}
//               setCurrent={setCurrent}
//             />
//           )}
//       </main>
//       <footer>
//         <img
//           src="https://sr.aihuishou.com/c2b/zy-fe/public/neom/images/recycle/consultant-bottom.png?_=1766387700000&x-oss-process=image/resize,m_lfit,w_687,/quality,Q_80/format,webp"
//           onClick={() => navigate("/login")}
//         />
//         {current / total === 1 && (
//           <Button
//             block
//             style={{
//               backgroundColor: "#F9E72C",
//               borderColor: "#F9E72C",
//               color: "#000",
//               margin: "10px 0 0 0",
//               padding: "20px 0",
//               borderRadius: "40px",
//             }}
//             onClick={() => navigate("/login")}
//           >
//             马上估价
//           </Button>
//         )}
//       </footer>
//     </div>
//   )
// }

// export default home


import React, { useState, useEffect } from "react"
import { LeftOutlined } from "@ant-design/icons"
import style from "./home.module.scss"
import { Button, Progress } from "antd"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/index"
import Index from "../index/Index"
import First from "../index/components/first/First"
import Second from "../index/components/second/Second"
import Third from "../index/components/third/Third"
import Fourth from "../index/components/fourth/Fourth"
import Fifth from "../index/components/fifth/Fifth"
import Sixth from "../index/components/sixth/Sixth"
import Seventh from "../index/components/seventh/Seventh"
import Eighth from "../index/components/eighth/Eighth"
import Ninth from "../index/components/ninth/Ninth"

const Home = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const inquery1 = useSelector((state: RootState) => state.inquery1.data.data)

  // 使用数组管理所有activeId状态
  const [activeIds, setActiveIds] = useState<Array<any>>(Array(10).fill(""))

  // 监听activeIds的变化，自动更新currentStep
  useEffect(() => {
    // 找到第一个未设置activeId的索引
    const firstEmptyIndex = activeIds.findIndex((id) => id === "")
    
    if (firstEmptyIndex === -1) {
      // 所有activeId都已设置
      setCurrentStep(totalSteps)
    } else {
      // 当前步骤是第一个未设置activeId的索引
      setCurrentStep(firstEmptyIndex)
    }
  }, [activeIds])

  // 更新activeId的辅助函数
  const setActiveId = (index: number, value: any) => {
    setActiveIds((prev) => {
      const newIds = [...prev]
      newIds[index] = value
      return newIds
    })
  }

  // 计算总步骤数
  const getTotalSteps = () => {
    if (activeIds[0] === 822) return 10
    if (activeIds[0] === 823) return 4
    return 0
  }

  const totalSteps = getTotalSteps()
  const percent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0
  const allStepsCompleted = currentStep === totalSteps && totalSteps > 0

  // 步骤组件数组
  const stepComponents = [
    Index,
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    Sixth,
    Seventh,
    Eighth,
    Ninth,
  ]

  return (
    <div className={style.home}>
      <div className={style.home_title}>
        <div className={style.home_title_content}>
          <span className={style.home_title_content_span}>
            <LeftOutlined
              style={{ fontSize: 24 }}
              onClick={() => navigate(-1)}
            />
          </span>
          <h3>询价详情</h3>
        </div>

        <div className={style.progress}>
          <Progress
            percent={percent}
            type="line"
            size={{ height: 14 }}
            showInfo={false}
            strokeColor={{
              "0%": "#E9E9E9",
              "100%": "#F9E72C",
            }}
          />
          {percent > 0 && (
            <span className={style.progress_span}>
              {`${currentStep}/${totalSteps}`}
            </span>
          )}
        </div>

        <div className={style.product}>
          <span>至高+￥{inquery1.couponPrice}</span>
          {inquery1.productName}
        </div>
      </div>

      <main>
        {/* 渲染所有满足条件的步骤组件 */}
        {stepComponents.map((Component, index) => {
          // 检查前面的所有activeId是否都已设置
          const shouldRender =
            index === 0
              ? true
              : activeIds.slice(0, index).every((id) => id !== "")

          if (!shouldRender) return null

          // 构建props
          const props: any = {
            activeId: activeIds[0],
          }

          // 为每个组件添加对应的activeIdX和setActiveIdX
          if (index === 0) {
            props.activeId1 = activeIds[0]
            props.setActiveId1 = (value: any) => setActiveId(0, value)
          } else {
            const propName = `activeId${index + 1}`
            const setterName = `setActiveId${index + 1}`
            props[propName] = activeIds[index]
            props[setterName] = (value: any) => setActiveId(index, value)
          }

          return <Component key={index} {...props} />
        })}
      </main>

      <footer>
        <img
          src="https://sr.aihuishou.com/c2b/zy-fe/public/neom/images/recycle/consultant-bottom.png?_=1766387700000&x-oss-process=image/resize,m_lfit,w_687,/quality,Q_80/format,webp"
          alt="咨询顾问"
          onClick={() => navigate("/login")}
        />
        {allStepsCompleted && (
          <Button
            block
            style={{
              backgroundColor: "#F9E72C",
              borderColor: "#F9E72C",
              color: "#000",
              margin: "10px 0 0 0",
              padding: "20px 0",
              borderRadius: "40px",
            }}
            onClick={() => navigate("/login")}
          >
            马上估价
          </Button>
        )}
      </footer>
    </div>
  )
}

export default Home