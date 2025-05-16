import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentMethod() {
  const navigate = useNavigate();

  return (
    <div className="payment-methods">
      <h2>Choose payment method</h2>
      <div 
        className="method-card" 
        onClick={() => navigate('/add-card')}
      >
        Credit/Debit Card
      </div>
      <div 
        className="method-card" 
        onClick={() => navigate('/cash')}
      >
        Cash
      </div>
    </div>
  );
}

export default PaymentMethod;