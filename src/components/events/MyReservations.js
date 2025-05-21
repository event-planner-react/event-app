import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, Modal, Form, Badge } from 'react-bootstrap';
//import { Pencil, Trash } from 'react-bootstrap-icons'; // Icônes stylées Bootstrap
import { BsPencil, BsTrash } from 'react-icons/bs';
//import {Pencil , Trash}
import { useNavigate } from 'react-router-dom';

export default function MyReservations({ allEvents = [] }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  useEffect(() => {
    if (user?.email) {
      const mock = [
        { id: 1, eventId: 1, userEmail: user.email, nbPlaces: 2, note: "J'arrive tôt" },
        { id: 2, eventId: 2, userEmail: user.email, nbPlaces: 2, note: "J'arrive tôt" },
        { id: 3, eventId: 3, userEmail: user.email, nbPlaces: 2, note: "J'arrive tôt" }
      ];
      setReservations(mock.filter(r => r.userEmail === user.email));
    }
  }, [user]);

  const getEventTitle = (eventId) => {
    if (!Array.isArray(allEvents)) return "Événement inconnu";
    const ev = allEvents.find(e => e?.id === eventId);
    return ev?.title || "Événement inconnu";
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette réservation ?")) {
      setReservations(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleEdit = (reservation) => {
    setCurrentReservation(reservation);
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (!currentReservation) return;
    setReservations(prev =>
      prev.map(r => r.id === currentReservation.id ? currentReservation : r)
    );
    setShowEditModal(false);
  };

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="container-fluid px-0 min-vh-100 d-flex flex-column bg-light">
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
    <div className="container py-4">
      <h2 className="mb-4 text-primary">🎟️ Mes Réservations</h2>

      {reservations.length === 0 ? (
        <p className="text-muted">Aucune réservation pour le moment.</p>
      ) : (
        <div className="row">
          {reservations.map(res => (
            <div className="col-md-6 col-lg-4" key={res.id}>
              <Card className="mb-4 shadow-sm border-0 rounded-4">
                <Card.Header className="bg-light border-bottom fw-bold">
                  {getEventTitle(res.eventId)}
                </Card.Header>
                <Card.Body>
                  <p>
                    <Badge bg="info" className="me-2">Places : {res.nbPlaces}</Badge>
                  </p>
                  <p className="text-secondary"><strong>Note :</strong> {res.note || 'Aucune'}</p>

                  <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" size="sm" onClick={() => handleEdit(res)}>
  <BsPencil className="me-1" /> Modifier
</Button>
<Button variant="outline-danger" size="sm" onClick={() => handleDelete(res.id)}>
  <BsTrash className="me-1" /> Supprimer
</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>✏️ Modifier Réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentReservation && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de places</Form.Label>
                <Form.Control
                  type="number"
                  value={currentReservation.nbPlaces}
                  onChange={(e) =>
                    setCurrentReservation({ ...currentReservation, nbPlaces: parseInt(e.target.value) || 0 })
                  }
                  min="1"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={currentReservation.note}
                  onChange={(e) =>
                    setCurrentReservation({ ...currentReservation, note: e.target.value })
                  }
                  placeholder="Ex: Merci de me placer au premier rang"
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
          <Button variant="primary" onClick={handleSave}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
    </div>
    {/* Footer */}
    <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container text-center small">
          © 2025 <span className="fw-semibold">Projet-React</span>. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
