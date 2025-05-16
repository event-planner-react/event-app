import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleViewEvents = () => {
    navigate('/events');
  };

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="container-fluid px-0 min-vh-100 d-flex flex-column">
      {/* En-tête */}
      <header className="bg-primary text-white p-3 shadow">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h4 mb-0">Bienvenue, <span className="fw-bold">{user?.email}</span></h1>
              <small className="text-white-50">Compte Utilisateur</small>
            </div>
            <button 
              onClick={handleLogout}
              className="btn btn-outline-light"
            >
              <i className="fas fa-sign-out-alt me-2"></i> Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow-1 py-4 bg-light">
        <div className="container">
          <section className="mb-5">
            <h2 className="text-center mb-4">Découvrez nos fonctionnalités</h2>
            
            <div className="row g-4">
              {/* Carte Événements */}
              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <div className="icon-circle bg-primary text-white mb-3 mx-auto">
                      <i className="fas fa-calendar-alt fa-2x"></i>
                    </div>
                    <h3 className="h5 card-title">Événements</h3>
                    <p className="card-text text-muted">Parcourez les prochains événements</p>
                    <button className="btn btn-outline-primary w-100" onClick={handleViewEvents}>
                      Voir les événements
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Carte Réservations */}
              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <div className="icon-circle bg-success text-white mb-3 mx-auto">
                      <i className="fas fa-ticket-alt fa-2x"></i>
                    </div>
                    <h3 className="h5 card-title">Réservations</h3>
                    <p className="card-text text-muted">Gérez vos participations</p>
                    <button className="btn btn-outline-success w-100">
                      Mes réservations
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Carte Profil */}
              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <div className="icon-circle bg-info text-white mb-3 mx-auto">
                      <i className="fas fa-user-cog fa-2x"></i>
                    </div>
                    <h3 className="h5 card-title">Profil</h3>
                    <p className="card-text text-muted">Modifiez vos informations</p>
                    <button className="btn btn-outline-info w-100">
                      Mon profil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}