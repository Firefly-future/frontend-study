import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/login/Login"
import Coming from "./components/come/Coming"
import Control from "./components/control/Control"
import Loop from "./components/loop/Loop"
import Group from "./components/group/Group"
import Home from "./components/home/Home"
import MoneyCon from "./components/moneyControl/MoneyCon"
import User from "./components/user/User"
import Auth from "./utils/Auth"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Auth />}>
      <Route path="/home" element={<Home />}>
        <Route path="moneyCon" element={<MoneyCon />}>
          <Route path="group" element={<Group />} />
          <Route path="loop" element={<Loop />} />
          <Route path="coming" element={<Coming />} />
        </Route>
        <Route path="control" element={<Control />}>
          <Route path="user" element={<User />} />
        </Route>
      </Route>
      </Route>
      <Route path="*" element={<Navigate to="/home/moneyCon/group" />} />
    </Routes>
  )
}

export default App
