import { useState, useEffect } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

  useEffect(() => {
    const mockFeedbacks = [
      { id: 1, user: 'Utilisateur 1', content: 'Super service !', status: 'lu' },
      { id: 2, user: 'Utilisateur 2', content: 'Pas satisfait de la commande.', status: 'non lu' }
    ];
    setFeedbacks(mockFeedbacks);
  }, []);

  const confirmDelete = (feedbackId) => {
    setFeedbackToDelete(feedbackId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setFeedbacks(feedbacks.filter(f => f.id !== feedbackToDelete));
    setShowDeleteModal(false);
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white rounded-top-4 d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
          <h2 className="h4 fw-bold mb-0 text-primary">
            <i className="fas fa-comments me-2"></i>Gestion des retours
          </h2>
          {/* Tu peux décommenter et styliser ce bouton si besoin */}
          {/* <Button variant="primary" className="shadow-sm">
            <i className="fas fa-plus me-2"></i>Ajouter un retour
          </Button> */}
        </div>

        <div className="card-body px-4 py-3">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Utilisateur</th>
                  <th>Contenu</th>
                  <th>Statut</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map(feedback => (
                  <tr key={feedback.id}>
                    <td>{feedback.id}</td>
                    <td>{feedback.user}</td>
                    <td>{feedback.content}</td>
                    <td>
                      <Badge
                        bg={feedback.status === 'lu' ? 'success' : 'warning'}
                        className="text-capitalize"
                      >
                        {feedback.status}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <div className="d-flex gap-2 justify-content-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="shadow-sm"
                          onClick={() => confirmDelete(feedback.id)}
                          title="Supprimer"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {feedbacks.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">
                      Aucun retour disponible.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir supprimer ce retour ?</Modal.Body>
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
