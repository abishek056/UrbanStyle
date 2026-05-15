import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, X, LogIn, Shield, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUserAuth } from '../context/UserAuthContext';

const UnifiedLogin = ({ isOpen, onClose }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login: adminLogin } = useAuth();
    const { userLogin } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        // Small delay for UX
        await new Promise(r => setTimeout(r, 500));

        // Try admin credentials first
        if (adminLogin(identifier, password)) {
            onClose();
            resetForm();
            setIsLoading(false);
            return;
        }

        // Try consumer credentials
        if (userLogin(identifier, password)) {
            onClose();
            resetForm();
            setIsLoading(false);
            return;
        }

        setError('Invalid credentials. Please check your username/email and password.');
        setIsLoading(false);
    };

    const resetForm = () => {
        setIdentifier('');
        setPassword('');
        setError('');
        setShowPassword(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="unified-overlay" onClick={handleClose}>
                <motion.div
                    className="unified-modal"
                    initial={{ opacity: 0, scale: 0.88, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: 30 }}
                    transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close */}
                    <button className="ul-close-x" onClick={handleClose}><X size={18} /></button>

                    {/* Header */}
                    <div className="ul-head">
                        <div className="ul-logo-icon">
                            <LogIn size={28} />
                        </div>
                        <h2 className="font-lexend">SIGN <span>IN</span></h2>
                        <p>Enter your credentials to continue</p>
                    </div>

                    {/* Role hints */}
                    <div className="role-hints">
                        <div className="role-hint admin-hint">
                            <Shield size={13} />
                            <span>Admin: <code>admin</code> / <code>admin123</code></span>
                        </div>
                        <div className="role-hint user-hint">
                            <ShoppingBag size={13} />
                            <span>Customer: <code>user@gmail.com</code> / <code>user</code></span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="ul-form">
                        <div className="ul-field">
                            <label>Username or Email</label>
                            <div className="ul-input-wrap">
                                <Mail size={16} className="ul-input-icon" />
                                <input
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
                                    placeholder="admin  or  user@gmail.com"
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div className="ul-field">
                            <label>Password</label>
                            <div className="ul-input-wrap">
                                <Lock size={16} className="ul-input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                    placeholder="Enter your password"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="ul-eye-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                className="ul-error-box"
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        <button type="submit" className="ul-signin-btn" disabled={isLoading}>
                            {isLoading ? <span className="ul-spinner" /> : <><LogIn size={17} /> Sign In</>}
                        </button>
                    </form>
                </motion.div>
            </div>

            <style>{`
                .unified-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.88);
                    backdrop-filter: blur(14px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 1.5rem;
                }

                .unified-modal {
                    width: 100%;
                    max-width: 400px;
                    background: #0e0e12;
                    border: 1px solid rgba(255, 215, 0, 0.14);
                    border-radius: 28px;
                    padding: 2.8rem 2.2rem 2.4rem;
                    position: relative;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,215,0,0.04);
                }

                .ul-close-x {
                    position: absolute;
                    top: 1.4rem;
                    right: 1.4rem;
                    color: rgba(255,255,255,0.35);
                    background: rgba(255,255,255,0.05);
                    border-radius: 8px;
                    padding: 6px;
                    display: flex;
                    transition: 0.2s;
                }
                .ul-close-x:hover { color: #fff; background: rgba(255,255,255,0.1); }

                .ul-head {
                    text-align: center;
                    margin-bottom: 1.8rem;
                }

                .ul-logo-icon {
                    width: 64px;
                    height: 64px;
                    background: linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,165,0,0.06));
                    border: 1px solid rgba(255,215,0,0.18);
                    color: #FFD700;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.2rem;
                }

                .ul-head h2 {
                    font-size: 1.7rem;
                    letter-spacing: 3px;
                }
                .ul-head h2 span { color: #FFD700; }
                .ul-head p {
                    color: rgba(255,255,255,0.35);
                    font-size: 0.85rem;
                    margin-top: 0.4rem;
                }

                .role-hints {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 12px;
                    padding: 0.9rem 1.1rem;
                    margin-bottom: 1.8rem;
                }

                .role-hint {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.78rem;
                    color: rgba(255,255,255,0.4);
                }
                .role-hint.admin-hint { color: rgba(255,215,0,0.6); }
                .role-hint.user-hint { color: rgba(100,180,255,0.6); }
                .role-hint code {
                    background: rgba(255,255,255,0.06);
                    border-radius: 5px;
                    padding: 1px 6px;
                    font-family: monospace;
                    font-size: 0.75rem;
                }

                .ul-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.1rem;
                }

                .ul-field label {
                    display: block;
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.45);
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    letter-spacing: 0.4px;
                }

                .ul-input-wrap {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .ul-input-icon {
                    position: absolute;
                    left: 0.95rem;
                    color: rgba(255,255,255,0.25);
                    pointer-events: none;
                }

                .ul-input-wrap input {
                    width: 100%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.85rem 2.8rem 0.85rem 2.6rem;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.9rem;
                    outline: none;
                    transition: 0.2s;
                    font-family: inherit;
                }
                .ul-input-wrap input:focus {
                    border-color: rgba(255,215,0,0.45);
                    background: rgba(255,215,0,0.025);
                    box-shadow: 0 0 0 3px rgba(255,215,0,0.07);
                }
                .ul-input-wrap input::placeholder { color: rgba(255,255,255,0.18); }

                .ul-eye-btn {
                    position: absolute;
                    right: 0.9rem;
                    color: rgba(255,255,255,0.3);
                    display: flex;
                    transition: 0.2s;
                    padding: 2px;
                }
                .ul-eye-btn:hover { color: rgba(255,255,255,0.7); }

                .ul-error-box {
                    background: rgba(255,60,60,0.08);
                    border: 1px solid rgba(255,60,60,0.25);
                    color: #ff7070;
                    font-size: 0.82rem;
                    padding: 0.75rem 1rem;
                    border-radius: 10px;
                    text-align: center;
                    line-height: 1.4;
                }

                .ul-signin-btn {
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #000;
                    font-weight: 700;
                    font-size: 0.95rem;
                    padding: 0.95rem;
                    border-radius: 13px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.55rem;
                    transition: 0.3s;
                    font-family: inherit;
                    letter-spacing: 0.3px;
                    margin-top: 0.3rem;
                    cursor: pointer;
                }
                .ul-signin-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 28px rgba(255, 215, 0, 0.28);
                }
                .ul-signin-btn:disabled { opacity: 0.55; cursor: not-allowed; }

                .ul-spinner {
                    width: 19px;
                    height: 19px;
                    border: 2.5px solid rgba(0,0,0,0.2);
                    border-top-color: #000;
                    border-radius: 50%;
                    animation: ulSpin 0.75s linear infinite;
                    display: inline-block;
                }
                @keyframes ulSpin { to { transform: rotate(360deg); } }
            `}</style>
        </AnimatePresence>
    );
};

export default UnifiedLogin;
