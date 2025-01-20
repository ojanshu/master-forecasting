import React from 'react'
import Navbar from "../components/Navbar"
import Sidebar from '../components/Sidebar'
import StockChart from '../components/StockChart'
import {useState,createContext} from 'react';
export const StockValue = createContext();


const Home = () => {
  const [stock,updateStock] = useState('BHARTIARTL.NS')
  return (
    <div>
      <StockValue.Provider value={{stock,updateStock}}>
        <Navbar />
        <Sidebar />
        <StockChart />
      </StockValue.Provider>
      
        
    </div>
  )
}

export default Home