import { lazy } from "react"
import { Suspense } from "react"
import { Navigate } from "react-router-dom"

import Home from "@/pages/home/Home"
import Index from "@/pages/index/Index"
import First from "@/pages/index/components/first/First"
import NotFound from "@/pages/404/404"

const Loading = lazy(()=>import("@/components/loading/Loading"))
const Second = lazy(()=>import("@/pages/index/components/second/Second"))
const Third = lazy(()=>import("@/pages/index/components/third/Third"))
const Fourth = lazy(()=>import("@/pages/index/components/fourth/Fourth"))
const Fifth = lazy(()=>import("@/pages/index/components/fifth/Fifth"))
const Sixth = lazy(()=>import("@/pages/index/components/sixth/Sixth"))
const Seventh = lazy(()=>import("@/pages/index/components/seventh/Seventh"))
const Eighth = lazy(()=>import("@/pages/index/components/eighth/Eighth"))
const Ninth = lazy(()=>import("@/pages/index/components/ninth/Ninth"))
const Tenth = lazy(()=>import("@/pages/index/components/tenth/Tenth"))

export default [
  {
    path:'/',
    element:<Home/>
  }
]