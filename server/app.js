require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router=require("./routes/AdminRoutes")
const connectDb = require("./config/dbconnection");
const PORT = process.env.PORT;
const app = express();
//connect to database:
connectDb()
//connect the backend with frontend:
app.use(express.json())
app.use(
  cors({
    origin: ["http/localhost:4000", "https://mern-crud-app-o7or.vercel.app/"],
    methods: ["POST", "GET"],
    credentials:true
  })
);
//routes:
app.use(router)


//lunch the server:
app.listen(PORT, () => {
  console.log(`The server is running on the port ${PORT}`);
});
