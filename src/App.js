import { useEffect, useLayoutEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Account from "./pages/Account"
import Signup from "./pages/Signup"
import { resetAllMessages } from "./features/userSlice"
import { useDispatch } from "react-redux"
import ProtectedRoute from "./components/ProtectedRoute"



function App () {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetAllMessages())
  }, [location])
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/account' element={<ProtectedRoute><Account></Account></ProtectedRoute>}></Route>
      </Routes>
    </div>
  )
}

export default App