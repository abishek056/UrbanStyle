import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Package, AlertTriangle, ArrowUpRight, DollarSign } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import GrowthReportModal from './GrowthReportModal';

const KPICard = ({ title, value, icon, trend, status }) => (
  <div className="admin-card kpi-card">
    <div className="kpi-header">
      <div className={`kpi-icon ${status}`}>
        {icon}
      </div>
      {trend && (
        <span className={`kpi-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
          <TrendingUp size={14} /> {trend >= 0 ? `+${trend}%` : `${trend}%`}
        </span>
      )}
    </div>
    <div className="kpi-body">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
    <style jsx>{`
      .kpi-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .kpi-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.5rem;
      }
      .kpi-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .kpi-icon.success { background: rgba(34, 197, 94, 0.1); color: var(--success); }
      .kpi-icon.warning { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
      .kpi-icon.error { background: rgba(239, 68, 68, 0.1); color: var(--error); }
      .kpi-icon.info { background: rgba(59, 130, 246, 0.1); color: var(--info); }
      
      .kpi-trend {
        font-size: 0.75rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.2rem 0.5rem;
        border-radius: 20px;
      }
      .kpi-trend.positive { background: rgba(34, 197, 94, 0.1); color: var(--success); }
      .kpi-trend.negative { background: rgba(239, 68, 68, 0.1); color: var(--error); }

      .kpi-body h3 {
        font-size: 1.75rem;
        font-weight: 800;
        margin-bottom: 0.25rem;
      }
      .kpi-body p {
        font-size: 0.85rem;
        color: var(--text-muted);
        font-weight: 500;
      }
    `}</style>
  </div>
);

const Dashboard = () => {
  const { stats, resetStore } = useStore();
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header-actions" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="admin-btn secondary"
          onClick={resetStore}
          style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
        >
          <AlertTriangle size={16} /> Refresh Store Data
        </button>
      </div>
      
        <GrowthReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />

        <div className="admin-card recent-orders">
          <div className="card-header">
            <h3>Recent Activities</h3>
          </div>
          <div className="activity-list">
            {[1, 2, 3, 4].map(i => (
              <div className="activity-item" key={i}>
                <div className="activity-point"></div>
                <div className="activity-content">
                  <p className="activity-text">New order received from <strong>Customer #{1024 + i}</strong></p>
                  <span className="activity-time">{i * 2} mins ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .card-header h3 {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .view-all {
          font-size: 0.8rem;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .chart-placeholder {
          height: 200px;
          position: relative;
          padding-top: 1rem;
        }

        .sales-chart {
          width: 100%;
          height: 100%;
        }

        .chart-labels {
          display: flex;
          justify-content: space-between;
          padding: 0 1rem;
          margin-top: 1rem;
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          position: relative;
        }

        .activity-point {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary);
          margin-top: 5px;
          flex-shrink: 0;
          box-shadow: 0 0 10px var(--primary);
        }

        .activity-content p {
          font-size: 0.85rem;
          margin-bottom: 0.25rem;
        }

        .activity-content strong {
          color: var(--text-light);
        }

        .activity-time {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
