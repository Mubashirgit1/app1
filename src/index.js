import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { About, Contact,App,History } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/about" element={<About />}>
        <Route path='history' element={<History/>} />
      </Route>
    </Routes>,
   
 </BrowserRouter>
);

