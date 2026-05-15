import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, CreditCard, Smartphone, Package,
    CheckCircle, ChevronRight, MapPin, Phone, User, Mail
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUserAuth } from '../context/UserAuthContext';
import { useStore } from '../context/StoreContext';

const PAYMENT_METHODS = [
    {
        id: 'esewa',
        name: 'eSewa',
        icon: '🟢',
        description: 'Pay via eSewa digital wallet',
        color: '#60BB46',
    },
    {
        id: 'khalti',
        name: 'Khalti',
        icon: '🟣',
        description: 'Pay via Khalti digital wallet',
        color: '#5C2D91',
    },
    {
        id: 'cod',
        name: 'Cash on Delivery',
        icon: '💵',
        description: 'Pay when you receive your order',
        color: '#FFD700',
    },
];

const STEPS = ['Details', 'Payment', 'Confirm'];

const PaymentModal = ({ isOpen, onClose, selectedItemIds = [] }) => {
    const { cart, removeMultipleFromCart } = useCart();
    const { consumerUser } = useUserAuth();
    const { addOrder } = useStore();

    const checkoutCart = cart.filter(item => selectedItemIds.includes(item.id));
    const checkoutTotal = checkoutCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const [step, setStep] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSandbox, setIsSandbox] = useState(false);
    const [orderId, setOrderId] = useState('');

    const [form, setForm] = useState({
        name: consumerUser?.name || '',
        email: consumerUser?.email || '',
        phone: '',
        address: '',
        city: 'Itahari',
    });

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const isFormValid = form.name && form.email && form.phone && form.address;

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        await new Promise(r => setTimeout(r, 1800));

        const newOrderId = `ORD-${Date.now().toString().slice(-4)}`;
        const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        const newOrder = {
            id: newOrderId,
            customer: form.name,
            email: form.email,
            phone: form.phone,
            address: `${form.address}, ${form.city}`,
            date: today,
            amount: checkoutTotal,
            status: 'Pending',
            method: PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name || selectedMethod,
            items: checkoutCart.map(item => ({ name: item.name, qty: item.quantity, price: item.price })),
        };

        addOrder(newOrder);
        removeMultipleFromCart(selectedItemIds);
        setOrderId(newOrderId);
        setIsProcessing(false);
        setIsSuccess(true);
    };

    const handleClose = () => {
        setStep(0);
        setSelectedMethod(null);
        setIsSuccess(false);
        setIsSandbox(false);
        setIsProcessing(false);
        setOrderId('');
        setForm({ name: consumerUser?.name || '', email: consumerUser?.email || '', phone: '', address: '', city: 'Itahari' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="pay-overlay" onClick={!isProcessing ? handleClose : undefined}>
                <motion.div
                    className="pay-modal"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="pay-header">
                        <div className="pay-title">
                            <CreditCard size={22} />
                            <h3 className="font-lexend">CHECKOUT</h3>
                        </div>
                        {!isProcessing && !isSuccess && (
                            <button className="pay-close" onClick={handleClose}><X size={20} /></button>
                        )}
                    </div>

                    {/* Steps */}
                    {!isSuccess && (
                        <div className="pay-steps">
                            {STEPS.map((s, i) => (
                                <React.Fragment key={s}>
                                    <div className={`pay-step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                                        <div className="pay-step-num">{i < step ? '✓' : i + 1}</div>
                                        <span>{s}</span>
                                    </div>
                                    {i < STEPS.length - 1 && <div className={`pay-step-line ${i < step ? 'done' : ''}`} />}
                                </React.Fragment>
                            ))}
                        </div>
                    )}

                    {/* Success State */}
                    {isSuccess ? (
                        <motion.div
                            className="pay-success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="success-icon">
                                <CheckCircle size={56} />
                            </div>
                            <h2>Order Placed!</h2>
                            <p>Thank you, <strong>{form.name}</strong>! Your order has been confirmed.</p>
                            <div className="success-order-id">
                                Order ID: <strong>{orderId}</strong>
                            </div>
                            <div className="success-detail">
                                <span>Payment via {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}</span>
                                <span className="success-amount">NRP {checkoutTotal.toLocaleString()}</span>
                            </div>
                            <p className="success-note">We'll deliver to <strong>{form.address}, {form.city}</strong> within 24 hours.</p>
                            <button className="ul-submit-btn" style={{ marginTop: '1.5rem' }} onClick={handleClose}>
                                Continue Shopping
                            </button>
                        </motion.div>
                    ) : (
                        <div className="pay-body">
                            {/* Step 0: Delivery Details */}
                            {step === 0 && (
                                <motion.div
                                    className="pay-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <h4>Delivery Details</h4>
                                    <div className="pay-field">
                                        <label><User size={14} /> Full Name</label>
                                        <input name="name" value={form.name} onChange={handleFormChange} placeholder="Your full name" required />
                                    </div>
                                    <div className="pay-field">
                                        <label><Mail size={14} /> Email</label>
                                        <input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="your@email.com" required />
                                    </div>
                                    <div className="pay-field">
                                        <label><Phone size={14} /> Phone Number</label>
                                        <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="98XXXXXXXX" required />
                                    </div>
                                    <div className="pay-field">
                                        <label><MapPin size={14} /> Delivery Address</label>
                                        <input name="address" value={form.address} onChange={handleFormChange} placeholder="Street / Area / Landmark" required />
                                    </div>
                                    <div className="pay-field">
                                        <label><MapPin size={14} /> City</label>
                                        <select name="city" value={form.city} onChange={handleFormChange}>
                                            <option>Itahari</option>
                                            <option>Biratnagar</option>
                                            <option>Dharan</option>
                                            <option>Kathmandu</option>
                                            <option>Pokhara</option>
                                        </select>
                                    </div>
                                    <button
                                        className="pay-next-btn"
                                        disabled={!isFormValid}
                                        onClick={() => setStep(1)}
                                    >
                                        Continue to Payment <ChevronRight size={18} />
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 1: Payment Method */}
                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <h4>Select Payment Method</h4>
                                    <div className="pay-methods">
                                        {PAYMENT_METHODS.map(method => (
                                            <button
                                                key={method.id}
                                                className={`pay-method-card ${selectedMethod === method.id ? 'selected' : ''}`}
                                                onClick={() => setSelectedMethod(method.id)}
                                                style={{ '--method-color': method.color }}
                                            >
                                                <span className="method-icon">{method.icon}</span>
                                                <div className="method-info">
                                                    <strong>{method.name}</strong>
                                                    <p>{method.description}</p>
                                                </div>
                                                <div className={`method-radio ${selectedMethod === method.id ? 'checked' : ''}`} />
                                            </button>
                                        ))}
                                    </div>

                                    {selectedMethod === 'esewa' && (
                                        <motion.div className="pay-wallet-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <p>🟢 eSewa ID: <strong>9800000000</strong></p>
                                            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.3rem' }}>
                                                (Simulated — In production, redirects to eSewa gateway)
                                            </p>
                                        </motion.div>
                                    )}
                                    {selectedMethod === 'khalti' && (
                                        <motion.div className="pay-wallet-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <p>🟣 Khalti ID: <strong>9800000001</strong></p>
                                            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.3rem' }}>
                                                (Simulated — In production, redirects to Khalti gateway)
                                            </p>
                                        </motion.div>
                                    )}

                                    <div className="pay-nav-btns">
                                        <button className="pay-back-btn" onClick={() => setStep(0)}>Back</button>
                                        <button
                                            className="pay-next-btn"
                                            disabled={!selectedMethod}
                                            onClick={() => setStep(2)}
                                            style={{ flex: 1 }}
                                        >
                                            Review Order <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Confirm */}
                            {step === 2 && !isSandbox && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <h4>Order Summary</h4>

                                    <div className="pay-summary">
                                        <div className="pay-summary-section">
                                            <span className="pay-summary-label">Delivering to:</span>
                                            <span className="pay-summary-val">{form.name} — {form.address}, {form.city}</span>
                                        </div>
                                        <div className="pay-summary-section">
                                            <span className="pay-summary-label">Payment:</span>
                                            <span className="pay-summary-val">
                                                {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.icon}{' '}
                                                {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pay-items-list">
                                        {checkoutCart.map(item => (
                                            <div key={item.id} className="pay-item-row">
                                                <span>{item.name} × {item.quantity}</span>
                                                <span>NRP {(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        ))}
                                        <div className="pay-item-row pay-total-row">
                                            <strong>Total</strong>
                                            <strong className="pay-total-amt">NRP {checkoutTotal.toLocaleString()}</strong>
                                        </div>
                                    </div>

                                    <div className="pay-nav-btns">
                                        <button className="pay-back-btn" onClick={() => setStep(1)}>Back</button>
                                        <button
                                            className="pay-next-btn pay-place-btn"
                                            onClick={() => {
                                                if (selectedMethod === 'esewa' || selectedMethod === 'khalti') {
                                                    setIsSandbox(true);
                                                } else {
                                                    handlePlaceOrder();
                                                }
                                            }}
                                            disabled={isProcessing}
                                            style={{ flex: 1 }}
                                        >
                                            {isProcessing ? (
                                                <><span className="ul-spinner" /> Processing...</>
                                            ) : (
                                                <>Place Order — NRP {checkoutTotal.toLocaleString()}</>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Sandbox Simulation */}
                            {step === 2 && isSandbox && (
                                <motion.div
                                    className="sandbox-container"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <div className={`sandbox-header ${selectedMethod}`}>
                                        {selectedMethod === 'esewa' ? 'eSewa Sandbox Payment' : 'Khalti Sandbox Payment'}
                                    </div>
                                    <div className="sandbox-body">
                                        <p>Amount: <strong>NRP {checkoutTotal.toLocaleString()}</strong></p>
                                        <div className="pay-field" style={{ marginTop: '1rem' }}>
                                            <label>{selectedMethod === 'esewa' ? 'eSewa ID' : 'Khalti ID'}</label>
                                            <input type="text" placeholder="98XXXXX" defaultValue={selectedMethod === 'esewa' ? "9800000000" : "9800000001"} />
                                        </div>
                                        <div className="pay-field">
                                            <label>PIN / Password</label>
                                            <input type="password" placeholder="****" defaultValue="1234" />
                                        </div>
                                        
                                        <div className="sandbox-actions">
                                            <button className="sandbox-btn cancel" onClick={() => setIsSandbox(false)}>Cancel</button>
                                            <button className={`sandbox-btn pay ${selectedMethod}`} onClick={handlePlaceOrder} disabled={isProcessing}>
                                                {isProcessing ? 'Processing...' : 'Pay Now'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>

            <style>{`
                .pay-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.9);
                    backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 12000;
                    padding: 1rem;
                }

                .pay-modal {
                    width: 100%;
                    max-width: 520px;
                    max-height: 92vh;
                    background: #0d0d10;
                    border: 1px solid rgba(255,215,0,0.12);
                    border-radius: 28px;
                    overflow-y: auto;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.7);
                }

                .pay-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.8rem 2rem 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    position: sticky;
                    top: 0;
                    background: #0d0d10;
                    z-index: 1;
                }

                .pay-title {
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    color: var(--primary, #FFD700);
                }

                .pay-title h3 { font-size: 1.1rem; letter-spacing: 2px; color: #fff; }

                .pay-close {
                    color: rgba(255,255,255,0.4);
                    background: rgba(255,255,255,0.05);
                    border-radius: 8px;
                    padding: 6px;
                    display: flex;
                    transition: 0.2s;
                }
                .pay-close:hover { color: #fff; background: rgba(255,255,255,0.1); }

                .pay-steps {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0;
                    padding: 1.2rem 2rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .pay-step {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.3);
                    font-weight: 500;
                    transition: 0.3s;
                }
                .pay-step.active { color: var(--primary, #FFD700); }
                .pay-step.done { color: rgba(100,255,100,0.7); }

                .pay-step-num {
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    border: 1.5px solid currentColor;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 700;
                    transition: 0.3s;
                    background: transparent;
                }
                .pay-step.active .pay-step-num { background: rgba(255,215,0,0.1); }
                .pay-step.done .pay-step-num { background: rgba(100,255,100,0.1); }

                .pay-step-line {
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                    margin: 0 0.5rem;
                    min-width: 30px;
                    transition: 0.3s;
                }
                .pay-step-line.done { background: rgba(100,255,100,0.4); }

                .pay-body {
                    padding: 1.8rem 2rem 2rem;
                }

                .pay-body h4 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: rgba(255,255,255,0.7);
                    margin-bottom: 1.5rem;
                    letter-spacing: 0.5px;
                }

                .pay-form { display: flex; flex-direction: column; gap: 1rem; }

                .pay-field label {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.45);
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                }

                .pay-field input,
                .pay-field select {
                    width: 100%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.8rem 1rem;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.9rem;
                    outline: none;
                    transition: 0.2s;
                    font-family: inherit;
                }
                .pay-field input:focus,
                .pay-field select:focus {
                    border-color: rgba(255,215,0,0.5);
                    background: rgba(255,215,0,0.03);
                }
                .pay-field input::placeholder { color: rgba(255,255,255,0.2); }
                .pay-field select option { background: #1a1a1a; color: #fff; }

                .pay-methods { display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.2rem; }

                .pay-method-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.2rem;
                    border: 1.5px solid rgba(255,255,255,0.08);
                    border-radius: 14px;
                    background: rgba(255,255,255,0.03);
                    cursor: pointer;
                    transition: 0.25s;
                    text-align: left;
                    width: 100%;
                }
                .pay-method-card:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); }
                .pay-method-card.selected {
                    border-color: var(--method-color, #FFD700);
                    background: rgba(255,215,0,0.04);
                }

                .method-icon { font-size: 1.5rem; flex-shrink: 0; }
                .method-info { flex: 1; }
                .method-info strong { font-size: 0.95rem; display: block; margin-bottom: 0.2rem; }
                .method-info p { font-size: 0.78rem; color: rgba(255,255,255,0.35); }

                .method-radio {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 2px solid rgba(255,255,255,0.2);
                    flex-shrink: 0;
                    transition: 0.2s;
                    position: relative;
                }
                .method-radio.checked {
                    border-color: var(--primary, #FFD700);
                    background: rgba(255,215,0,0.15);
                }
                .method-radio.checked::after {
                    content: '';
                    width: 8px;
                    height: 8px;
                    background: var(--primary, #FFD700);
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .pay-wallet-info {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px;
                    padding: 0.9rem 1.1rem;
                    margin-bottom: 1rem;
                    font-size: 0.88rem;
                    color: rgba(255,255,255,0.6);
                }

                .pay-summary {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    padding: 1rem 1.2rem;
                    margin-bottom: 1rem;
                }

                .pay-summary-section {
                    display: flex;
                    gap: 0.8rem;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    font-size: 0.87rem;
                }
                .pay-summary-section:last-child { border-bottom: none; }
                .pay-summary-label { color: rgba(255,255,255,0.4); min-width: 90px; }
                .pay-summary-val { color: rgba(255,255,255,0.85); }

                .pay-items-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                    margin-bottom: 1.5rem;
                }

                .pay-item-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.88rem;
                    color: rgba(255,255,255,0.55);
                    padding: 0.4rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .pay-total-row {
                    border-bottom: none !important;
                    padding-top: 0.8rem;
                    color: #fff;
                    font-size: 1rem;
                    border-top: 1px solid rgba(255,255,255,0.1) !important;
                }
                .pay-total-amt { color: var(--primary, #FFD700); }

                .pay-next-btn {
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #000;
                    font-weight: 700;
                    font-size: 0.9rem;
                    padding: 0.9rem 1.5rem;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: 0.3s;
                    font-family: inherit;
                    margin-top: 1rem;
                    width: 100%;
                }
                .pay-next-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,215,0,0.3); }
                .pay-next-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .pay-back-btn {
                    background: rgba(255,255,255,0.06);
                    color: rgba(255,255,255,0.6);
                    font-weight: 600;
                    font-size: 0.88rem;
                    padding: 0.9rem 1.2rem;
                    border-radius: 12px;
                    transition: 0.2s;
                    font-family: inherit;
                    margin-top: 1rem;
                }
                .pay-back-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

                .pay-nav-btns { display: flex; gap: 0.8rem; align-items: flex-end; }

                .pay-success {
                    padding: 2.5rem 2rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.8rem;
                }
                .success-icon { color: #4ade80; margin-bottom: 0.5rem; }
                .pay-success h2 { font-size: 1.8rem; }
                .pay-success p { color: rgba(255,255,255,0.55); font-size: 0.93rem; }
                .success-order-id {
                    background: rgba(255,215,0,0.08);
                    border: 1px solid rgba(255,215,0,0.2);
                    border-radius: 10px;
                    padding: 0.7rem 1.5rem;
                    font-size: 0.88rem;
                    color: rgba(255,255,255,0.6);
                }
                .success-order-id strong { color: var(--primary, #FFD700); }
                .success-detail {
                    display: flex;
                    gap: 1.5rem;
                    font-size: 0.88rem;
                    color: rgba(255,255,255,0.5);
                }
                .success-amount { color: var(--primary, #FFD700); font-weight: 700; }
                .success-note { font-size: 0.82rem !important; color: rgba(255,255,255,0.35) !important; }

                .ul-submit-btn {
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #000;
                    font-weight: 700;
                    font-size: 0.95rem;
                    padding: 1rem 2rem;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.6rem;
                    transition: 0.3s;
                    font-family: inherit;
                    width: 100%;
                }
                .ul-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,215,0,0.3); }

                .ul-spinner {
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgba(0,0,0,0.2);
                    border-top-color: #000;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    display: inline-block;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                .sandbox-container {
                    background: #111;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 14px;
                    overflow: hidden;
                    margin-top: 1rem;
                }
                .sandbox-header {
                    padding: 1rem 1.5rem;
                    font-weight: 700;
                    color: #fff;
                    font-size: 1.1rem;
                }
                .sandbox-header.esewa { background: #60BB46; }
                .sandbox-header.khalti { background: #5C2D91; }
                
                .sandbox-body {
                    padding: 1.5rem;
                }
                .sandbox-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                .sandbox-btn {
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    flex: 1;
                    transition: 0.2s;
                }
                .sandbox-btn.cancel {
                    background: rgba(255,255,255,0.05);
                    color: #fff;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .sandbox-btn.pay {
                    color: #fff;
                    border: none;
                }
                .sandbox-btn.pay.esewa { background: #60BB46; }
                .sandbox-btn.pay.khalti { background: #5C2D91; }
                .sandbox-btn:hover { opacity: 0.9; transform: translateY(-1px); }
            `}</style>
        </AnimatePresence>
    );
};

export default PaymentModal;
