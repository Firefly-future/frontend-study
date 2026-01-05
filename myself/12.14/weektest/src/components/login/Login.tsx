import { useNavigate } from "react-router-dom"
import style from "./Login.module.scss"
import { useEffect, useState } from "react"

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const loginBtn = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("请输入用户名或密码")
      return
    } else if (username.trim() !== "admin" || password.trim() !== "123") {
      alert("用户名或密码错误")
      return
    } else {
      navigate("/home/moneyCon/group")
      localStorage.setItem("token", username)
      return
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/home")
    }
    const keydown = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        loginBtn()
      }
    }
    document.addEventListener("keydown", keydown)
    return () => {
      document.removeEventListener("keydown", keydown)
    }
  }, [username, password])
  return (
    <div className={style.login}>
      <div className={style.loginContent}>
        <div className={style.loginItem}>
          <input
            type="text"
            placeholder="请输入用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={style.loginItem}>
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={style.loginBtn} onClick={loginBtn}>
          登录
        </button>
      </div>
    </div>
  )
}

export default Login
