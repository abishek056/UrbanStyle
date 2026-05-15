import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useUserAuth } from '../context/UserAuthContext';
import { X, Trash2, Plus, Minus, Lock, ShoppingBag, CheckSquare, Square } from 'lucide-react';
import PaymentModal from './PaymentModal';

const CartDrawer = ({ isOpen, onClose, onSignInClick }) => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const { isConsumerAuthenticated } = useUserAuth();
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // Initialize selectedItems to all items when cart changes (if new items are added)
    useEffect(() => {
        const currentIds = cart.map(item => item.id);
        setSelectedItems(prev => {
            // Keep previously selected that still exist, and add new ones
            const newSelection = currentIds.filter(id => !prev.includes(id));
            const existingSelection = prev.filter(id => currentIds.includes(id));
            return [...existingSelection, ...newSelection];
        });
    }, [cart]);

    if (!isOpen) return null;

    const toggleSelection = (id) => {
        setSelectedItems(prev => 
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const selectedCartItems = cart.filter(item => selectedItems.includes(item.id));
    const selectedTotal = selectedCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (!isConsumerAuthenticated) {
            if (onSignInClick) {
                onSignInClick();
            }
            return;
        }
        if (selectedItems.length === 0) {
            alert('Please select at least one item to checkout.');
            return;
        }
        setIsPaymentOpen(true);
    };

    return (
        <>
            <div className="cart-overlay" onClick={onClose}>
                <div className="cart-drawer glass-card" onClick={(e) => e.stopPropagation()}>
                    <div className="cart-header">
                        <h2 className="font-lexend">Your <span>Bag</span></h2>
                        <button className="close-btn" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="cart-items">
                        {cart.length === 0 ? (
                            <div className="empty-cart">
                                <ShoppingBag size={48} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: '1rem' }} />
                                <p>Your bag is empty.</p>
                                <button className="btn-primary" onClick={() => {
                                    onClose();
                                    const shopEl = document.getElementById('shop');
                                    if (shopEl) {
                                        shopEl.scrollIntoView({ behavior: 'smooth' });
                                        shopEl.classList.add('highlight-section');
                                        setTimeout(() => shopEl.classList.remove('highlight-section'), 2000);
                                    }
                                }}>Keep Shopping</button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className={`cart-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}>
                                    <div className="item-checkbox" onClick={() => toggleSelection(item.id)}>
                                        {selectedItems.includes(item.id) ? (
                                            <CheckSquare size={20} color="#FFD700" />
                                        ) : (
                                            <Square size={20} color="rgba(255,255,255,0.3)" />
                                        )}
                                    </div>
                                    <div className="item-img" onClick={() => toggleSelection(item.id)} style={{cursor: 'pointer'}}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h3 onClick={() => toggleSelection(item.id)} style={{cursor: 'pointer'}}>{item.name}</h3>
                                        <p className="price">NRP {item.price.toLocaleString()}</p>
                                        <div className="qty-controls">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <Minus size={16} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="cart-footer">
                            <div className="total-row">
                                <span>Selected Total:</span>
                                <span className="total-price">NRP {selectedTotal.toLocaleString()}</span>
                            </div>

                            {!isConsumerAuthenticated && (
                                <div className="login-gate-notice">
                                    <Lock size={14} />
                                    <span>Sign in to checkout</span>
                                </div>
                            )}

                            <button
                                className={`checkout-btn btn-primary ${!isConsumerAuthenticated ? 'locked' : ''}`}
                                onClick={handleCheckout}
                                disabled={selectedItems.length === 0}
                                style={{ opacity: selectedItems.length === 0 ? 0.5 : 1 }}
                            >
                                {isConsumerAuthenticated ? (
                                    selectedItems.length > 0 ? `Checkout (${selectedItems.length} items)` : 'Select items to checkout'
                                ) : (
                                    <><Lock size={16} /> Sign In to Checkout</>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                <style>{`
          .cart-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            z-index: 2000;
            display: flex;
            justify-content: flex-end;
          }

          .cart-drawer {
            width: 100%;
            max-width: 450px;
            height: 100%;
            background: var(--bg-dark);
            border-left: 1px solid var(--glass-border);
            display: flex;
            flex-direction: column;
            animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }

          .cart-header {
            padding: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--glass-border);
          }

          .cart-header h2 span {
            color: var(--primary);
          }

          .close-btn {
            color: var(--text-light);
          }

          .cart-items {
            flex: 1;
            overflow-y: auto;
            padding: 2rem;
          }

          .empty-cart {
            text-align: center;
            margin-top: 4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .empty-cart p {
            color: var(--text-muted);
            margin-bottom: 2rem;
          }

          .cart-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--glass-border);
            position: relative;
            transition: 0.2s;
          }

          .cart-item:not(.selected) {
            opacity: 0.6;
          }

          .item-checkbox {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .item-img {
            width: 80px;
            height: 80px;
            border-radius: 8px;
            overflow: hidden;
            background: var(--bg-dark-soft);
            flex-shrink: 0;
          }

          .item-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .item-details h3 {
            font-size: 1rem;
            margin-bottom: 0.3rem;
          }

          .item-details .price {
            color: var(--primary);
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .qty-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: var(--bg-dark-soft);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            width: fit-content;
          }

          .qty-controls button {
            color: var(--text-light);
          }

          .qty-controls span {
            font-weight: 600;
          }

          .remove-btn {
            position: absolute;
            top: 0;
            right: 0;
            color: #ff4d4d;
          }

          .cart-footer {
            padding: 2rem;
            background: var(--bg-dark-soft);
            border-top: 1px solid var(--glass-border);
          }

          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            font-size: 1.2rem;
            font-weight: 700;
          }

          .total-price {
            color: var(--primary);
          }

          .login-gate-notice {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 165, 0, 0.08);
            border: 1px solid rgba(255, 165, 0, 0.2);
            color: rgba(255, 165, 0, 0.8);
            font-size: 0.82rem;
            padding: 0.6rem 1rem;
            border-radius: 10px;
            margin-bottom: 1rem;
          }

          .checkout-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 0.5rem;
            background: var(--primary);
            color: #000;
            font-weight: 700;
            border-radius: 8px;
            padding: 1rem;
            font-size: 1rem;
            transition: 0.3s;
          }

          .checkout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
          }
        `}</style>
            </div>

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => { setIsPaymentOpen(false); onClose(); }}
                selectedItemIds={selectedItems}
            />
        </>
    );
};

export default CartDrawer;
