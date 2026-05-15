import React from 'react';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer" id="about">
      <div className="container footer-grid">
        <div className="footer-info">
          <div className="logo font-lexend">
            URBAN<span>STYLE</span>
          </div>
          <p className="description">
            Urban Style is your go-to destination for the trendiest streetwear in Nepal.
            We blend comfort with style to bring you the best in fashion at reasonable prices.
          </p>
          <div className="contact-info">
            <p><MapPin size={16} /> Itahari, Nepal</p>
            <p><Mail size={16} /> urbanstyle@gmail.com</p>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#shop">Shop</a></li>
            <li><a href="#trending">Trending</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/urb_anstyle0/" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <Facebook size={24} />
            </a>
          </div>
          <p className="est">Established in Dec 21, 2025</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Urban Style. All Rights Reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .admin-trigger {
          cursor: pointer;
          opacity: 0.15;
          margin-left: 2px;
          padding: 10px 5px; /* Larger hit area */
          display: inline-block;
          transition: 0.3s;
          user-select: none;
        }

        .admin-trigger:hover {
          opacity: 0.8;
          color: var(--primary);
        }
        .footer {
          background: #0f0f11;
          padding: clamp(3rem, 10vw, 5rem) 0 2rem;
          margin-top: clamp(3rem, 10vw, 5rem);
          border: none !important;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: clamp(2rem, 5vw, 4rem);
          margin-bottom: 4rem;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .logo span {
          color: var(--primary);
        }

        .description {
          color: var(--text-muted);
          max-width: 400px;
          margin-bottom: 2rem;
        }

        .contact-info p {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        h4 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: var(--text-light);
        }

        ul {
          list-style: none;
        }

        ul li {
          margin-bottom: 0.8rem;
        }

        ul li a {
          color: var(--text-muted);
        }

        ul li a:hover {
          color: var(--primary);
          padding-left: 5px;
        }

        .social-icons {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .social-icons a:hover {
          color: var(--primary);
          transform: translateY(-3px);
        }

        .est {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-style: italic;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 2rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          
          .footer {
            padding: 3rem 0 2rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
