import React from 'react';
import {Outlet, Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/auth/authSlice';

function UserLayout() {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser()).then((data) => {
      if(data?.payload?.success){
        alert(data?.payload?.message)
      }
    })
  }

  return (
    <div style={{minHeight: "100%", width: "100%"}}>
                <div style={{height: "12%", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "black"}}>
                        <ul style={{display: "flex", alignItems: "center", gap: "12px", listStyleType: "none"}}>
                              <li><Link style={{textDecoration: "none", border: "2px solid white", borderRadius: "7px", backgroundColor: "white", color: "black", padding: "4px", fontWeight: "bold"}} to="/user/home">User..{user?.userName}</Link></li>
                              <li><Link style={{textDecoration: "none", border: "2px solid white", borderRadius: "7px", backgroundColor: "white", color: "black", padding: "4px", fontWeight: "bold"}} to="/user/home">Home</Link></li>
                              <li><Link style={{textDecoration: "none", border: "2px solid white", borderRadius: "7px", backgroundColor: "white", color: "black", padding: "4px", fontWeight: "bold"}} to="/user/features">Features</Link></li>
                        </ul>
                        <button style={{border: "2px solid white", borderRadius: "7px", backgroundColor: "white", color: "black", padding: "4px", fontWeight: "bold",  pointer: "cursor"}} onClick={handleLogout}>Logout</button>
                        
                </div>
                <div style={{marginTop: "10px", height: "80%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Outlet/>
                </div>
    </div>
  )
}

export default UserLayout
