import { useState } from "react";
import { Routes,Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import Inventory from "./pages/Inventory";
import UsersPage from "./pages/UsersPage";
import Home from './pages/Home';

function App() {
  const [user,SetUserLogin ] = useState(null);
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={user ? ( <Home/> ) : ( <Login SetUserLogin={SetUserLogin}/> )}/>
      <Route path='/addProduct' element={user ? ( <AddProduct/> ) : ( <Login SetUserLogin={SetUserLogin}/> )}/>
      <Route path='/inventory' element={user ? ( <Inventory/> ) : ( <Login SetUserLogin={SetUserLogin}/> )}/>
      <Route path='/usersPage' element={user ? ( <UsersPage/> ) : ( <Login SetUserLogin={SetUserLogin}/> )}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </div>
  );
}

export default App;
