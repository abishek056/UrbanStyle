import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Package, Tag, DollarSign, List } from 'lucide-react';
import defaultImg from '../../assets/images/products/product_1.jpg';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'T-Shirt',
        price: '',
        stock: '',
        minStock: '10',
        sku: '',
        image: defaultImg,
        fullDescription: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            minStock: parseInt(formData.minStock)
        });
        setFormData({
            name: '',
            category: 'T-Shirt',
            price: '',
            stock: '',
            minStock: '10',
            sku: '',
            image: defaultImg,
            fullDescription: ''
        });
        onClose();
    };

    const categories = ['T-Shirt', 'Jacket', 'Sweatshirt', 'Joggers', 'Pants', 'Accessories', 'Trending'];

    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose}>
                <motion.div
                    className="admin-modal add-product-modal"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <div className="header-title">
                            <div className="icon-box">
                                <Plus size={20} />
                            </div>
                            <div>
                                <h2>Add New <span>Product</span></h2>
                                <p>Fill in the details to list a new item</p>
                            </div>
                        </div>
                        <button className="close-btn" onClick={onClose}><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSubmit} className="modal-content">
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label><Tag size={14} /> Product Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Vintage Oversized Hoodie"
                                />
                            </div>

                            <div className="form-group">
                                <label><List size={14} /> Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label><DollarSign size={14} /> Price (Rs.)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0"
                                />
                            </div>

                            <div className="form-group">
                                <label><Package size={14} /> Initial Stock</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    placeholder="0"
                                />
                            </div>

                            <div className="form-group">
                                <label><Package size={14} /> Min Stock Alert</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.minStock}
                                    onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                                    placeholder="10"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>SKU (Product Code)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.sku}
                                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                    placeholder="e.g. US-HOD-001"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    rows="3"
                                    value={formData.fullDescription}
                                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                                    placeholder="Describe the product materials, fit, and style..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="admin-btn secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="admin-btn primary">Add Product</button>
                        </div>
                    </form>

                    <style jsx>{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 2000;
              padding: 2rem;
            }
            .add-product-modal {
              background: var(--bg-dark-soft);
              border: 1px solid var(--glass-border);
              border-radius: 24px;
              width: 100%;
              max-width: 600px;
              overflow: hidden;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            .modal-header {
              padding: 1.5rem 2rem;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 1px solid var(--glass-border);
            }
            .header-title {
              display: flex;
              gap: 1.25rem;
              align-items: center;
            }
            .icon-box {
              width: 42px;
              height: 42px;
              background: rgba(255, 215, 0, 0.1);
              color: var(--primary);
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .header-title h2 {
              font-size: 1.25rem;
              margin-bottom: 0.15rem;
            }
            .header-title h2 span { color: var(--primary); }
            .header-title p { color: var(--text-muted); font-size: 0.85rem; }

            .modal-content {
              padding: 2rem;
            }
            .form-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1.25rem;
            }
            .form-group {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }
            .full-width {
              grid-column: 1 / span 2;
            }
            .form-group label {
              font-size: 0.8rem;
              color: var(--text-muted);
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            .form-group input, .form-group select, .form-group textarea {
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid var(--glass-border);
              border-radius: 8px;
              padding: 0.75rem;
              color: var(--text-light);
              outline: none;
              font-family: inherit;
            }
            .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
              border-color: var(--primary);
            }

            .form-actions {
              margin-top: 2rem;
              display: flex;
              justify-content: flex-end;
              gap: 1rem;
            }
          `}</style>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddProductModal;
