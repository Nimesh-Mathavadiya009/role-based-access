import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import {useDispatch} from "react-redux"
import Form from '../../components/common/Form'
import { loginUser } from '../../store/auth/authSlice'
import { loginFormControls } from '../../components/config'

const initialState = {
  email: "",
  password: ""
}

function AuthLogin() {

  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()

  function onSubmit(event){
    event.preventDefault()
    dispatch(loginUser(formData)).then((data) => {
      if(data?.payload?.success){
        alert(data?.payload?.message)
      }
      else{
        setFormData(initialState)
      }
    })
  }

  return (
    <div style={{width: "250px", padding: "4px", backgroundColor: "whitesmoke", border: "2px solid black"}}>
        <div style={{marginTop: "2px", marginBottom: "2px"}}>
             <Link to="/auth/register" style={{textDecoration: "none"}}>Don't have an Account? Sign Up?</Link>  
        </div>
        <Form formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonNext={"Sign In"}
        />
    </div>
  )
}

export default AuthLogin
