import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MenuCard() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([
    { id: 1, name: 'Pasta', quantity: 1, price: 500 },
    { id: 2, name: 'Coke 1.5L', quantity: 1, price: 140 }
  ]);

  // Sample menu items
  const menuItems = [
    { id: 1, name: 'Pasta', price: 500 },
    { id: 2, name: 'Coke 1.5L', price: 140 },
    { id: 3, name: 'Salad', price: 350 },
    { id: 4, name: 'Pizza', price: 800 },
    { id: 5, name: 'Water 0.5L', price: 50 }
  ];

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== id);
      }
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const goToFeedback = () => {
    navigate('/feedback', { 
      state: { 
        orderItems: cart,
        totalAmount: calculateTotal()
      } 
    });
  };

  return (
    <div className="menu-card">
      <h2>Menu Card</h2>
      <p>this actually should be Wasim page</p>
      
      <div className="menu-container">
        <div className="menu-items">
          <h3>Available Items</h3>
          <ul>
            {menuItems.map(item => (
              <li key={item.id}>
                {item.name} - {item.price} som
                <button onClick={() => addToCart(item)}>+</button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="cart">
          <h3>Your Order</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <ul>
                {cart.map(item => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} x {item.price} som
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                  </li>
                ))}
              </ul>
              <p className="total">Total: {calculateTotal()} som</p>
            </>
          )}
          <button 
            className="confirm-button"
            onClick={goToFeedback}
            disabled={cart.length === 0}
          >
            Confirm Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;