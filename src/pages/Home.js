import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChatApp from '../components/chat/ChatApp';
import '../styles/home.css'; // <- pour les styles personnalisés si besoin

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleViewEvents = () => navigate('/events');
  const handleViewReclamtions = () => navigate('/reclamations');
  const handleViewReservations = () => navigate('/my-reservations');
  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="container-fluid px-0 min-vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <header className="bg-dark text-white py-3 shadow-sm sticky-top">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h4 mb-0">Bienvenue, <span className="fw-bold">{user?.email}</span></h1>
            <small className="text-white-50">Compte Utilisateur</small>
          </div>
          <button onClick={handleLogout} className="btn btn-outline-light rounded-pill">
            <i className="fas fa-sign-out-alt me-2"></i> Déconnexion
          </button>
        </div>
      </header> 

      {/* Contenu */}
      <main className="flex-grow-1 py-5">
        <div className="container">

        {/* Carousel ici */}
    <div id="homeCarousel" className="carousel slide mb-5 rounded-4 shadow" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner rounded-4">
        <div className="carousel-item active">
          <img src="/images/event2.jfif"className="d-block w-100" style={{ height: "300px", objectFit: "cover" }} alt="Événement 1" />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
            <h5>Événements exclusifs</h5>
            <p>Découvrez les meilleurs événements près de chez vous.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/event4.jpg" className="d-block w-100" style={{ height: "300px", objectFit: "cover" }} alt="Événement 2" />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
            <h5>Réservez vos places facilement</h5>
            <p>Gérez vos réservations en toute simplicité.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/event3.jfif" className="d-block w-100" style={{ height: "300px", objectFit: "cover" }} alt="Événement 3"/>
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
            <h5>Support & Réclamations</h5>
            <p>Nous sommes là pour vous aider rapidement.</p>
          </div>
        </div>
      </div>
      
      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Précédent</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Suivant</span>
      </button>
    </div>

          <section className="mb-5">
            <h2 className="text-center mb-5 fw-semibold text-uppercase text-dark">
              Découvrez nos fonctionnalités
            </h2>
            <div className="row g-4">
              {/* Événements */}
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow rounded-4 hover-shadow transition">
                  <div className="card-body text-center p-4">
                    <div className="icon-circle bg-primary text-white mb-4 mx-auto">
                      <i className="fas fa-calendar-alt fa-2x"></i>
                    </div>
                    <h3 className="h5 text-uppercase fw-bold">Événements</h3>
                    <p className="text-muted">Parcourez les prochains événements</p>
                    <button className="btn btn-primary w-100 rounded-pill mt-2" onClick={handleViewEvents}>
                      Voir les événements
                    </button>
                  </div>
                </div>
              </div>

              {/* Réservations */}
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow rounded-4 hover-shadow transition">
                  <div className="card-body text-center p-4">
                    <div className="icon-circle bg-success text-white mb-4 mx-auto">
                      <i className="fas fa-ticket-alt fa-2x"></i>
                    </div>
                    <h3 className="h5 text-uppercase fw-bold">Réservations</h3>
                    <p className="text-muted">Gérez vos participations</p>
                    <button className="btn btn-success w-100 rounded-pill mt-2" onClick={handleViewReservations}>
                      Mes réservations
                    </button>
                  </div>
                </div>
              </div>

              {/* Réclamations */}
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow rounded-4 hover-shadow transition">
                  <div className="card-body text-center p-4">
                    <div className="icon-circle bg-info text-white mb-4 mx-auto">
                      <i className="fas fa-user-cog fa-2x"></i>
                    </div>
                    <h3 className="h5 text-uppercase fw-bold">Réclamations</h3>
                    <p className="text-muted">Gérez vos Réclamations</p>
                    <button className="btn btn-info w-100 rounded-pill mt-2" onClick={handleViewReclamtions}>
                      Mes Réclamations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chat */}
          <section className="mb-5">
            <h2 className="text-center mb-4 fw-semibold text-uppercase">Messagerie Instantanée</h2>
            <ChatApp />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container text-center small">
          © 2025 <span className="fw-semibold">Projet-React</span>. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
