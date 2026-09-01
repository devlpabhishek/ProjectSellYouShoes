import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust paths based on your folder structure
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';

function App() {
  return (
  <BrowserRouter>
            {/* The Navbar sits outside the Routes so it appears on every page */}
            <Navbar />
            
            {/* The Routes determine which component to show based on the URL */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
  );
}

export default App;
