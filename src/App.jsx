import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ProductManager from './components/admin/ProductManager';
import InventoryManager from './components/admin/InventoryManager';
import BillingManager from './components/admin/BillingManager';
import { useAuth } from './context/AuthContext';
import { useStore } from './context/StoreContext';
import { useUserAuth } from './context/UserAuthContext';
import UnifiedLogin from './components/UnifiedLogin';
import UserLogin from './components/UserLogin';
import UserOrdersModal from './components/UserOrdersModal';
import aboutImg from './assets/images/sections/about_img.jpg';

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isOrdersOpen, setIsOrdersOpen] = useState(false);
    const [activeAdminTab, setActiveAdminTab] = useState('dashboard');

    const { isAuthenticated, logout } = useAuth();
    const { products } = useStore();
    const { isUserLoginOpen, closeUserLogin } = useUserAuth();

    // ── Admin panel ────────────────────────────────────────────
    if (isAuthenticated) {
        return (
            <AdminLayout activeTab={activeAdminTab} setActiveTab={setActiveAdminTab}>
                {activeAdminTab === 'dashboard'  && <Dashboard />}
                {activeAdminTab === 'products'   && <ProductManager />}
                {activeAdminTab === 'inventory'  && <InventoryManager />}
                {activeAdminTab === 'billing'    && <BillingManager />}
            </AdminLayout>
        );
    }

    // ── Consumer store ─────────────────────────────────────────
    return (
        <CartProvider>
            <div className="app">
                <Navbar
                    onCartClick={() => setIsCartOpen(true)}
                    onSignInClick={() => setIsLoginOpen(true)}
                    onOrdersClick={() => setIsOrdersOpen(true)}
                />

                <main>
                    <Hero />

                    <motion.section
                        id="shop"
                        className="shop-section container"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title">TRENDING <span>COLLECTION</span></h2>
                        <div className="product-grid">
                            {products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={() => setSelectedProduct(product)}
                                />
                            ))}
                        </div>
                    </motion.section>

                    <motion.section
                        id="trending"
                        className="feature-section container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="glass-card trending-highlight">
                            <h2 className="font-lexend">URBAN <span>LIFESTYLE</span></h2>
                            <p className="highlight-text">
                                More than just clothes, it's a movement. From the streets of Itahari to the peaks of Nepal,
                                Urban Style represents the bold, the creative, and the rebels.
                            </p>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <h3>1000+</h3>
                                    <p>Happy Customers</p>
                                </div>
                                <div className="stat-item">
                                    <h3>Secure</h3>
                                    <p>Payment Options</p>
                                </div>
                                <div className="stat-item">
                                    <h3>24h</h3>
                                    <p>Delivery in Itahari</p>
                                </div>
                            </div>

                            <div className="policy-note">
                                <p><strong>Return Policy:</strong> 100% return if product is damaged or wrong size; otherwise, no return policy.</p>
                            </div>

                            <div className="payment-badges">
                                <div className="payment-badge">🟢 eSewa</div>
                                <div className="payment-badge">🟣 Khalti</div>
                                <div className="payment-badge">💵 Cash on Delivery</div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section
                        id="about"
                        className="about-section container"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="about-grid">
                            <div className="about-image">
                                <img
                                    src={aboutImg}
                                    alt="Urban Style Itahari"
                                />
                            </div>
                            <div className="about-text">
                                <h2 className="font-lexend">BORN IN <span>ITAHARI</span></h2>
                                <p>
                                    Established in Dec 21, 2025, Urban Style began as a vision to bring global streetwear
                                    trends to the local streets of Nepal. We believe that fashion should be
                                    self-expression, not just a brand name.
                                </p>
                                <p>
                                    Every piece we sell is curated for the youth who crave authenticity and quality.
                                    Our location in Itahari serves as the hub for our creative designs and
                                    community engagement.
                                </p>
                                <div className="about-badges">
                                    <div className="badge">Quality Choice</div>
                                    <div className="badge">Local Brand</div>
                                    <div className="badge">Streetwear Nepal</div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </main>

                <Footer />

                {/* Unified Login — handles both Admin & Consumer */}
                <UnifiedLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

                {/* Consumer Orders Modal */}
                <UserOrdersModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />

                {/* Consumer login triggered from cart when not logged in */}
                <UserLogin isOpen={isUserLoginOpen} onClose={closeUserLogin} />

                {/* Cart */}
                <CartDrawer 
                    isOpen={isCartOpen} 
                    onClose={() => setIsCartOpen(false)} 
                    onSignInClick={() => {
                        setIsCartOpen(false);
                        setIsLoginOpen(true);
                    }}
                />

                {/* Product modal */}
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}

                <style>{`
                    .shop-section {
                        padding: clamp(4rem, 10vw, 8rem) 0;
                    }

                    .product-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(clamp(140px, 45vw, 280px), 1fr));
                        gap: clamp(1rem, 3vw, 2.5rem);
                    }

                    .feature-section {
                        margin: clamp(4rem, 10vw, 8rem) auto;
                    }

                    .trending-highlight {
                        padding: clamp(2rem, 8vw, 6rem);
                        text-align: center;
                        border-radius: clamp(20px, 5vw, 50px);
                        background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%);
                        border: none !important;
                    }

                    .policy-note {
                        margin-top: clamp(2rem, 5vw, 3rem);
                        padding: 1rem;
                        background: rgba(255, 255, 255, 0.02);
                        border-radius: 15px;
                        display: inline-block;
                        width: 100%;
                        max-width: 600px;
                    }

                    .policy-note p {
                        color: var(--text-muted);
                        font-size: clamp(0.8rem, 2vw, 0.9rem);
                    }

                    .policy-note strong { color: var(--primary); }

                    .payment-badges {
                        display: flex;
                        gap: 1rem;
                        justify-content: center;
                        flex-wrap: wrap;
                        margin-top: 2rem;
                    }

                    .payment-badge {
                        padding: 0.5rem 1.2rem;
                        border-radius: 30px;
                        font-size: 0.85rem;
                        font-weight: 600;
                        border: 1px solid rgba(255,255,255,0.1);
                        background: rgba(255,255,255,0.04);
                    }

                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: clamp(1rem, 3vw, 2rem);
                    }

                    .stat-item h3 {
                        font-size: clamp(1.5rem, 5vw, 2.5rem);
                        color: var(--primary);
                        margin-bottom: 0.5rem;
                    }

                    .stat-item p { font-size: clamp(0.8rem, 2vw, 1rem); }

                    .about-section { padding: clamp(4rem, 10vw, 8rem) 0; }

                    .about-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: clamp(2rem, 5vw, 5rem);
                        align-items: center;
                    }

                    .about-image {
                        border-radius: 24px;
                        overflow: hidden;
                        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    }

                    .about-image img { width: 100%; display: block; }

                    .about-text h2 {
                        font-size: clamp(2rem, 6vw, 3rem);
                        margin-bottom: 1.5rem;
                    }

                    .about-text h2 span { color: var(--primary); }

                    .about-text p {
                        font-size: clamp(0.9rem, 2.5vw, 1.1rem);
                        color: var(--text-muted);
                        margin-bottom: 1.2rem;
                        line-height: 1.6;
                    }

                    .about-badges {
                        display: flex;
                        gap: 0.8rem;
                        flex-wrap: wrap;
                        margin-top: 1.5rem;
                    }

                    .badge {
                        background: var(--bg-dark-soft);
                        padding: 0.4rem 1rem;
                        border-radius: 30px;
                        font-size: 0.75rem;
                        font-weight: 600;
                        color: var(--primary);
                        border: 1px solid var(--glass-border);
                    }

                    @media (max-width: 992px) {
                        .about-grid { grid-template-columns: 1fr; gap: 3rem; }
                    }

                    @media (max-width: 768px) {
                        .stats-grid { grid-template-columns: 1fr; gap: 2rem; }
                    }
                `}</style>
            </div>
        </CartProvider>
    );
}

export default App;
