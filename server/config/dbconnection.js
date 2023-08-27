const mongoose = require("mongoose")

//connect to mongodb:
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_DATABASE);
        console.log("database connected :", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(`There was an error to connect to database :${error}`)
        process.exit(1)
    }
    
}
module.exports=connectDb
