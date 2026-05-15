import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card glass-card" onClick={onClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button className="add-btn" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
          <Plus size={20} />
        </button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <div className="price-row">
          <span className="price">NRP {product.price.toLocaleString()}</span>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          overflow: hidden;
          transition: var(--transition);
          padding: 1rem;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .product-image {
          position: relative;
          height: 250px;
          border-radius: 12px;
          overflow: hidden;
          background: #1a1a1a;
          margin-bottom: 1rem;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .add-btn {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: var(--primary);
          color: #000;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
          transition: var(--transition);
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
        }

        .product-card:hover .add-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .product-info h3 {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }

        .category {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.8rem;
        }

        .price {
          font-weight: 700;
          color: var(--primary);
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .add-btn {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
