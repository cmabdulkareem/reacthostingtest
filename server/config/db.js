import mongoose from "mongoose";

mongoose.connect("mongodb+srv://kareemchala:Kareem262201@sample.kvxwkea.mongodb.net/cdcinsights")
    .then(()=>{console.log("connected to db")})
    .catch((err)=>{console.log("mongodb connection error", err)})