import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Download, X, CheckCircle } from 'lucide-react';

const InvoiceModal = ({ order, isOpen, onClose }) => {
    if (!isOpen || !order) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <AnimatePresence>
            <div className="invoice-overlay">
                <motion.div
                    className="invoice-container admin-card"
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                >
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>

                    <div className="invoice-header">
                        <div className="brand-side">
                            <h2 className="font-lexend">URBAN<span>STYLE</span></h2>
                            <p>Itahari, Nepal</p>
                            <p>urbanstyle@gmail.com</p>
                        </div>
                        <div className="invoice-title">
                            <h1>INVOICE</h1>
                            <p>#{order.id}</p>
                        </div>
                    </div>

                    <div className="invoice-details-grid">
                        <div className="detail-item">
                            <label>Billed To</label>
                            <h3>{order.customer}</h3>
                            <p>Customer ID: #CUST-{order.customer.slice(0, 3).toUpperCase()}</p>
                        </div>
                        <div className="detail-item">
                            <label>Date Issued</label>
                            <h3>{order.date}</h3>
                        </div>
                        <div className="detail-item">
                            <label>Payment Method</label>
                            <h3>{order.method}</h3>
                        </div>
                        <div className="detail-item">
                            <label>Order Status</label>
                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="invoice-table-wrapper">
                        <table className="invoice-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th className="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Premium Urban Apparel Selection</td>
                                    <td>1</td>
                                    <td>Rs. {order.amount.toLocaleString()}</td>
                                    <td className="text-right">Rs. {order.amount.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="invoice-footer">
                        <div className="notes">
                            <h4>Special Notes:</h4>
                            <p>Thank you for choosing UrbanStyle. 100% return if product is damaged or altersize; otherwise, no return policy.</p>
                        </div>
                        <div className="totals">
                            <div className="total-row">
                                <span>Subtotal:</span>
                                <span>Rs. {order.amount.toLocaleString()}</span>
                            </div>
                            <div className="total-row">
                                <span>Tax (0%):</span>
                                <span>Rs. 0</span>
                            </div>
                            <div className="total-row grand-total">
                                <span>Grand Total:</span>
                                <span>Rs. {order.amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="invoice-actions no-print">
                        <button className="admin-btn secondary" onClick={handlePrint}>
                            <Printer size={18} /> Print Invoice
                        </button>
                        <button className="admin-btn primary">
                            <Download size={18} /> Download PDF
                        </button>
                    </div>
                </motion.div>

                <style jsx>{`
                    .invoice-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.8);
                        backdrop-filter: blur(8px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        padding: 2rem;
                    }

                    .invoice-container {
                        width: 100%;
                        max-width: 800px;
                        background: #fff;
                        color: #111;
                        padding: 3rem;
                        position: relative;
                        border-radius: 0; /* Traditional invoice look */
                        box-shadow: 0 30px 60px rgba(0,0,0,0.5);
                    }

                    .close-btn {
                        position: absolute;
                        top: 1.5rem;
                        right: 1.5rem;
                        color: #888;
                        background: none;
                        border: none;
                        cursor: pointer;
                    }

                    .invoice-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        padding-bottom: 2rem;
                        border-bottom: 2px solid #eee;
                        margin-bottom: 2rem;
                    }

                    .brand-side h2 {
                        font-size: 1.5rem;
                        font-weight: 800;
                        margin-bottom: 0.5rem;
                        color: #000;
                    }

                    .brand-side h2 span { color: #D4AF37; } /* Gold from our theme */
                    .brand-side p { font-size: 0.85rem; color: #666; margin: 0; }

                    .invoice-title { text-align: right; }
                    .invoice-title h1 { font-size: 2.5rem; font-weight: 800; margin: 0; color: #eee; }
                    .invoice-title p { color: #888; font-weight: 600; margin-top: -5px; }

                    .invoice-details-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 1.5rem;
                        margin-bottom: 3rem;
                    }

                    .detail-item label {
                        display: block;
                        font-size: 0.7rem;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        color: #999;
                        margin-bottom: 0.5rem;
                        font-weight: 700;
                    }

                    .detail-item h3 { font-size: 1rem; margin: 0; font-weight: 700; color: #333; }
                    .detail-item p { font-size: 0.8rem; color: #777; margin-top: 0.2rem; }

                    .status-badge {
                        padding: 0.3rem 0.8rem;
                        border-radius: 20px;
                        font-size: 0.75rem;
                        font-weight: 600;
                        display: inline-block;
                    }
                    .status-badge.delivered { background: #e6f4ea; color: #1e7e34; }
                    .status-badge.pending { background: #fff4e5; color: #b7791f; }
                    .status-badge.shipped { background: #eaf2ff; color: #1a73e8; }

                    .invoice-table-wrapper { margin-bottom: 3rem; }
                    .invoice-table { width: 100%; border-collapse: collapse; }
                    .invoice-table th {
                        text-align: left;
                        padding: 1rem;
                        background: #f9f9f9;
                        border-bottom: 1px solid #eee;
                        font-size: 0.8rem;
                        text-transform: uppercase;
                        color: #888;
                    }
                    .invoice-table td { padding: 1.2rem 1rem; border-bottom: 1px solid #eee; font-size: 0.9rem; }
                    .text-right { text-align: right; }

                    .invoice-footer {
                        display: flex;
                        justify-content: space-between;
                        gap: 2rem;
                        margin-bottom: 3rem;
                    }

                    .notes { flex: 1; }
                    .notes h4 { font-size: 0.9rem; margin-bottom: 0.5rem; color: #333; }
                    .notes p { font-size: 0.8rem; color: #777; line-height: 1.5; }

                    .totals { width: 250px; }
                    .total-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 0.5rem 0;
                        font-size: 0.9rem;
                        color: #666;
                    }
                    .grand-total {
                        border-top: 2px solid #333;
                        padding-top: 1rem;
                        margin-top: 0.5rem;
                        color: #000;
                        font-weight: 800;
                        font-size: 1.2rem;
                    }

                    .invoice-actions {
                        display: flex;
                        gap: 1rem;
                        justify-content: flex-end;
                        border-top: 1px solid #eee;
                        padding-top: 2rem;
                    }

                    .admin-btn {
                        padding: 0.8rem 1.5rem;
                        border-radius: 10px;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        border: none;
                        transition: 0.2s;
                    }

                    .admin-btn.primary { background: #111; color: #fff; }
                    .admin-btn.secondary { background: #f0f0f0; color: #333; }
                    .admin-btn:hover { transform: translateY(-2px); opacity: 0.9; }

                    @media print {
                        .no-print { display: none !important; }
                        .invoice-overlay { background: none; backdrop-filter: none; padding: 0; position: relative; }
                        .invoice-container { box-shadow: none; max-width: 100%; border: none; }
                        body * { visibility: hidden; }
                        .invoice-container, .invoice-container * { visibility: visible; }
                        .invoice-container { position: absolute; left: 0; top: 0; }
                    }

                    @media (max-width: 600px) {
                        .invoice-details-grid { grid-template-columns: 1fr 1fr; }
                        .invoice-footer { flex-direction: column; }
                        .totals { width: 100%; }
                    }
                `}</style>
            </div>
        </AnimatePresence>
    );
};

export default InvoiceModal;
