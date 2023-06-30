import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Home.css"
export default function Home() {

  return (
    <div className='home'>
        <h1>Home</h1>
        <div className='column'>
            <Link to="/addProduct">Add Product</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/usersPage">Users Page</Link>
        </div>
    </div>
  )
}
