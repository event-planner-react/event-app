import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, Badge, Container, Row, Col, Modal } from 'react-bootstrap';
import EventForm from './EventForm';

export default function EventManagement() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Simulation de données
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
        participants: 42
      },
      { 
        id: 2, 
        title: "Atelier Node.js", 
        description: "Atelier pratique sur Node.js",
        date: "2023-12-20",
        time: "10:00",
        location: "Lyon",
        organizer: user.email,
        participants: 35
      }
    ];
    setEvents(mockEvents);
  }, [user]);

  const handleCreate = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Math.max(...events.map(e => e.id)) + 1 }]);
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

  return (
    <Container fluid className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">Gestion des événements</h2>
          <Button 
            variant="primary" 
            onClick={() => {
              setEditingEvent(null);
              setShowForm(true);
            }}
          >
            <i className="fas fa-plus me-2"></i>Créer un événement
          </Button>
        </Card.Header>

        <Card.Body>
          {events.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">Aucun événement créé pour le moment</p>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {events.map(event => (
                <Col key={event.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Card.Title>{event.title}</Card.Title>
                        <Badge bg="info">
                          {new Date(event.date).toLocaleDateString()} à {event.time}
                        </Badge>
                      </div>
                      <Card.Text className="text-muted mb-3">
                        {event.description}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          {event.location}
                        </small>
                        <div className="d-flex gap-2">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => {
                              setEditingEvent(event);
                              setShowForm(true);
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => confirmDelete(event.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
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

      {/* Modal pour le formulaire */}
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

      {/* Modal de confirmation de suppression */}
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
  );
}