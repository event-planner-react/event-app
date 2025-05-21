import { useState, useEffect } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { FaEye, FaTrashAlt} from 'react-icons/fa';

export default function ReclamationManagement() {
  const [reclamations, setReclamations] = useState([]);
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reclamationToDelete, setReclamationToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const mockReclamations = [
      { id: 1, sujet: 'Problème de connexion', message: 'Je ne peux pas me connecter', statut: 'non traité', auteur: 'user1@test.com' },
      { id: 2, sujet: 'Erreur sur le profil', message: 'Mon nom est mal affiché', statut: 'en cours', auteur: 'user2@test.com' },
      { id: 3, sujet: 'Bug lors de l\'inscription', message: 'La page se bloque', statut: 'traité', auteur: 'user3@test.com' }
    ];
    setReclamations(mockReclamations);
  }, []);

  const handleView = (reclamation) => {
    setSelectedReclamation(reclamation);
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setReclamationToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setReclamations(reclamations.filter(r => r.id !== reclamationToDelete));
    setShowDeleteModal(false);
  };

  const badgeVariant = (statut) => {
    switch (statut) {
      case 'traité': return 'success';
      case 'en cours': return 'warning';
      case 'non traité': return 'secondary';
      default: return 'dark';
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="card-header bg-white rounded-top-4 d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
  <h2 className="h4 fw-bold mb-0 text-primary">
    <i className="fas fa-inbox me-2"></i>Gestion des Réclamations
  </h2>
</div>


      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-uppercase text-muted small">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Sujet</th>
                  <th scope="col">Auteur</th>
                  <th scope="col">Statut</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reclamations.map(reclamation => (
                  <tr key={reclamation.id}>
                    <td>{reclamation.id}</td>
                    <td className="fw-semibold">{reclamation.sujet}</td>
                    <td>{reclamation.auteur}</td>
                    <td>
                      <Badge bg={badgeVariant(reclamation.statut)} pill className="text-capitalize px-3 py-2">
                        {reclamation.statut}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <Button variant="outline-primary" size="sm" title="Voir les détails" onClick={() => handleView(reclamation)} className="rounded-3">
                          <FaEye />
                        </Button>
                        <Button variant="outline-danger" size="sm" title="Supprimer" onClick={() => confirmDelete(reclamation.id)} className="rounded-3">
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {reclamations.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">Aucune réclamation trouvée.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal détails */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Détails de la réclamation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReclamation && (
            <>
              <p><strong>Sujet :</strong> {selectedReclamation.sujet}</p>
              <p><strong>Auteur :</strong> {selectedReclamation.auteur}</p>
              <p><strong>Message :</strong><br /> {selectedReclamation.message}</p>
              <p><strong>Statut :</strong> 
                <Badge bg={badgeVariant(selectedReclamation.statut)} pill className="ms-2 text-capitalize px-3 py-2">
                  {selectedReclamation.statut}
                </Badge>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setShowModal(false)} className="rounded-3">
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal suppression */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez-vous vraiment supprimer cette réclamation ?</Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className="rounded-3">
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete} className="rounded-3">
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
