import dotenv from "dotenv"
import { app } from "./app.js" 
import connectDB from "./db/index.js"

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 8080

connectDB()
 .then(() => {
      app.listen(port, () => {
        console.log(`Server Started on Port: ${port}`)
      })
 })
 .catch(() => {
     console.log("mongodb connection error!!")
 })
