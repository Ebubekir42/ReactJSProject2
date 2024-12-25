import React from 'react';

import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/products" />} />
      <Route path='/products' element={<Product />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
