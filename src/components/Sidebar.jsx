import React from 'react';
import '../assets/styles/Sidebar.css';
import { useContext } from 'react';
import {StockValue} from '../pages/Home'
const Sidebar = () => {
    const {stock,updateStock}=useContext(StockValue);
    const data = [
        { name: 'BHARTIARTL.NS' },
        { name: 'GOOG' },
        { name: 'HDFCBANK' },
        { name: 'HINDUNILVR.NS' },
        { name: 'IBN' },
        { name: 'INFY' },
        { name: 'ITC.NS' },
        { name: 'RELIANCE.NS' },
        { name: 'SBIN.NS' },
        { name: 'TCS.NS' }
    ];
    const handleClick=(e)=>{
        updateStock(e.target.id);
    }
    return (
        <div className="sidebar">
            <div className="search-bar">
                <input type="text" placeholder="Search eg: infy bse, nifty fut, etc" />
                <span className="counter">10/100</span>
            </div>
            <div className="stocks-list">
                {data.map((item, index) => (
                    <div className={`stock-item ${item.isPositive ? 'positive' : 'negative'}`} key={index} onClick={handleClick} id={item.name}>
                        <span className="stock-name" id={item.name}>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
