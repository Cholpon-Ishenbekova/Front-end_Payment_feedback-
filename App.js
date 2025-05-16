import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentMethod from './pages/PaymentMethod';
import AddCard from './pages/AddCard';
import CashPayment from './pages/CashPayment';
import Feedback from './pages/Feedback';
import ThankYou from './pages/ThankYou';
import Header from './components/Header';
import Menu from './pages/Menu';
import MenuCard from './pages/MenuCard';
import { OrderProvider } from './contexts/OrderContext';

function App() {
  return (
    <OrderProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/payment" element={<PaymentMethod />} />
          <Route path="/add-card" element={<AddCard />} />
          <Route path="/cash" element={<CashPayment />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu-card" element={<MenuCard />} />
        </Routes>
      </div>
      </OrderProvider>
  );
}

export default App;
