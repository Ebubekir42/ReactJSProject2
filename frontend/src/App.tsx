import React from 'react';

import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Product2 from './pages/Product2';
import Product3 from './pages/Product3ModalCenter';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/products" />} />
      <Route path='/products' element={<Product />} />
      <Route path='/products2' element={<Product2/>} />
      <Route path='/products3' element={<Product3/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
