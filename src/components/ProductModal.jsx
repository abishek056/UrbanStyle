import React from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-content">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-info">
            <span className="category">{product.category}</span>
            <h2 className="font-lexend">{product.name}</h2>

            <div className="rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? "var(--primary)" : "none"}
                    color={i < Math.floor(product.rating) ? "var(--primary)" : "var(--text-muted)"}
                  />
                ))}
              </div>
              <span>({product.rating})</span>
            </div>

            <p className="price">NRP {product.price.toLocaleString()}</p>

            <p className="description">{product.fullDescription}</p>

            <button className="btn-primary buy-btn" onClick={() => {
              addToCart({ ...product });
              onClose();
            }}>
              <ShoppingCart size={20} /> Add to Bag
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .product-modal {
          width: 100%;
          max-width: 1000px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          background: #111111;
          border-radius: 40px;
          animation: zoomIn 0.3s ease;
          border: none !important;
        }

        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          color: var(--text-light);
          z-index: 10;
        }

        .modal-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 4vw, 3rem);
          padding: clamp(1.5rem, 5vw, 3rem);
        }

        .modal-image {
          border-radius: 30px;
          overflow: hidden;
          background: var(--bg-dark-soft);
          aspect-ratio: 1;
        }

        .modal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-info .category {
          color: var(--primary);
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
        }

        .modal-info h2 {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          margin: 0.5rem 0 1rem;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .price {
          font-size: clamp(1.5rem, 5vw, 2rem);
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 1.5rem;
        }

        .description {
          color: var(--text-muted);
          margin-bottom: 2rem;
          line-height: 1.6;
          font-size: 0.95rem;
        }


        .buy-btn {
          width: 100%;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }


        @media (max-width: 900px) {
          .modal-content {
            grid-template-columns: 1fr;
          }
          .product-modal {
            max-width: 95%;
            margin: 1rem;
          }
          .modal-image {
            height: clamp(250px, 50vw, 400px);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductModal;
