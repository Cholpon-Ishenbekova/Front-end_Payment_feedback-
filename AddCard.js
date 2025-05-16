import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCard() {
  const [showCvvTooltip, setShowCvvTooltip] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [cvv, setCvv] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  const navigate = useNavigate();

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleValidUntilChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setValidUntil(value);
  };

  const isCardComplete = cardNumber.replace(/\s/g, '').length === 16 && 
                       validUntil.length === 5 && 
                       cvv.length === 3;

  const handleSubmit = () => {
    navigate('/feedback');
  };

  return (
    <div className="card-payment">
      <div className="back-button" onClick={() => navigate('/payment')}>
        &lt; Add card
      </div>
      
      <div className="input-group">
        <label>Card number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          className={activeInput === 'cardNumber' ? 'active' : ''}
          onFocus={() => setActiveInput('cardNumber')}
          onBlur={() => setActiveInput(null)}
        />
      </div>
      
      <div className="row-inputs">
        <div className="input-group">
          <label>Valid until</label>
          <input
            type="text"
            value={validUntil}
            onChange={handleValidUntilChange}
            placeholder="MM/YY"
            maxLength="5"
            className={activeInput === 'validUntil' ? 'active' : ''}
            onFocus={() => setActiveInput('validUntil')}
            onBlur={() => setActiveInput(null)}
          />
        </div>
        
        <div className="input-group">
          <label>
            CVV 
            <span 
              className="tooltip-icon"
              onMouseEnter={() => setShowCvvTooltip(true)}
              onMouseLeave={() => setShowCvvTooltip(false)}
            >
              ?
            </span>
            {showCvvTooltip && (
              <div className="tooltip">
                Three-digit code on the back of the card
              </div>
            )}
          </label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
            placeholder="123"
            maxLength="3"
            className={activeInput === 'cvv' ? 'active' : ''}
            onFocus={() => setActiveInput('cvv')}
            onBlur={() => setActiveInput(null)}
          />
        </div>
      </div>
      
      <button 
        className={`pay-button ${isCardComplete ? 'active' : ''}`}
        disabled={!isCardComplete}
        onClick={handleSubmit}
      >
        Add card
      </button>
    </div>
  );
}

export default AddCard;