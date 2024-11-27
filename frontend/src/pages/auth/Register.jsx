import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import Form from '../../components/common/Form'
import { registerFormControls } from '../../components/config'
import { registerUser } from '../../store/auth/authSlice'

const initialState = {
  userName: "",
  fullName: "",
  email: "",
  password: "",
  role: ""
}

function AuthRegister() {

  const [formData, setFormData] = useState(initialState)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function onSubmit(event){
    event.preventDefault()
    dispatch(registerUser(formData)).then((data)=> {
      if(data?.payload?.success){ 
        alert(data?.payload?.message)  
        navigate("/auth/login")
      }
      else{
        setFormData(initialState)
      }
    })
  }

  return (
    <div style={{width: "250px", padding: "4px", backgroundColor: "whitesmoke", border: "2px solid black"}}>
        <div style={{marginTop: "2px", marginBottom: "2px"}}>
             <Link to="/auth/login" style={{textDecoration: "none"}}>Already have an Account? Sign In?</Link>  
        </div>
        <Form formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonNext={"Sign Up"}
        />
    </div>
  )
}

export default AuthRegister
