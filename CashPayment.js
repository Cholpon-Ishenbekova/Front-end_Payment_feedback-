import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CashPayment() {
  const [needsChange, setNeedsChange] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/feedback');
  };

  return (
    <div className="cash-payment">
      <div className="back-button" onClick={() => navigate('/payment')}>
        &lt; Back
      </div>
      
      <div className="input-group">
        <label>Do you need change?</label>
        <input
          type="text"
          value={needsChange}
          onChange={(e) => setNeedsChange(e.target.value)}
          placeholder="Enter amount if needed"
          className={activeInput === 'change' ? 'active' : ''}
          onFocus={() => setActiveInput('change')}
          onBlur={() => setActiveInput(null)}
        />
      </div>
      
      <button 
        className="pay-button active"
        onClick={handleSubmit}
      >
        Pay
      </button>
    </div>
  );
}

export default CashPayment;