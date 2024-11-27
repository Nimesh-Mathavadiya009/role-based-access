import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"

const connectDB = async () => {
  try {
      const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`)
      console.log("connection : ", connectionInstance.connection.host)
  } catch (error) {
    console.log("mongodb :: connection :: error")
    process.exit(1)
  }
}

export default connectDB