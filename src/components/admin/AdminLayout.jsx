import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingCart, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
    { id: 'billing', label: 'Billing & Orders', icon: <ShoppingCart size={20} /> },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="font-lexend">URBAN <span>ADMIN</span></h2>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
              {activeTab === item.id && <ChevronRight size={16} className="active-arrow" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={logout}>
            <LogOut size={20} />
            <span>Logout & Exit</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-search">
            <h1 className="font-lexend">{menuItems.find(i => i.id === activeTab)?.label}</h1>
          </div>
          <div className="admin-profile">
            <div className="profile-info">
              <span className="name">{user?.username || 'Abishek Adhikari'}</span>
              <span className="role">{user?.role || 'Store Manager'}</span>
            </div>
            <div className="profile-avatar">{user?.avatar || 'A'}</div>
          </div>
        </header>

        <div className="admin-content-inner">
          {children}
        </div>
      </main>

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #050505;
          color: var(--text-light);
        }

        /* Sidebar */
        .admin-sidebar {
          width: 280px;
          background: #0a0a0a;
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
        }

        .sidebar-header {
          padding: 2.5rem 2rem;
        }

        .sidebar-header h2 {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .sidebar-header span {
          color: var(--primary);
        }

        .sidebar-nav {
          padding: 1rem;
          flex: 1;
        }

        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 1rem 1.25rem;
          gap: 1rem;
          color: var(--text-muted);
          border-radius: 12px;
          margin-bottom: 0.5rem;
          transition: var(--transition);
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-light);
        }

        .nav-item.active {
          background: var(--primary);
          color: #000;
          font-weight: 600;
        }

        .active-arrow {
          margin-left: auto;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .logout {
          color: var(--error);
        }

        .logout:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--error);
        }

        /* Main Content */
        .admin-main {
          flex: 1;
          margin-left: 280px;
          padding: 2rem;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .admin-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .profile-info {
          text-align: right;
        }

        .profile-info .name {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .profile-info .role {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          background: var(--bg-dark-soft);
          border: 1px solid var(--primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--primary);
          font-size: 0.8rem;
        }

        @media (max-width: 992px) {
          .admin-sidebar {
            width: 80px;
          }
          .sidebar-header h2, .nav-item span:not(.icon), .profile-info {
            display: none;
          }
          .admin-main {
            margin-left: 80px;
          }
          .nav-item {
            justify-content: center;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
