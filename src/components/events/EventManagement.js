import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, Badge, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import EventForm from './EventForm';

import { useNavigate } from 'react-router-dom';


export default function EventManagement() {
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const [reservations, setReservations] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackInputs, setFeedbackInputs] = useState({});

  useEffect(() => {
    const mockEvents = [
      { 
        id: 1, 
        title: "Conférence React", 
        description: "Conférence sur les dernières fonctionnalités de React", 
        date: "2023-12-15", 
        time: "14:00", 
        location: "Paris", 
        organizer: user.email, 
        participants: 42,
        image: "https://javascript-conference.com/wp-content/uploads/2024/08/iJS_Global24_Website_Redesign_Header_Desktop_B.png"
      },
      { 
        id: 2, 
        title: "Atelier Node.js", 
        description: "Atelier pratique sur Node.js", 
        date: "2023-12-20", 
        time: "10:00", 
        location: "Lyon", 
        organizer: user.email, 
        participants: 35,
        image: "/images/event1.jfif"  // image locale dans public/images/
      }
    ];
    setEvents(mockEvents);
  }, [user]);

  const handleCreate = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length ? Math.max(...events.map(e => e.id)) + 1 : 1 }]);
    setShowForm(false);
  };

  const handleUpdate = (updatedEvent) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setEditingEvent(null);
    setShowForm(false);
  };

  const confirmDelete = (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setEvents(events.filter(e => e.id !== eventToDelete));
    setShowDeleteModal(false);
  };

  const handleReserve = (eventId) => {
    const newRes = {
      id: reservations.length + 1,
      eventId,
      userEmail: user.email,
      nbPlaces: 1,
      note: ""
    };
    setReservations([...reservations, newRes]);
    alert("Réservation effectuée !");
  };

  const handleFeedbackChange = (eventId, value) => {
    setFeedbackInputs(prev => ({
      ...prev,
      [eventId]: value
    }));
  };

  const handleFeedbackSubmit = (eventId) => {
    const text = feedbackInputs[eventId]?.trim();
    if (!text) {
      alert("Merci de saisir un commentaire.");
      return;
    }

    const newFeedback = {
      id: feedbacks.length + 1,
      eventId,
      userEmail: user.email,
      message: text
    };

    setFeedbacks([...feedbacks, newFeedback]);
    setFeedbackInputs(prev => ({ ...prev, [eventId]: "" }));
    alert("Feedback envoyé !");
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
    <Container className="py-4">
      
      <Card className="shadow rounded-4 border-0 mb-4">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center border-0 pb-0">
          <h2 className="h4 fw-bold mb-0">🎉 Gestion des événements</h2>
          <Button 
            variant="primary" 
            className="rounded-pill px-4 shadow-sm"
            onClick={() => {
              setEditingEvent(null);
              setShowForm(true);
            }}
          >
            <i className="fas fa-plus me-2"></i>Créer
          </Button>
        </Card.Header>

        <Card.Body>
          {events.length === 0 ? (
            <div className="text-center text-muted py-5">
              <p>Aucun événement pour le moment.</p>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4 mt-2">
              {events.map(event => (
                <Col key={event.id}>
                  <Card className="h-100 rounded-4 shadow-sm border-light">
                    {event.image && (
                      <Card.Img 
                        variant="top" 
                        src={event.image} 
                        alt={event.title} 
                        style={{objectFit: 'cover', height: '200px'}} 
                      />
                    )}
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="fs-5">{event.title}</Card.Title>
                        <Badge bg="light" text="dark" className="rounded-pill px-3 shadow-sm">
                          📅 {new Date(event.date).toLocaleDateString()} à {event.time}
                        </Badge>
                      </div>

                      <Card.Text className="text-secondary small mb-3">{event.description}</Card.Text>

                      <Form.Group className="mb-3">
                        <Form.Control 
                          type="text"
                          placeholder="Laissez un commentaire..."
                          value={feedbackInputs[event.id] || ''}
                          onChange={(e) => handleFeedbackChange(event.id, e.target.value)}
                          className="rounded-pill px-3"
                        />
                        <Button 
                          className="mt-2 rounded-pill px-3"
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => handleFeedbackSubmit(event.id)}
                        >
                          💬 Envoyer
                        </Button>
                      </Form.Group>

                      {feedbacks.filter(f => f.eventId === event.id).length > 0 && (
                        <div className="bg-light p-2 rounded small">
                          <strong>Commentaires :</strong>
                          <ul className="mt-1 ps-3 mb-0">
                            {feedbacks
                              .filter(f => f.eventId === event.id)
                              .map(fb => (
                                <li key={fb.id}><strong>{fb.userEmail}</strong> : {fb.message}</li>
                              ))}
                          </ul>
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <small className="text-muted">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          {event.location}
                        </small>
                        <div className="d-flex gap-2">
                          <Button 
                            variant="success" size="sm" className="rounded-pill"
                            onClick={() => handleReserve(event.id)}
                          >
                            🎟️ Réserver
                          </Button>
                          <Button 
                            variant="outline-primary" size="sm" className="rounded-pill"
                            onClick={() => {
                              setEditingEvent(event);
                              setShowForm(true);
                            }}
                          >
                            ✏️
                          </Button>
                          <Button 
                            variant="outline-danger" size="sm" className="rounded-pill"
                            onClick={() => confirmDelete(event.id)}
                          >
                            🗑️
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Modal formulaire */}
      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingEvent ? 'Modifier événement' : 'Créer un événement'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EventForm 
            event={editingEvent} 
            onSubmit={editingEvent ? handleUpdate : handleCreate}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>

      {/* Modal suppression */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cet événement ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    {/* Footer */}
    <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container text-center small">
          © 2025 <span className="fw-semibold">Projet-React</span>. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
