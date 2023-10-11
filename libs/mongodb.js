import mongoose from "mongoose";

const connectMongoDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to mongodb ")
    } catch (error) {
         throw error
    }
}

export default connectMongoDB;