import mongoose from "mongoose";

mongoose.connect("mongodb+srv://cadd:cadd123@sample.kvxwkea.mongodb.net/reactdb")
    .then(()=>{console.log("connected to db")})
    .catch((err)=>{console.log("mongodb connection error", err)})