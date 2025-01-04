import React from 'react'

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-bold">
          <a href="/" className="hover:text-blue-500">Zerodha Clone</a>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <a href="/" className="hover:text-blue-500">Dashboard</a>
          <a href="/marketwatch" className="hover:text-blue-500">Marketwatch</a>
          <a href="/orders" className="hover:text-blue-500">Orders</a>
          <a href="/holdings" className="hover:text-blue-500">Holdings</a>
          <a href="/funds" className="hover:text-blue-500">Funds</a>
        </nav>

        {/* Search Bar */}
        <div className="flex-grow mx-6">
          <input
            type="text"
            placeholder="Search stocks..."
            className="w-full p-2 rounded-lg text-black"
          />
        </div>

        {/* Live Market Stats */}
        <div className="flex space-x-6">
          <div className="text-sm">
            <span className="font-bold text-green-400">Nifty 50: +0.65%</span>
          </div>
          <div className="text-sm">
            <span className="font-bold text-red-400">NASDAQ: -0.32%</span>
          </div>
        </div>

        {/* User Profile/Login */}
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Login</button>
          {/* If logged in */}
          {/* 
          <div className="relative">
            <img src="profile-pic-url" alt="Profile" className="w-8 h-8 rounded-full" />
            <div className="absolute right-0 mt-2 bg-white text-black p-4 rounded shadow">
              <a href="/settings" className="block">Profile Settings</a>
              <a href="/logout" className="block mt-2">Logout</a>
            </div>
          </div>
          */}
        </div>
      </div>
    </header>
  )
}

export default Header