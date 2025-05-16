import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Simulation de données
  useEffect(() => {
    const mockEvents = [
      { 
        id: 1, 
        title: "Conférence React", 
        date: "2023-12-15",
        time: "14:00",
        location: "Paris",
        organizer: "admin@test.com",
        participants: 42,
        description: "Conférence sur les dernières fonctionnalités de React"
      },
      { 
        id: 2, 
        title: "Atelier Node.js", 
        date: "2023-12-20",
        time: "10:00",
        location: "Lyon",
        organizer: "user@test.com",
        participants: 35,
        description: "Atelier pratique sur Node.js et Express"
      }
    ];
    setEvents(mockEvents);
  }, []);

  const handleDelete = (eventId) => {
    if (window.confirm('Confirmer la suppression de cet événement ?')) {
      setEvents(events.filter(e => e.id !== eventId));
    }
  };

  const handleShowDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white border-bottom-0">
          <h2 className="h4 mb-0">Gestion des événements</h2>
        </div>
        
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Lieu</th>
                  <th>Organisateur</th>
                  <th>Participants</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>
                      {new Date(event.date).toLocaleDateString('fr-FR')}<br/>
                      <small className="text-muted">{event.time}</small>
                    </td>
                    <td>{event.location}</td>
                    <td>{event.organizer}</td>
                    <td>
                      <span className="badge bg-primary rounded-pill">
                        {event.participants}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex gap-2 justify-content-end">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleShowDetails(event)}
                        >
                          <i className="fas fa-eye"></i>
                        </Button>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => handleShowDetails(event)}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(event.id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Bootstrap pour les détails */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Détails de l'événement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <h5 className="mb-3">{selectedEvent.title}</h5>
              <div className="mb-2">
                <strong>Description :</strong>
                <p>{selectedEvent.description}</p>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Date :</strong>
                  <p>{new Date(selectedEvent.date).toLocaleDateString('fr-FR')} à {selectedEvent.time}</p>
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Lieu :</strong>
                  <p>{selectedEvent.location}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Organisateur :</strong>
                  <p>{selectedEvent.organizer}</p>
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Participants :</strong>
                  <p>{selectedEvent.participants}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
          <Button variant="primary">
            <i className="fas fa-edit me-2"></i>Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}