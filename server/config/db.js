import mongoose from "mongoose";

mongoose.connect("mongodb+srv://cadd:cadd123@<cluster-name>.mongodb.net/reactdb?retryWrites=true&w=majority")
    .then(()=>{console.log("connected to db")})
    .catch((err)=>{console.log("mongodb connection error", err)})