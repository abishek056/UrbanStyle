import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const ProductManager = () => {
  const { products, deleteProduct, addProduct, updateProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const categories = ['All', 'T-Shirt', 'Jacket', 'Sweatshirt', 'Joggers', 'Pants', 'Accessories', 'Trending'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="product-manager">
      <div className="manager-header">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="header-actions">
          <select
            className="admin-btn secondary"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ appearance: 'none', paddingRight: '2.5rem', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center' }}
          >
            {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
          <button className="admin-btn primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addProduct}
      />

      <EditProductModal
        isOpen={!!editingProduct}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdate={updateProduct}
      />

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-info">
                    <div className="product-thumb">
                      <img src={product.image} alt="" style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }} />
                    </div>
                    <strong>{product.name}</strong>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>Rs. {product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status-badge ${product.stock > product.minStock ? 'status-success' :
                    product.stock > 0 ? 'status-warning' : 'status-error'
                    }`}>
                    {product.stock > product.minStock ? 'In Stock' :
                      product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="icon-btn edit"
                      onClick={() => setEditingProduct(product)}
                      title="Edit Product"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="icon-btn delete" onClick={() => deleteProduct(product.id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .manager-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .search-bar {
          flex: 1;
          position: relative;
          max-width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-bar input {
          width: 100%;
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          padding: 0.75rem 1rem 0.75rem 3rem;
          border-radius: 12px;
          color: var(--text-light);
          outline: none;
          transition: var(--transition);
        }

        .search-bar input:focus {
          border-color: var(--primary);
        }

        .header-actions {
          display: flex;
          gap: 0.75rem;
        }

        .product-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .product-thumb {
          width: 40px;
          height: 40px;
          background: #333;
          border-radius: 8px;
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
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-light);
        }

        .icon-btn.delete:hover {
          color: var(--error);
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ProductManager;
