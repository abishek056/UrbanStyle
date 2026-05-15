import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, X, ShoppingBag, User } from 'lucide-react';
import { useUserAuth } from '../context/UserAuthContext';

const UserLogin = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userLogin } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        await new Promise(r => setTimeout(r, 600));
        if (userLogin(email, password)) {
            onClose();
            setEmail('');
            setPassword('');
        } else {
            setError('Invalid email or password. Please try again.');
        }
        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="user-login-overlay" onClick={onClose}>
                <motion.div
                    className="user-login-modal"
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="ul-close-btn" onClick={onClose}><X size={20} /></button>

                    <div className="ul-header">
                        <div className="ul-icon">
                            <ShoppingBag size={32} />
                        </div>
                        <h2 className="font-lexend">SIGN <span>IN</span></h2>
                        <p>Access your Urban Style account to shop & checkout</p>
                    </div>

                    <form onSubmit={handleSubmit} className="ul-form">
                        <div className="ul-input-group">
                            <label><Mail size={15} /> Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                placeholder="user@gmail.com"
                                required
                            />
                        </div>

                        <div className="ul-input-group">
                            <label><Lock size={15} /> Password</label>
                            <div className="ul-password-wrap">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="ul-toggle-pw"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                className="ul-error"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            className="ul-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="ul-spinner" />
                            ) : (
                                <>
                                    <User size={18} /> Sign In to Shop
                                </>
                            )}
                        </button>

                        <div className="ul-demo-hint">
                            <span>Demo:</span> user@gmail.com / user
                        </div>
                    </form>
                </motion.div>
            </div>

            <style>{`
                .user-login-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.88);
                    backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 1.5rem;
                }

                .user-login-modal {
                    width: 100%;
                    max-width: 420px;
                    background: #0f0f13;
                    border: 1px solid rgba(255,215,0,0.15);
                    border-radius: 28px;
                    padding: 3rem 2.2rem;
                    position: relative;
                    box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,215,0,0.05);
                }

                .ul-close-btn {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    color: rgba(255,255,255,0.4);
                    transition: 0.2s;
                    background: rgba(255,255,255,0.05);
                    border-radius: 8px;
                    padding: 6px;
                    display: flex;
                }
                .ul-close-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }

                .ul-header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }

                .ul-icon {
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.05));
                    color: var(--primary, #FFD700);
                    border-radius: 22px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    border: 1px solid rgba(255,215,0,0.2);
                }

                .ul-header h2 { font-size: 1.8rem; letter-spacing: 2px; }
                .ul-header h2 span { color: var(--primary, #FFD700); }
                .ul-header p { color: rgba(255,255,255,0.45); font-size: 0.88rem; margin-top: 0.5rem; line-height: 1.5; }

                .ul-form { display: flex; flex-direction: column; gap: 1.2rem; }

                .ul-input-group label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.82rem;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 0.6rem;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }

                .ul-input-group input {
                    width: 100%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.9rem 1.1rem;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.95rem;
                    outline: none;
                    transition: 0.2s;
                    font-family: inherit;
                }

                .ul-input-group input:focus {
                    border-color: rgba(255,215,0,0.5);
                    background: rgba(255,215,0,0.03);
                    box-shadow: 0 0 0 3px rgba(255,215,0,0.08);
                }

                .ul-input-group input::placeholder { color: rgba(255,255,255,0.2); }

                .ul-password-wrap { position: relative; }
                .ul-toggle-pw {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(255,255,255,0.35);
                    display: flex;
                    transition: 0.2s;
                }
                .ul-toggle-pw:hover { color: rgba(255,255,255,0.7); }

                .ul-error {
                    background: rgba(255,60,60,0.1);
                    border: 1px solid rgba(255,60,60,0.3);
                    color: #ff6b6b;
                    font-size: 0.83rem;
                    padding: 0.7rem 1rem;
                    border-radius: 10px;
                    text-align: center;
                }

                .ul-submit-btn {
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #000;
                    font-weight: 700;
                    font-size: 0.95rem;
                    padding: 1rem;
                    border-radius: 14px;
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.6rem;
                    margin-top: 0.5rem;
                    transition: 0.3s;
                    font-family: inherit;
                }
                .ul-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,215,0,0.3); }
                .ul-submit-btn:disabled { opacity: 0.6; }

                .ul-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(0,0,0,0.2);
                    border-top-color: #000;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    display: inline-block;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                .ul-demo-hint {
                    text-align: center;
                    font-size: 0.78rem;
                    color: rgba(255,255,255,0.25);
                    margin-top: 0.5rem;
                }
                .ul-demo-hint span { color: rgba(255,215,0,0.5); font-weight: 600; }
            `}</style>
        </AnimatePresence>
    );
};

export default UserLogin;
