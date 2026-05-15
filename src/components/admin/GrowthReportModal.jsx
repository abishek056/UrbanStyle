import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, ArrowUpRight, Calendar } from 'lucide-react';

const GrowthReportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const monthlyData = [
    { month: 'Jan', growth: 45 },
    { month: 'Feb', growth: 52 },
    { month: 'Mar', growth: 48 },
    { month: 'Apr', growth: 65 },
    { month: 'May', growth: 58 },
    { month: 'Jun', growth: 72 },
  ];

  const yearlyData = [
    { year: '2025 (Partial)', growth: 85 },
    { year: '2026 (Projected)', growth: 340 },
  ];

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="admin-modal growth-report-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="header-title">
              <div className="icon-box">
                <TrendingUp size={20} />
              </div>
              <div>
                <h2>Sales Growth <span>Report</span></h2>
                <p>Monthly & Yearly Performance Analysis</p>
              </div>
            </div>
            <button className="close-btn" onClick={onClose}><X size={20} /></button>
          </div>

          <div className="modal-content">
            {/* Monthly Chart */}
            <div className="report-section">
              <div className="section-header">
                <h3><Calendar size={18} /> Monthly Growth (2026)</h3>
                <div className="header-meta">
                  <span className="growth-tag success"><ArrowUpRight size={14} /> +12.5%</span>
                </div>
              </div>
              <div className="chart-container line-chart">
                <div className="chart-wrapper">
                  <svg viewBox="0 0 500 160" preserveAspectRatio="none" className="graph-svg">
                    {/* Grid Lines */}
                    <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.05)" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.05)" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" />

                    {/* Area Fill */}
                    <path
                      d={`M 0 160 ${monthlyData.map((d, i) => `L ${i * 100} ${140 - d.growth * 3}`).join(' ')} L 500 160 Z`}
                      fill="url(#gradient-monthly)"
                      opacity="0.2"
                    />

                    {/* Line */}
                    <path
                      d={monthlyData.map((d, i) => (i === 0 ? `M 0 ${140 - d.growth * 3}` : `L ${i * 100} ${140 - d.growth * 3}`)).join(' ')}
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Points */}
                    {monthlyData.map((d, i) => (
                      <g key={i} className="chart-point">
                        <circle cx={i * 100} cy={140 - d.growth * 3} r="5" fill="var(--primary)" />
                        <circle cx={i * 100} cy={140 - d.growth * 3} r="8" fill="var(--primary)" opacity="0.2" />
                      </g>
                    ))}

                    <defs>
                      <linearGradient id="gradient-monthly" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="chart-labels">
                  {monthlyData.map(d => <span key={d.month}>{d.month}</span>)}
                </div>
              </div>
            </div>

            {/* Yearly Chart */}
            <div className="report-section">
              <div className="section-header">
                <h3><TrendingUp size={18} /> Yearly Growth Comparison</h3>
                <div className="header-meta">
                  <span className="growth-tag success"><ArrowUpRight size={14} /> +29% CAGR</span>
                </div>
              </div>
              <div className="chart-container bar-chart">
                <div className="chart-wrapper">
                  <svg viewBox="0 0 500 160" preserveAspectRatio="none" className="graph-svg">
                    {yearlyData.map((d, i) => {
                      const barHeight = (d.growth / 400) * 120;
                      const barWidth = 100;
                      const spacing = 150;
                      return (
                        <g key={d.year} className="bar-group">
                          <rect
                            x={i * spacing + 100}
                            y={140 - barHeight}
                            width={barWidth}
                            height={barHeight}
                            rx="12"
                            fill="var(--primary)"
                            opacity="0.8"
                          >
                            <animate attributeName="height" from="0" to={barHeight} dur="1s" fill="freeze" />
                            <animate attributeName="y" from="140" to={140 - barHeight} dur="1s" fill="freeze" />
                          </rect>
                          <text
                            x={i * spacing + 150}
                            y={130 - barHeight}
                            textAnchor="middle"
                            fill="var(--text-light)"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            Rs.{d.growth}k
                          </text>
                        </g>
                      );
                    })}
                    <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  </svg>
                </div>
                <div className="chart-labels">
                  {yearlyData.map(d => <span key={d.year}>{d.year}</span>)}
                </div>
              </div>
            </div>
          </div>

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
            .growth-report-modal {
              background: var(--bg-dark-soft);
              border: 1px solid var(--glass-border);
              border-radius: 24px;
              width: 100%;
              max-width: 700px;
              overflow: hidden;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            .modal-header {
              padding: 2rem;
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
              width: 48px;
              height: 48px;
              background: rgba(255, 215, 0, 0.1);
              color: var(--primary);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .header-title h2 {
              font-size: 1.5rem;
              margin-bottom: 0.25rem;
            }
            .header-title h2 span { color: var(--primary); }
            .header-title p { color: var(--text-muted); font-size: 0.9rem; }
            .close-btn { color: var(--text-muted); }
            .close-btn:hover { color: var(--text-light); }

            .modal-content {
              padding: 2rem;
              display: flex;
              flex-direction: column;
              gap: 2rem;
            }
            .section-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 1rem;
            }
            .section-header h3 {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              font-size: 1.1rem;
              color: var(--text-light);
            }
            .growth-tag {
              padding: 0.4rem 0.8rem;
              border-radius: 20px;
              font-size: 0.75rem;
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 0.4rem;
            }
            .growth-tag.success {
              background: rgba(34, 197, 94, 0.1);
              color: var(--success);
            }

            .chart-container {
              background: rgba(255, 255, 255, 0.02);
              border-radius: 16px;
              padding: 1.5rem;
              border: 1px solid var(--glass-border);
              position: relative;
            }
            .chart-wrapper {
              width: 100%;
              height: 160px;
              overflow: visible;
            }
            .graph-svg {
              width: 100%;
              height: 100%;
              overflow: visible;
            }
            .chart-labels {
              display: flex;
              justify-content: space-between;
              margin-top: 1rem;
              color: var(--text-muted);
              font-size: 0.75rem;
              padding: 0 5%;
            }
            
            .bar-group rect {
              transition: all 0.3s ease;
            }
            .bar-group:hover rect {
              opacity: 1;
              filter: brightness(1.2);
            }
            .chart-point circle {
              transition: all 0.3s ease;
            }
            .chart-point:hover circle:first-child {
              r: 7;
            }
          `}</style>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GrowthReportModal;
