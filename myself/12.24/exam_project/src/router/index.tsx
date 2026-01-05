import Login from "../pages/login/Login"
import Home from "@/pages/home/Home"
import DashBoard from "@/pages/system/components/dashboard/DashBoard"
import RoleList from "@/pages/system/components/role/RoleList"
import UserList from "@/pages/system/components/users/UserList"
import UserInfo from "@/pages/system/components/user/UserInfo"
import Permission from "@/pages/system/components/permission/Permission"

import NotFound from "@/pages/404/NotFound"

import Welcome from "@/pages/welcome/Welcome"
import Class from "@/pages/class/Class"
import Exercise from "@/pages/exercise/Exercise"
import Question from "@/pages/question/Question"
import System from "@/pages/system/System"
import Test from "@/pages/test/Test"

import ExerciseBank from "@/pages/exercise/components/bankExercise/ExerciseBank"
import CreateExercise from "@/pages/exercise/components/createExercise/CreateExercise"

import CreateTest from "@/pages/test/components/createTest/CreateTest"
import HistoryTest from "@/pages/test/components/historyTest/HistoryTest"

import AddQuestion from "@/pages/question/components/addQuestion/AddQuestion"
import BankQuestion from "@/pages/question/components/bankQuestion/BankQuestion"
import CreateCourse from "@/pages/question/components/courseCreate/Creatcourse"

import ClassList from "@/pages/class/conponents/classList/ClassList"
import DelClass from "@/pages/class/conponents/delClass/DelClass"
import EditStudent from "@/pages/class/conponents/editStudent/EditStudent"
import StudentList from "@/pages/class/conponents/studentList/StudentList"

import Auth from "./Auth"

const router = [
  {
    path: "/",
    element: (
      <Auth>
      <Home />
      </Auth>
    ),
    children: [
      { path: "/", element: <Welcome /> },
      {
        path: "/system",
        element: <System />,
        children: [
          { path: "/system/dashboard", element: <DashBoard /> },
          { path: "/system/role", element: <RoleList /> },
          { path: "/system/users", element: <UserList /> },
          { path: "/system/userinfo", element: <UserInfo /> },
          { path: "/system/permission", element: <Permission /> },
        ],
      },
      {
        path: "/exercise",
        element: <Exercise />,
        children: [
          { path: "/exercise/bank", element: <ExerciseBank /> },
          { path: "/exercise/create", element: <CreateExercise /> },
        ],
      },
      {
        path: "/test",
        element: <Test />,
        children: [
          { path: "/test/create", element: <CreateTest /> },
          { path: "/test/history", element: <HistoryTest /> },
        ],
      },
      {
        path: "/question",
        element: <Question />,
        children: [
          { path: "/question/add", element: <AddQuestion /> },
          { path: "/question/bank", element: <BankQuestion /> },
          { path: "/question/create", element: <CreateCourse /> },
        ],
      },
      {
        path: "/class",
        element: <Class />,
        children: [
          { path: "/class/list", element: <ClassList /> },
          { path: "/class/student", element: <StudentList /> },
          { path: "/class/del", element: <DelClass /> },
          { path: "/class/edit", element: <EditStudent /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]

export default router
