const mongoose = require("mongoose")
const {DB_NAME} = require("../constants")


const connectToMongoDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.
              MONGODB_URL}/${DB_NAME}`)
              console.log(`\N MongoDB connected !! DB HOST: 
                 ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("MongoDB connect failed :",error)
        process.exit(1);
    }
}

module.exports = {
    connectToMongoDB
}