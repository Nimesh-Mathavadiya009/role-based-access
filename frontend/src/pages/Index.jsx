import React from 'react'
import { Link } from 'react-router-dom'

function Index() {
  return (
    <div style={{height: "100%", width: "100%", backgroundColor: "black", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "5px"}}>
        <h1 style={{color: "white", fontWeight: "bolder"}}>Welcome To our Website..❤️</h1>
        <Link style={{textDecoration: "none", color: "white", fontWeight: "bolder", border: "2px solid white", padding: "5px", borderRadius: "10px"}} to="/auth/login">Login Here..👆</Link>
    </div>
  )
}

export default Index 
