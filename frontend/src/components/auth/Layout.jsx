import React from 'react'
import {Outlet} from "react-router-dom"

function AuthLayout() {
  return (
    <div style={{minHeight: "100%", width: "100%", display: 'flex'}}>
        <div style={{backgroundColor: "black", color: "white", height: "100%", width: "50%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                   <h1 style={{fontWeight: "bolder"}}>Welcome To our Website.❤️</h1> 
        </div>
        <div style={{height: "100%", width: "50%", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Outlet/>
        </div>
    </div>
  )
}

export default AuthLayout
