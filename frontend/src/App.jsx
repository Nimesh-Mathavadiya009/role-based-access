import './App.css'
import {Route, Routes} from "react-router-dom"
import Features from './pages/user/Features'
import Home from './pages/user/Home'
import UserLayout from "./components/user/Layout"
import AuthLayout from "./components/auth/Layout"
import AuthLogin from "./pages/auth/Login"
import AuthRegister from "./pages/auth/Register"
import AdminLayout from "./components/admin/Layout"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import Index from "./pages/Index"
import UnAuth from "./pages/UnAuth"
import {useDispatch, useSelector} from "react-redux"
import CheckAuth from './components/common/Routes'
import { useEffect } from 'react'
import { checkAuthUser } from './store/auth/authSlice'


function App() {

      const {isLoading, user, isAuthenticated} = useSelector(state => state.auth)

      const dispatch = useDispatch()

      useEffect(() => {
            dispatch(checkAuthUser())
      }, [dispatch])

  return (
      isLoading ? ( <div id="root" style={{backgroundColor: "black", height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: "white"}}>
                        <h1 style={{fontWeight: "bolder"}}>Loading ....</h1>
                  </div> ) :
                  <div id="root" style={{height: "100vh", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden"}}>
                              <Routes>
                                    <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                          <AuthLayout/>
                                    </CheckAuth>}>
                                          <Route path="register" element={<AuthRegister/>} />
                                          <Route path="login" element={<AuthLogin/>}/>
                                    </Route>
                                    <Route path="/user" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                          <UserLayout/>
                                    </CheckAuth>} >
                                          <Route path="home" element={<Home/>} />
                                          <Route path="features" element={<Features/>}/>
                                    </Route>
                                    <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                          <AdminLayout/>
                                    </CheckAuth>}>
                                          <Route path="dashboard" element={<AdminDashboard/>} />
                                          <Route path="products" element={<AdminProducts/>} />
                                    </Route>
                                    <Route path="/" element={<Index/>}/>
                                    <Route path="/unAuth" element={<UnAuth/>} />
                              </Routes>
                  </div>
  )
}

export default App
