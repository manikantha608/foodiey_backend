const express = require("express")
const app = express()
const dotEnv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")
const vendorRoute = require("./routes/vendorRoutes");
const firmRoute = require("./routes/firmRoutes")
const productRoute = require("./routes/productRoutes")
dotEnv.config()
const PORT = process.env.PORT || 5000
const path = require("path")

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI).then(()=> console.log("Database is connected"))
.catch(()=>{console.log("Database is not  connected")})

app.use("/vendor",vendorRoute)
app.use("/firm",firmRoute)
app.use("/product",productRoute)
app.use("/uploads",express.static("uploads"))

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to our foodiey website to start with your own bussiness</h1>")                
})

app.listen(PORT,()=>{
      console.log("Server is running at port 5000")              
})