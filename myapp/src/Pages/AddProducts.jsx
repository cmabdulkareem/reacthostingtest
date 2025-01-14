import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function AddProducts() {

    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState(0)
    const [image, setImage] = useState(null)

    function handleSubmit(e){
        e.preventDefault()

        const formData = new FormData()
        formData.append('itemName', itemName)
        formData.append('itemDesc', itemDesc)
        formData.append('itemPrice', itemPrice)
        if(image){
            formData.append('itemImage', image)
        }

        axios.post('http://localhost:3000/addProducts', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then((res)=>{
                toast.success(res.data.message)
                setItemName("");
                setItemDesc("")
                setItemPrice(0)
                setImage(null)
            })
            .catch((err)=>{
                toast.error(err.response.data.error)
            })
    }


    return (
        <div>
            <div className="container">
                <div className="row">
                    <ToastContainer position="top-center"/>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="itemName" className="form-label">Item Name</label>
                    <input type="text" className="form-control" onChange={(e)=>setItemName(e.target.value)} value={itemName} id="itemName" placeholder='enter item name'  />
                </div>
                <div className="mb-3">
                    <label htmlFor="ItemDesc" className="form-label">Item Description</label>
                    <input type="text" className="form-control" onChange={(e)=>setItemDesc(e.target.value)} value={itemDesc}  id="ItemDesc" placeholder='enter item description'  />
                </div>
                <div className="mb-3">
                    <label htmlFor="itemPrice" className="form-label">Item Price</label>
                    <input type="number" className="form-control" onChange={(e)=>setItemPrice(e.target.value)} value={itemPrice}  id="itemPrice" placeholder='enter item price'  />
                </div>

                <div className="mb-3">
                    <label htmlFor="itemImage" className="form-label">Item Image</label>
                    <input type="file" className="form-control" id="itemImage" name='itemImage' onChange={(e)=>setImage(e.target.files[0])}  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
                </div>
            </div>
        </div>
    )
}

export default AddProducts
