import { useState, useEffect } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

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

  const confirmDelete = (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setEvents(events.filter(e => e.id !== eventToDelete));
    setShowDeleteModal(false);
  };

  // Ici tu peux ajouter handleCreate et handleUpdate si tu veux un form comme UserManagement

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-white rounded-top-4 d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
          <h2 className="h4 fw-bold mb-0 text-primary">
            <i className="fas fa-calendar-alt me-2"></i>Gestion des événements
          </h2>
          
        </div>

        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
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
                    <td>{event.id}</td>
                    <td>{event.title}</td>
                    <td>{new Date(event.date).toLocaleDateString('fr-FR')}<br />
                      <small className="text-muted">{event.time}</small>
                    </td>
                    <td>{event.location}</td>
                    <td>{event.organizer}</td>
                    <td>
                      <Badge bg="primary" className="text-capitalize px-3 py-2 rounded-pill">
                        {event.participants}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <div className="d-flex gap-2 justify-content-end">
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="rounded-circle"
                          title="Voir détails"
                          onClick={() => {
                            setEditingEvent(event);
                            setShowForm(true);  // Ici tu peux changer selon ce que tu veux faire
                          }}
                        >
                          <i className="fas fa-eye"></i>
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="rounded-circle"
                          title="Modifier"
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
                          className="rounded-circle"
                          title="Supprimer"
                          onClick={() => confirmDelete(event.id)}
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

      {/* Modal pour le formulaire / détails */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingEvent ? 'Détails / Modifier l\'événement' : 'Ajouter un événement'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingEvent ? (
            <div>
              <h5 className="mb-3 text-primary">{editingEvent.title}</h5>
              <p><strong>Description :</strong> {editingEvent.description}</p>
              <p><strong>Date :</strong> {new Date(editingEvent.date).toLocaleDateString('fr-FR')} à {editingEvent.time}</p>
              <p><strong>Lieu :</strong> {editingEvent.location}</p>
              <p><strong>Organisateur :</strong> {editingEvent.organizer}</p>
              <p><strong>Participants :</strong> <Badge bg="success" pill>{editingEvent.participants}</Badge></p>
            </div>
          ) : (
            <p>Formulaire d'ajout à implémenter ici...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Fermer
          </Button>
          <Button variant="primary" /* onClick={...} */>
            <i className="fas fa-edit me-2"></i>Modifier
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal confirmation suppression */}
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
    </div>
  );
}
