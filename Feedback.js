import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get order data from navigation state or use default
  const [orderItems, setOrderItems] = useState(
    location.state?.orderItems || [
      { name: 'Pasta', quantity: 1, price: 500 },
      { name: 'Coke 1.5L', quantity: 1, price: 140 }
    ]
  );

  const [totalAmount, setTotalAmount] = useState(
    location.state?.totalAmount || 
    orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    navigate('/thank-you');
  };

  const handleCancel = () => {
    if (timeLeft > 0) {
      setShowCancelConfirm(true);
    }
  };

  const confirmCancel = () => {
    navigate('/menu');
  };

  const handleEdit = () => {
    if (timeLeft > 0) {
      navigate('/menu-card', { 
        state: { 
          orderItems: orderItems,
          totalAmount: totalAmount
        } 
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="feedback-section">
      <h2>Payment successful!</h2>
      
      {/* Countdown timer */}
      <div className="countdown-timer">
        <p>Time left to edit or cancel: {formatTime(timeLeft)}</p>
      </div>
      
      {/* Order summary */}
      <div className="order-summary">
        <h3>Your Order:</h3>
        <ul>
          {orderItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} - {item.price} som
            </li>
          ))}
        </ul>
        <p className="total-amount">Total: {totalAmount} som</p>
      </div>
      
      {/* Action buttons - only show if time hasn't expired */}
      {timeLeft > 0 && (
        <div className="action-buttons">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel Order
          </button>
          <button className="edit-button" onClick={handleEdit}>
            Edit Order
          </button>
        </div>
      )}
      
      {/* Cancel confirmation modal */}
      {showCancelConfirm && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to cancel your order?</p>
            <div className="modal-buttons">
              <button onClick={confirmCancel}>OK</button>
              <button onClick={() => setShowCancelConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Feedback section */}
      <p>Rate your order</p>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      
      <div className="input-group">
        <label>Your feedback (max 150 words)</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.value)}
          maxLength="150"
          className={activeInput === 'feedback' ? 'active' : ''}
          onFocus={() => setActiveInput('feedback')}
          onBlur={() => setActiveInput(null)}
        />
        <div className="char-count">{feedback.length}/150</div>
      </div>
      
      <button 
        className="send-button"
        onClick={handleSubmit}
        disabled={!rating}
      >
        Send
      </button>
    </div>
  );
}

export default Feedback;