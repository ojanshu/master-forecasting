import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/domains" element={<Domains />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App