import React from 'react';
import { useCart } from '../context/CartContext';
import { useUserAuth } from '../context/UserAuthContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Menu, X, User, LogOut, LogIn, Package } from 'lucide-react';

const Navbar = ({ onCartClick, onSignInClick, onOrdersClick }) => {
    const { cartCount } = useCart();
    const { isConsumerAuthenticated, consumerUser, userLogout } = useUserAuth();
    const { isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Don't render store navbar when in admin mode
    if (isAuthenticated) return null;

    return (
        <nav className="navbar glass-card">
            <div className="container nav-content">
                <div className="logo font-lexend">
                    URBAN<span>STYLE</span>
                </div>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
                    <a href="#shop" onClick={() => setIsMenuOpen(false)}>Shop</a>
                    <a href="#trending" onClick={() => setIsMenuOpen(false)}>Trending</a>
                    <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
                </div>

                <div className="nav-actions">
                    {/* Cart Button */}
                    <button className="cart-btn" onClick={onCartClick} title="Shopping Cart">
                        <ShoppingCart size={22} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>

                    {/* Unified Sign In / User state */}
                    {isConsumerAuthenticated ? (
                        <div className="user-menu">
                            <button
                                className="nav-action-btn"
                                onClick={onOrdersClick}
                                title="My Orders"
                            >
                                <Package size={16} />
                                <span>My Orders</span>
                            </button>
                            <button
                                className="nav-logout-btn"
                                onClick={userLogout}
                                title="Sign Out"
                            >
                                <LogOut size={16} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            id="signin-btn"
                            className="nav-signin-btn"
                            onClick={onSignInClick}
                        >
                            <LogIn size={16} />
                            <span>Sign In</span>
                        </button>
                    )}

                    <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <style>{`
                .navbar {
                    position: fixed;
                    top: 1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 90%;
                    max-width: 1200px;
                    z-index: 1000;
                    padding: 0.8rem 0;
                    border-radius: 20px;
                    border: none !important;
                    transition: var(--transition);
                }

                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 1.5rem;
                    gap: 1rem;
                }

                .logo {
                    font-size: clamp(1.2rem, 4vw, 1.5rem);
                    font-weight: 800;
                    letter-spacing: -1px;
                    flex-shrink: 0;
                }

                .logo span { color: var(--primary); }

                .nav-links {
                    display: flex;
                    gap: clamp(1rem, 3vw, 2rem);
                }

                .nav-links a {
                    font-weight: 500;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .nav-links a:hover { color: var(--primary); }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    flex-shrink: 0;
                }

                .cart-btn {
                    position: relative;
                    color: var(--text-light);
                    padding: 0.4rem;
                }

                .cart-badge {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: var(--primary);
                    color: #000;
                    font-size: 0.7rem;
                    font-weight: 700;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* Logged-in user state */
                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #000;
                    font-size: 0.68rem;
                    font-weight: 800;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .user-name-label {
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: rgba(255,255,255,0.75);
                }

                .nav-action-btn,
                .nav-logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                    border-radius: 9px;
                    transition: 0.2s;
                    font-family: inherit;
                    cursor: pointer;
                    padding: 0.38rem 0.8rem;
                    font-size: 0.78rem;
                    font-weight: 600;
                }

                .nav-action-btn {
                    background: rgba(255,215,0,0.08);
                    border: 1px solid rgba(255,215,0,0.2);
                    color: #FFD700;
                }
                .nav-action-btn:hover {
                    background: rgba(255,215,0,0.15);
                    color: #fff;
                }

                .nav-logout-btn {
                    background: rgba(255,80,80,0.08);
                    border: 1px solid rgba(255,80,80,0.2);
                    color: rgba(255,100,100,0.8);
                }
                .nav-logout-btn:hover {
                    background: rgba(255,80,80,0.15);
                    color: #ff6b6b;
                }

                /* Sign In button */
                .nav-signin-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.45rem;
                    background: linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,165,0,0.07));
                    border: 1px solid rgba(255,215,0,0.25);
                    color: #FFD700;
                    font-size: 0.85rem;
                    font-weight: 700;
                    padding: 0.48rem 1.1rem;
                    border-radius: 11px;
                    transition: 0.25s;
                    font-family: inherit;
                    cursor: pointer;
                    letter-spacing: 0.3px;
                }
                .nav-signin-btn:hover {
                    background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.12));
                    border-color: rgba(255,215,0,0.45);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 14px rgba(255,215,0,0.18);
                }

                .menu-toggle {
                    display: none;
                    color: var(--text-light);
                }

                @media (max-width: 768px) {
                    .navbar {
                        width: 95%;
                        top: 0.5rem;
                        border-radius: 12px;
                    }

                    .nav-links {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100vh;
                        background: rgba(10, 10, 10, 0.98);
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 2rem;
                        gap: 2.5rem;
                        text-align: center;
                        display: none;
                        z-index: 2000;
                        backdrop-filter: blur(10px);
                        border: none;
                    }

                    .nav-links.active { display: flex; }

                    .nav-links a {
                        font-size: 1.5rem;
                        font-weight: 700;
                    }

                    .menu-toggle {
                        display: block;
                        z-index: 3000;
                    }

                    .user-name-label { display: none; }

                    .nav-signin-btn span,
                    .nav-logout-btn span {
                        display: none;
                    }

                    .nav-signin-btn,
                    .nav-logout-btn {
                        padding: 0.45rem 0.6rem;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
