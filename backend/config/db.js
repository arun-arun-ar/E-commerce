//importing mongoose
import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        //creating databbase and connecting it
       const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected succesfully");
        
    } catch(error) {
        //throw errors if it arise during database connection
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}


//export database
export default connectDB;