import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserManagement from '../components/admin/UserManagement';
import EventManagement from '../components/admin/EventManagement';
import ReclamationManagement from '../components/admin/ReclamationManagement';
import ReservationManagement from '../components/admin/ReservationManagement';
import AdminFeedbacks from '../components/admin/AdminFeedbacks';
import '../styles/adminDashboard.css';

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

  const navItems = [
    { id: 'events', label: 'Gestion Événements', icon: 'fas fa-calendar-alt' },
    { id: 'users', label: 'Gestion Utilisateurs', icon: 'fas fa-users' },
    { id: 'reclamation', label: 'Réclamations', icon: 'fas fa-exclamation-circle' },
    { id: 'reservation', label: 'Réservations', icon: 'fas fa-ticket-alt' },
    { id: 'feedback', label: 'Feedbacks', icon: 'fas fa-comment-dots' },
    { id: 'stats', label: 'Statistiques', icon: 'fas fa-chart-bar' },
  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: '250px' }}>
        <h4 className="text-center mb-4">Admin Panel</h4>
        <nav>
          <ul className="nav flex-column">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item mb-3">
                <a
                  href="#!"
                  onClick={() => setActiveTab(item.id)}
                  className={`d-flex align-items-center text-decoration-none ps-2 py-2 rounded 
                    ${activeTab === item.id ? 'bg-primary text-white' : 'text-light'}`}
                  style={{ fontSize: '16px', transition: 'all 0.2s ease' }}
                >
                  <i className={`${item.icon} me-2`}></i>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <button
            className="btn btn-outline-light w-100 mt-5"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt me-2"></i> Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4 bg-light">
        <div className="mb-4">
          <h2 className="h5">Bienvenue, {user?.email}</h2>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            {activeTab === 'events' ? <EventManagement /> :
             activeTab === 'users' ? <UserManagement /> :
             activeTab === 'reclamation' ? <ReclamationManagement /> :
             activeTab === 'reservation' ? <ReservationManagement /> :
             activeTab === 'feedback' ? <AdminFeedbacks /> :
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
      </div>
    </div>
  );
}
