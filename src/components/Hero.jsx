import { motion } from 'framer-motion';
import heroBg from '../assets/images/sections/hero_bg.jpg';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <motion.h1
          className="hero-title font-lexend"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          DEFINE YOUR <br />
          <span>URBAN STYLE</span>
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Sustainable, trendy, and affordable streetwear tailored for the modern generation.
          Experience the revolution of fashion in Itahari.
        </motion.p>
        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a href="#shop" className="btn-primary">Shop Now</a>
          <a href="#about" className="btn-secondary">Our Story</a>
        </motion.div>
      </div>
      <div className="hero-overlay"></div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          height: auto;
          display: flex;
          align-items: center;
          position: relative;
          background: url('${heroBg}') center/cover no-repeat;
          overflow: hidden;
          border: none !important;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          width: 100%;
        }

        .hero-title {
          font-size: clamp(3rem, 10vw, 6rem);
          line-height: 1;
          margin-bottom: 1.5rem;
          color: var(--text-light);
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: -0.05em;
        }

        .hero-title span {
          color: var(--primary);
          display: block;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
        }

        .hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.4rem);
          color: var(--text-light);
          max-width: 1200px;
          margin: 0 auto 3rem;
          padding: 0 1rem;
          opacity: 0.9;
          font-weight: 300;
          line-height: 1.6;
        }

        .hero-btns {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-secondary {
          border: none;
          color: var(--primary);
          padding: 0.8rem 1.7rem;
          border-radius: 8px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: rgba(255, 215, 0, 0.1);
          text-decoration: none;
          transition: var(--transition);
        }

        .btn-secondary:hover {
          background: var(--primary);
          color: #000;
          transform: translateY(-5px);
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 100vh;
          }
          .hero-btns a {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
