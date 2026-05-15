import React, { useState } from 'react';
import { Package, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const InventoryManager = () => {
    const { products, updateStock } = useStore();

    const handleUpdateStock = (id) => {
        const amount = prompt("Enter new stock amount:");
        if (amount !== null && !isNaN(amount)) {
            updateStock(id, parseInt(amount));
        }
    };

    return (
        <div className="inventory-manager">
            <div className="kpi-grid">
                <div className="admin-card">
                    <p className="text-muted">Total SKU</p>
                    <h3>{products.length}</h3>
                </div>
                <div className="admin-card">
                    <p className="text-muted">Low Stock Items</p>
                    <h3 className="text-warning">{products.filter(i => i.stock <= i.minStock && i.stock > 0).length}</h3>
                </div>
                <div className="admin-card">
                    <p className="text-muted">Out of Stock</p>
                    <h3 className="text-error">{products.filter(i => i.stock === 0).length}</h3>
                </div>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Product / SKU</th>
                            <th>Current Stock</th>
                            <th>Min. Stock Level</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <strong>{item.name}</strong>
                                    <br />
                                    <small className="text-muted">{item.sku}</small>
                                </td>
                                <td>
                                    <div className="stock-level">
                                        <span className={`stock-count ${item.stock <= item.minStock ? 'low' : ''}`}>{item.stock}</span>
                                        {item.stock <= item.minStock && <AlertCircle size={14} className="error-icon" />}
                                    </div>
                                </td>
                                <td>{item.minStock}</td>
                                <td>
                                    <button className="admin-btn secondary" onClick={() => handleUpdateStock(item.id)}>
                                        <RefreshCw size={14} /> Update Stock
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .text-warning { color: var(--warning); }
        .text-error { color: var(--error); }
        .stock-level {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .stock-count.low {
          color: var(--error);
          font-weight: 700;
        }
        .error-icon { color: var(--error); }
        small { font-size: 0.75rem; }
      `}</style>
        </div>
    );
};

export default InventoryManager;
