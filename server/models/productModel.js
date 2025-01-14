import mongoose, { mongo, Mongoose } from "mongoose";

const ProductModel = new mongoose.Schema({
    itemName: {type: "String", required: true},
    itemDesc: {type: "String", required: true},
    itemPrice: {type: "Number", required: true}
})

const Product = mongoose.model('Product', ProductModel)

export default Product;
