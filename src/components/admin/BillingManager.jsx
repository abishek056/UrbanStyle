import React, { useState } from 'react';
import {
    CreditCard, Download, Printer, Search,
    Filter, TrendingUp, ShoppingBag, Clock, CheckCircle2, ChevronDown
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import InvoiceModal from './InvoiceModal';

const STATUS_OPTIONS = ['All', 'Pending', 'Shipped', 'Delivered'];
const METHOD_OPTIONS = ['All', 'Esewa', 'Khalti', 'Cash on Delivery'];

const BillingManager = () => {
    const { orders, updateOrderStatus } = useStore();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [methodFilter, setMethodFilter] = useState('All');

    const handleStatusChange = (id, newStatus) => {
        updateOrderStatus(id, newStatus);
    };

    const handleViewInvoice = (order) => {
        setSelectedOrder(order);
        setIsInvoiceOpen(true);
    };

    const filtered = orders.filter(order => {
        const matchSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === 'All' || order.status === statusFilter;
        const matchMethod = methodFilter === 'All' || order.method === methodFilter;
        return matchSearch && matchStatus && matchMethod;
    });

    const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);
    const pendingCount = orders.filter(o => o.status === 'Pending').length;
    const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
    const shippedCount = orders.filter(o => o.status === 'Shipped').length;

    return (
        <div className="billing-manager">

            {/* Stats Row */}
            <div className="billing-stats">
                <div className="bstat-card">
                    <TrendingUp size={20} />
                    <div>
                        <p>Total Revenue</p>
                        <h3>Rs. {totalRevenue.toLocaleString()}</h3>
                    </div>
                </div>
                <div className="bstat-card">
                    <ShoppingBag size={20} />
                    <div>
                        <p>Total Orders</p>
                        <h3>{orders.length}</h3>
                    </div>
                </div>
                <div className="bstat-card warning">
                    <Clock size={20} />
                    <div>
                        <p>Pending</p>
                        <h3>{pendingCount}</h3>
                    </div>
                </div>
                <div className="bstat-card success">
                    <CheckCircle2 size={20} />
                    <div>
                        <p>Delivered</p>
                        <h3>{deliveredCount}</h3>
                    </div>
                </div>
            </div>

            {/* Filters Row */}
            <div className="billing-filters">
                <div className="search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by order ID or customer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <Filter size={14} />
                    <div className="filter-select-wrap">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={14} className="select-arrow" />
                    </div>
                    <div className="filter-select-wrap">
                        <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
                            {METHOD_OPTIONS.map(m => <option key={m}>{m}</option>)}
                        </select>
                        <ChevronDown size={14} className="select-arrow" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Items</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)' }}>
                                    No orders found
                                </td>
                            </tr>
                        ) : filtered.map((order) => (
                            <tr key={order.id}>
                                <td><strong style={{ color: 'var(--primary)' }}>#{order.id}</strong></td>
                                <td>
                                    <div className="customer-cell">
                                        <strong>{order.customer}</strong>
                                        {order.email && <span className="customer-email">{order.email}</span>}
                                        {order.address && <span className="customer-email">{order.address}</span>}
                                    </div>
                                </td>
                                <td style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{order.date}</td>
                                <td><strong>Rs. {order.amount.toLocaleString()}</strong></td>
                                <td>
                                    <div className="payment-method">
                                        <CreditCard size={13} />
                                        {order.method}
                                    </div>
                                </td>
                                <td>
                                    {order.items ? (
                                        <div className="order-items-preview">
                                            {order.items.slice(0, 2).map((it, i) => (
                                                <span key={i} className="item-tag">{it.name} ×{it.qty}</span>
                                            ))}
                                            {order.items.length > 2 && (
                                                <span className="item-tag more">+{order.items.length - 2} more</span>
                                            )}
                                        </div>
                                    ) : (
                                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>—</span>
                                    )}
                                </td>
                                <td>
                                    <select
                                        className={`status-select ${order.status === 'Delivered' ? 'sel-success' :
                                            order.status === 'Pending' ? 'sel-warning' : 'sel-info'}`}
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="icon-btn"
                                            title="View Invoice"
                                            onClick={() => handleViewInvoice(order)}
                                        >
                                            <Printer size={15} />
                                        </button>
                                        <button className="icon-btn" title="Download">
                                            <Download size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <InvoiceModal
                isOpen={isInvoiceOpen}
                onClose={() => setIsInvoiceOpen(false)}
                order={selectedOrder}
            />

            <style>{`
                .billing-stats {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .bstat-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    padding: 1.2rem 1.4rem;
                    color: var(--primary);
                    transition: 0.2s;
                }
                .bstat-card:hover { background: rgba(255,215,0,0.05); }
                .bstat-card.warning { color: #f59e0b; }
                .bstat-card.success { color: #4ade80; }
                .bstat-card p { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-bottom: 0.2rem; }
                .bstat-card h3 { font-size: 1.4rem; font-weight: 700; color: inherit; }

                .billing-filters {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.2rem;
                    flex-wrap: wrap;
                    align-items: center;
                }

                .search-box {
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px;
                    padding: 0.6rem 1rem;
                    flex: 1;
                    min-width: 200px;
                    color: rgba(255,255,255,0.4);
                }
                .search-box input {
                    background: none;
                    border: none;
                    outline: none;
                    color: #fff;
                    font-size: 0.875rem;
                    font-family: inherit;
                    width: 100%;
                }
                .search-box input::placeholder { color: rgba(255,255,255,0.25); }

                .filter-group {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    color: rgba(255,255,255,0.35);
                }

                .filter-select-wrap {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .filter-select-wrap select {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px;
                    padding: 0.6rem 2rem 0.6rem 0.9rem;
                    color: rgba(255,255,255,0.7);
                    font-size: 0.83rem;
                    outline: none;
                    appearance: none;
                    font-family: inherit;
                    cursor: pointer;
                }
                .filter-select-wrap select option { background: #1a1a1a; }
                .select-arrow {
                    position: absolute;
                    right: 0.6rem;
                    pointer-events: none;
                    color: rgba(255,255,255,0.4);
                }

                .customer-cell { display: flex; flex-direction: column; gap: 0.15rem; }
                .customer-email { font-size: 0.75rem; color: rgba(255,255,255,0.35); }

                .payment-method {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.82rem;
                    color: rgba(255,255,255,0.5);
                }

                .order-items-preview {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.3rem;
                    max-width: 180px;
                }
                .item-tag {
                    background: rgba(255,215,0,0.06);
                    border: 1px solid rgba(255,215,0,0.12);
                    color: rgba(255,215,0,0.7);
                    font-size: 0.7rem;
                    padding: 0.15rem 0.5rem;
                    border-radius: 6px;
                    white-space: nowrap;
                }
                .item-tag.more {
                    background: rgba(255,255,255,0.04);
                    border-color: rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.35);
                }

                .action-buttons {
                    display: flex;
                    gap: 0.5rem;
                }

                .icon-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--text-muted);
                    transition: var(--transition);
                }
                .icon-btn:hover {
                    background: var(--primary);
                    color: #000;
                }

                .status-select {
                    appearance: none;
                    border: 1.5px solid;
                    border-radius: 20px;
                    padding: 0.3rem 1rem;
                    font-size: 0.78rem;
                    font-weight: 600;
                    font-family: inherit;
                    cursor: pointer;
                    outline: none;
                    transition: 0.2s;
                    min-width: 105px;
                    text-align: center;
                }
                .status-select option { background: #1a1a1a; color: #fff; }
                .sel-warning {
                    background: rgba(245,158,11,0.1);
                    border-color: rgba(245,158,11,0.35);
                    color: #f59e0b;
                }
                .sel-info {
                    background: rgba(59,130,246,0.1);
                    border-color: rgba(59,130,246,0.35);
                    color: #60a5fa;
                }
                .sel-success {
                    background: rgba(34,197,94,0.1);
                    border-color: rgba(34,197,94,0.35);
                    color: #4ade80;
                }

                @media (max-width: 900px) {
                    .billing-stats {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 600px) {
                    .billing-stats {
                        grid-template-columns: 1fr 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default BillingManager;
