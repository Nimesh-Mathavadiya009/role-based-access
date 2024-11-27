import React from 'react'
import {useLocation, Navigate} from "react-router-dom"

function CheckAuth({isAuthenticated, user, children}) {

    const location = useLocation()

         if(!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))){
            return <Navigate to="/auth/login"/>
         }
         
         if(isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))){
            if(user?.role === "admin"){
               return <Navigate to="/admin/dashboard"/>
            }
            else{
               return <Navigate to="/user/home"/>
            }
         }

         if(isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")){
            return <Navigate to="/unAuth"/>
         }

         if(isAuthenticated && user?.role === "admin" && location.pathname.includes("/user")){
            return <Navigate to="/admin/dashboard"/>
         }


  return  <> {children} </>
  
}

export default CheckAuth
