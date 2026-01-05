import { useEffect, useState } from "react"
import style from "./Home.module.scss"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

interface List {
  title: string
  path: string
}

const Home = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem("token")
  const location = useLocation()
  console.log(location)
  const pathname = location.pathname
  const list: List[] = [
    {
      title: "资金组成",
      path: "group",
    },
    {
      title: "资金流向",
      path: "loop",
    },
    {
      title: "资金来源",
      path: "coming",
    },
    {
      title: "用户管理",
      path: "user",
    },
  ]
  const [title, setTitle] = useState("")
  const [currentPages, setCurrentPages] = useState<List[]>([])
  useEffect(() => {
    const match = list.find((item) => pathname.includes(item.path))
    if (!match) return
    setTitle(match.title)
    const exist = currentPages.some((p) => p.path === match.path)
    if (!exist) {
      setCurrentPages((prev) => [...prev, match])
    }
  }, [pathname, currentPages])
  return (
    <div className={style.home}>
      <div className={style.NavLink}>
        <NavLink to="moneyCon" className={style.leftItem}>
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="15112"
            width="30"
            height="30"
          >
            <path
              d="M815.226093 64.617693 208.480218 64.617693c-79.404468 0-144.005788 64.599274-144.005788 144.004765l0 606.745874c0 79.404468 64.600297 144.004765 144.005788 144.004765l606.745874 0c79.404468 0 144.005788-64.600297 144.005788-144.004765L959.231881 208.622458C959.230857 129.216967 894.63056 64.617693 815.226093 64.617693zM695.877891 593.173764c11.114129 0 20.252253 9.585309 20.252253 20.936845 0 11.603269-9.138124 20.935822-20.252253 20.935822L532.789489 635.046431l0 113.819279c0 11.608386-9.333576 20.49887-20.936845 20.49887-11.351536 0-20.936845-8.890484-20.936845-20.49887L490.915799 635.047454 328.074014 635.047454c-11.608386 0-20.49887-9.332553-20.49887-20.935822 0-11.351536 8.891508-20.936845 20.49887-20.936845l162.841785 0 0-84.768639L328.074014 508.406149c-11.608386 0-20.49887-9.333576-20.49887-20.936845 0-11.350512 8.891508-20.935822 20.49887-20.935822l154.325831 0-137.76976-162.337295c-7.511067-8.850575-6.148024-21.668509 2.699482-29.176506 8.655124-7.344269 21.716604-6.768147 29.227672 2.082428l135.295406 159.422919 135.295406-159.422919c7.511067-8.850575 20.572548-9.426697 29.227672-2.082428 8.847505 7.507998 10.210549 20.326954 2.698458 29.176506l-137.768737 162.337295 154.572448 0c11.114129 0 20.252253 9.585309 20.252253 20.935822 0 11.603269-9.138124 20.936845-20.252253 20.936845L532.789489 508.406149l0 84.768639L695.877891 593.174787z"
              fill="#fff"
              p-id="15113"
            ></path>
          </svg>
          资金管理
        </NavLink>
        <NavLink to="control" className={style.leftItem}>
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="20449"
            width="30"
            height="30"
          >
            <path
              d="M678.4 992c-6.4 0-19.2-6.4-25.6-12.8 0 0-19.2-19.2-44.8-38.4-70.4-51.2-128-51.2-198.4 0-25.6 19.2-38.4 38.4-44.8 38.4-12.8 12.8-25.6 12.8-38.4 6.4l-121.6-70.4c-12.8 0-19.2-19.2-12.8-32 6.4-6.4 12.8-38.4 12.8-64 0-44.8-19.2-89.6-51.2-128-25.6-32-70.4-57.6-115.2-57.6-12.8 0-25.6-12.8-32-25.6 0-19.2-6.4-64-6.4-96s6.4-76.8 12.8-96c0-12.8 12.8-25.6 32-25.6 38.4 0 83.2-19.2 115.2-57.6 32-32 44.8-76.8 44.8-121.6 0-25.6-12.8-57.6-12.8-64-6.4-19.2 0-32 12.8-44.8l128-70.4c12.8-6.4 32-6.4 38.4 6.4 0 0 19.2 19.2 44.8 38.4 70.4 51.2 121.6 51.2 192 0 12.8-12.8 32-25.6 44.8-38.4l6.4-6.4h32l121.6 70.4c19.2 12.8 25.6 25.6 19.2 44.8-6.4 6.4-12.8 38.4-12.8 64 0 44.8 19.2 89.6 51.2 128 32 32 70.4 51.2 115.2 57.6 12.8 0 25.6 12.8 32 25.6 0 6.4 6.4 51.2 6.4 89.6 0 32-6.4 70.4-12.8 96 0 12.8-12.8 25.6-32 25.6-44.8 6.4-89.6 25.6-115.2 57.6-32 32-51.2 76.8-51.2 128 0 25.6 12.8 57.6 12.8 64 6.4 12.8 0 32-12.8 38.4l-121.6 70.4h-12.8zM512 838.4c44.8 0 89.6 19.2 134.4 51.2 12.8 12.8 25.6 19.2 32 32l83.2-44.8c-6.4-19.2-6.4-38.4-6.4-64 0-64 25.6-121.6 70.4-166.4 38.4-38.4 83.2-64 134.4-70.4V512c0-19.2 0-44.8-6.4-57.6-51.2-6.4-96-32-134.4-70.4-44.8-44.8-70.4-108.8-70.4-166.4 0-25.6 6.4-44.8 6.4-64l-76.8-44.8c-12.8 12.8-25.6 19.2-32 25.6-96 64-172.8 64-268.8 0l-32-32-83.2 44.8c6.4 19.2 6.4 38.4 6.4 64 0 64-25.6 121.6-70.4 166.4-38.4 38.4-83.2 64-134.4 70.4v64c0 19.2 0 44.8 6.4 64 51.2 6.4 96 32 134.4 70.4 44.8 44.8 70.4 108.8 70.4 166.4 0 25.6-6.4 44.8-6.4 64l76.8 44.8c6.4-6.4 19.2-19.2 32-25.6 44.8-38.4 89.6-57.6 134.4-57.6z m473.6-236.8z"
              fill="#bfbfbf"
              p-id="20450"
            ></path>
            <path
              d="M512 691.2c-96 0-179.2-83.2-179.2-179.2S416 332.8 512 332.8c96 0 179.2 83.2 179.2 179.2S608 691.2 512 691.2z m0-294.4C448 396.8 396.8 448 396.8 512S448 627.2 512 627.2 627.2 576 627.2 512 576 396.8 512 396.8z"
              fill="#bfbfbf"
              p-id="20451"
            ></path>
          </svg>
          系统管理
        </NavLink>
      </div>
      <div className={style.rightItem}>
        <div className={style.username}>
          <div className={style.title}>{title}</div>
          <div className={style.usernameContainer}>
            <div className={style.usernameInfo}>
              {" "}
              {username} |{" "}
              <div
                onClick={() => {
                  localStorage.removeItem("token")
                  navigate("/login")
                }}
              >
                退出
              </div>
            </div>
            <div className={style.curTitle}>
              {currentPages.map((item) => (
                <div
                  className={style.currentPage}
                  key={item.path}
                  onClick={() => navigate(item.path)}
                >
                  <div>{item.title}</div>
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      setCurrentPages(
                        currentPages.filter((page) => page.path !== item.path)
                      )
                    }}
                  >
                    x
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={style.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home
