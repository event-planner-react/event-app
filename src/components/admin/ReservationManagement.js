import { useState, useEffect } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

export default function ReservationManagement() {
  const [reservations, setReservations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

  useEffect(() => {
    const mockReservations = [
      { id: 1, eventTitle: "Conférence IA", userEmail: "alice@mail.com", nbPlaces: 2, note: "VIP" },
      { id: 2, eventTitle: "Salon Innovation", userEmail: "bob@mail.com", nbPlaces: 1, note: "" }
    ];
    setReservations(mockReservations);
  }, []);

  const confirmDelete = (resId) => {
    setReservationToDelete(resId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setReservations(reservations.filter(r => r.id !== reservationToDelete));
    setShowDeleteModal(false);
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm">
        {/* Header */}
        <div className="card-header bg-white rounded-top-4 d-flex align-items-center py-3 px-4 border-bottom">
          <h2 className="h4 fw-bold mb-0 text-primary">
            <i className="fas fa-calendar-check me-2"></i>Gestion des réservations
          </h2>
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Événement</th>
                  <th>Email utilisateur</th>
                  <th>Places</th>
                  <th>Note</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(res => (
                  <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.eventTitle}</td>
                    <td>{res.userEmail}</td>
                    <td><Badge bg="info">{res.nbPlaces}</Badge></td>
                    <td>{res.note || "—"}</td>
                    <td className="text-end">
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => confirmDelete(res.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal suppression */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette réservation ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Annuler</Button>
          <Button variant="danger" onClick={handleDelete}>Supprimer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
