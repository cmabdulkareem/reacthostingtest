import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/reactdb")
    .then(()=>{console.log("connected to db")})
    .catch((err)=>{console.log("mongodb connection error", err)})