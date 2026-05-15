import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            onClose();
        } else {
            setError('Invalid username or password');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="login-overlay">
                <motion.div
                    className="login-modal admin-card"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                >
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>

                    <div className="login-header">
                        <div className="lock-icon">
                            <Lock size={32} />
                        </div>
                        <h2 className="font-lexend">ADMIN <span>ACCESS</span></h2>
                        <p>Secure login for store management</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label><User size={16} /> Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter admin username"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label><Lock size={16} /> Password</label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-text">{error}</motion.p>}

                        <button type="submit" className="admin-btn primary full-width">
                            Sign In
                        </button>
                        <p className="login-note">Credentials for demo: admin / admin123</p>
                    </form>
                </motion.div>

                <style jsx>{`
          .login-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 1.5rem;
          }

          .login-modal {
            width: 100%;
            max-width: 400px;
            background: #111;
            padding: 3rem 2rem;
            position: relative;
            border-radius: 24px;
            border: 1px solid var(--glass-border);
          }

          .close-btn {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            color: var(--text-muted);
          }

          .login-header {
            text-align: center;
            margin-bottom: 2.5rem;
          }

          .lock-icon {
            width: 64px;
            height: 64px;
            background: rgba(255, 215, 0, 0.1);
            color: var(--primary);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
          }

          .login-header h2 span { color: var(--primary); }
          .login-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem; }

          .input-group {
            margin-bottom: 1.5rem;
          }

          .input-group label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-bottom: 0.75rem;
            font-weight: 500;
          }

          .input-group input {
            width: 100%;
            background: #1a1a1a;
            border: 1px solid var(--glass-border);
            padding: 0.85rem 1rem;
            border-radius: 10px;
            color: #fff;
            outline: none;
            transition: var(--transition);
          }

          .input-group input:focus { border-color: var(--primary); }

          .password-input {
            position: relative;
          }

          .toggle-password {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
          }

          .full-width {
            width: 100%;
            justify-content: center;
            padding: 1rem;
            margin-top: 0.5rem;
          }

          .error-text {
            color: var(--error);
            font-size: 0.85rem;
            text-align: center;
            margin-bottom: 1rem;
          }

          .login-note {
            text-align: center;
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-top: 1.5rem;
          }
        `}</style>
            </div>
        </AnimatePresence>
    );
};

export default Login;
