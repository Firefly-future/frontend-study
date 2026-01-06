import React from "react"
import style from "./tip.module.scss"
import { Button } from "antd"

interface TipProps {
  setShowTip: (showTip: boolean) => void
}

const Tip = ({ setShowTip }: TipProps) => {
  return (
    <div className={style.tip}>
      <div className={style.tip_content}>
        <img src="https://sr.aihuishou.com/c2b/zy-fe/public/neom/images/inquiry/rejected-model-tips-v2.png?_v=466131" />
        <div className={style.tip_bottom}>
          <p>为了您的隐私安全，暂不回收此类机器</p>
          <Button
            block
            style={{
              backgroundColor: "#F9E72C",
              borderColor: "#F9E72C",
              color: "#000",
              padding:"20px 0",
              borderRadius:"40px"
            }}
            onClick={() => setShowTip(false)}
          >
            我知道了
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Tip
