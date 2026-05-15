import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, X, Clock, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useUserAuth } from '../context/UserAuthContext';

const UserOrdersModal = ({ isOpen, onClose }) => {
    const { orders, cancelOrder } = useStore();
    const { consumerUser } = useUserAuth();

    if (!isOpen || !consumerUser) return null;

    // Filter orders for the logged-in user (assuming email matches)
    const userOrders = orders.filter(o => o.email === consumerUser.email);

    return (
        <AnimatePresence>
            <div className="orders-overlay" onClick={onClose}>
                <motion.div
                    className="orders-modal"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="orders-header">
                        <h2>My <span>Orders</span></h2>
                        <button className="close-btn" onClick={onClose}><X size={20} /></button>
                    </div>

                    <div className="orders-content">
                        {userOrders.length === 0 ? (
                            <div className="empty-orders">
                                <Package size={48} />
                                <h3>No Orders Yet</h3>
                                <p>Looks like you haven't made your choice yet...</p>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {userOrders.map(order => (
                                    <div key={order.id} className="order-card">
                                        <div className="order-head">
                                            <div className="order-id">
                                                <strong>Order #{order.id}</strong>
                                                <span>{order.date}</span>
                                            </div>
                                            <div className={`order-status status-${order.status.toLowerCase()}`}>
                                                {order.status === 'Pending' && <Clock size={14} />}
                                                {order.status === 'Shipped' && <Package size={14} />}
                                                {order.status === 'Delivered' && <CheckCircle2 size={14} />}
                                                {order.status === 'Cancelled' && <AlertCircle size={14} />}
                                                {order.status}
                                            </div>
                                        </div>

                                        <div className="order-items">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="order-item">
                                                    <span>{item.qty}x {item.name}</span>
                                                    <span>Rs. {(item.price * item.qty).toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="order-footer">
                                            <div className="order-total">
                                                <span>Total:</span>
                                                <strong>Rs. {order.amount.toLocaleString()}</strong>
                                            </div>

                                            {order.status === 'Pending' && (
                                                <button
                                                    className="cancel-btn"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to cancel this order?')) {
                                                            cancelOrder(order.id);
                                                        }
                                                    }}
                                                >
                                                    Cancel Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            <style>{`
                .orders-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.75);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    padding: 1rem;
                }

                .orders-modal {
                    width: 100%;
                    max-width: 600px;
                    background: #111;
                    border: 1px solid rgba(255, 215, 0, 0.1);
                    border-radius: 20px;
                    max-height: 85vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                }

                .orders-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(0,0,0,0.2);
                }

                .orders-header h2 {
                    font-size: 1.4rem;
                    font-family: var(--font-lexend);
                }

                .orders-header h2 span {
                    color: var(--primary);
                }

                .close-btn {
                    background: rgba(255,255,255,0.05);
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255,255,255,0.6);
                    transition: 0.2s;
                }

                .close-btn:hover {
                    background: rgba(255,255,255,0.1);
                    color: #fff;
                }

                .orders-content {
                    padding: 1.5rem;
                    overflow-y: auto;
                    flex: 1;
                }

                .empty-orders {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 4rem 1rem;
                    color: rgba(255,255,255,0.4);
                }

                .empty-orders h3 {
                    color: #fff;
                    margin: 1rem 0 0.5rem;
                }

                .orders-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .order-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 1.2rem;
                }

                .order-head {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px dashed rgba(255,255,255,0.1);
                }

                .order-id {
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                }

                .order-id strong {
                    color: var(--primary);
                    font-size: 1.05rem;
                }

                .order-id span {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.4);
                }

                .order-status {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.3rem 0.8rem;
                    border-radius: 30px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .status-pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
                .status-shipped { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
                .status-delivered { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
                .status-cancelled { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

                .order-items {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                    margin-bottom: 1rem;
                }

                .order-item {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.8);
                }

                .order-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px dashed rgba(255,255,255,0.1);
                }

                .order-total span {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.6);
                    margin-right: 0.5rem;
                }

                .order-total strong {
                    font-size: 1.1rem;
                    color: #fff;
                }

                .cancel-btn {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    padding: 0.4rem 1rem;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.2s;
                }

                .cancel-btn:hover {
                    background: rgba(239, 68, 68, 0.2);
                }
            `}</style>
        </AnimatePresence>
    );
};

export default UserOrdersModal;
