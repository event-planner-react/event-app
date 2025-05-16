import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserManagement from '../components/admin/UserManagement';
import EventManagement from '../components/admin/EventManagement';
//import './styles/adminDashboard.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="container-fluid px-0">
      {/* Header */}
      <header className="bg-dark text-white p-3 shadow-sm">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h4 mb-0">Tableau de bord Administrateur</h1>
              <small className="text-muted">Connecté en tant que : {user?.email}</small>
            </div>
            <button 
              onClick={handleLogout}
              className="btn btn-danger btn-sm"
            >
              <i className="fas fa-sign-out-alt me-1"></i> Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <ul className="nav nav-tabs border-0 w-100">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => setActiveTab('events')}
              >
                <i className="fas fa-calendar-alt me-2"></i>Gestion Événements
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <i className="fas fa-users me-2"></i>Gestion Utilisateurs
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveTab('stats')}
              >
                <i className="fas fa-chart-bar me-2"></i>Statistiques
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container-fluid py-4">
        <div className="card shadow-sm">
          <div className="card-body">
            {activeTab === 'events' ? <EventManagement /> : 
             activeTab === 'users' ? <UserManagement /> : 
             (
              <div className="stats-section">
                <h2 className="h4 mb-4">Statistiques</h2>
                <div className="alert alert-info">
                  Module de statistiques à venir
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}