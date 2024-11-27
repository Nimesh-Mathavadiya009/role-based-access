import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    user: null,
    isAuthenticated: false
}


export const registerUser = createAsyncThunk("/auth/register", async (userData) => {
    try {
       const response = await axios.post("/api/v1/users/register", userData, {
        withCredentials: true
       })
       return response.data
    } catch (error) {
        console.log(error)
        return {}
    }
})

export const loginUser = createAsyncThunk("/auth/login", async (userData) => {
    try {
        const response = await axios.post("/api/v1/users/login", userData, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log(error)
        return {}
    }
})

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
    try {
        await axios.post("/api/v1/users/logout", {
            withCredentials: true
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
})

export const checkAuthUser = createAsyncThunk("/auth/check-auth", async () => {
        try {
            const response = await axios.get("/api/v1/users/check-auth", {
                withCredentials: true,
                headers: {
                    "Cache-Control" : "no-cache, no-store, must-revalidate, proxy-revalidate",
                    Expires: '0'
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
            return {}
        }
}) 

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true
            state.user = null
            state.isAuthenticated = false
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        }).addCase(loginUser.pending, (state, action) => {
            state.isLoading = true
            state.user = null
            state.isAuthenticated = false
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.success ? action.payload.data.user : null
            state.isAuthenticated = action.payload.success ? true : false
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        }).addCase(checkAuthUser.pending, (state, action) => {
            state.isLoading = true
            state.user = null
            state.isAuthenticated = false
        }).addCase(checkAuthUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.success ? action.payload.user : null
            state.isAuthenticated = action.payload.success ? true : false
        }).addCase(checkAuthUser.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        })
    }
})

export default authSlice.reducer