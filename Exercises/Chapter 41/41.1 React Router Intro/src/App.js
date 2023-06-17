import React from 'react';
import Chips from './Chips';
import Sardines from './Sardines';
import Soda from './Soda';
import VendingMachine from './VendingMachine';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/chips" element={<Chips />} />
          <Route path="/sardines" element={<Sardines />} />
          <Route path="/soda" element={<Soda />} />
          <Route path="/" element={<VendingMachine />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
