import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Products() {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [sortOrder, setSortOrder] = useState("asc")





  useEffect(()=>{
    axios.get("http://localhost:3000/products")
      .then((res)=>{
        setProducts(res.data.message)
      })
      .catch((err)=>{
        console.log(err)
      })
  }, [])

  useEffect(()=>{
    if(searchQuery.length > 0){
      const filteredSuggestions = products
          .filter((product)=>product.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((product)=> product.itemName)
      setSuggestions([...new Set(filteredSuggestions)])
    }else{
      setSuggestions([])
    }
  }, [searchQuery, products])


  const filteredProducts = products.filter((product)=> product.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
  
  .sort((a,b)=> {
    if (sortOrder === "asc"){
      return a.itemPrice - b.itemPrice;
    }else{
      return b.itemPrice - a.itemPrice
    }
  })


  const handleDeleteItem = (id)=>{
    if(window.confirm("Are you sure to delete this item?"))
    {
      axios.delete(`http://localhost:3000/delete-product/${id}`)
        .then((res)=>{
          setProducts(products.filter(product => product._id !== id))
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">

<div className="col-6">
    <input type="text" name="" className='form-control mb-2' id="" placeholder='Search for products' 
    onChange={(e)=>setSearchQuery(e.target.value)} 
    value={searchQuery}
    />

    {suggestions.length > 0 && (
      <ul className='list-group position-absolute w-100'>
      
      {suggestions.map((suggestion, index)=> (
        <li key={index}>{suggestion}</li>
      ))}
      
      </ul> )}
</div>
<div className="col-6">
      <select className='form-select mt-2' onChange={(e)=>setSortOrder(e.target.value)} name="" id="" value={sortOrder}>
        <option value="asc">Sort By Price : High to Low</option>
        <option value="desc">Sort By Price : Low to High</option>
      </select>
</div>
          

        {filteredProducts.length > 0 ? filteredProducts.map((product, index)=>(
          <div key={index} className="card mt-4" style={{width: "18rem"}} >
            <img src={`http://localhost:3000/images/product-images/${product._id}.jpg`} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{product.itemName}</h5>
              <p className="card-text">{product.itemDesc}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Price : {product.itemPrice}</li>
            </ul>
            <div className="card-body">
              <button className="btn btn-primary" onClick={()=>{handleViewItem(product._id)}}>View</button>
              <button className='btn btn-danger' onClick={()=>{handleDeleteItem(product._id)}}>Delete</button>
            </div>
          </div>
        )):(
          <div>
            <h3>No items found</h3>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default Products
