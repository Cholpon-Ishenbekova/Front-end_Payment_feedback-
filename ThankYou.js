import React from 'react';
import { useNavigate } from 'react-router-dom';

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="thank-you">
      <h2>Thank you for your feedback!</h2>
      <button 
        className="new-order-button"
        onClick={() => navigate('/payment')}
      >
        Make another order
      </button>
    </div>
  );
}

export default ThankYou;