import React from 'react';
import '../assets/styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <h2>Stock Market Price Forecasting</h2>
            <div className="navbar-center">
                <div className="market-info">
                    <span className="market-name">NIFTY 50</span>
                    <span className="market-value">23777.65</span>
                    <span className="market-change">-25.80 (-0.11%)</span>
                </div>
                <div className="market-info">
                    <span className="market-name">SENSEX</span>
                    <span className="market-value">78472.87</span>
                    <span className="market-change">-67.30 (-0.09%)</span>
                </div>
            </div>
            <div className="navbar-right">
                <ul className="menu">
                    <li>Dashboard</li>
                    <li>Orders</li>
                    <li>Holdings</li>
                    <li>Positions</li>
                    <li>Bids</li>
                    <li>Funds</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
