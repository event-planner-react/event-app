import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Badge, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const ReclamationManager = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [reclamations, setReclamations] = useState([
    {
      id: 1,
      titre: "Problème de connexion",
      description: "Je ne peux pas accéder à mon compte.",
      statut: "Ouverte",
      date: "2023-05-01",
    },
    {
      id: 2,
      titre: "Erreur de facturation",
      description: "J'ai été facturé deux fois pour le même service.",
      statut: "En cours",
      date: "2023-05-02",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingReclamation, setEditingReclamation] = useState(null);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    statut: "Ouverte",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    if (editingReclamation) {
      setReclamations(
        reclamations.map((rec) =>
          rec.id === editingReclamation.id ? { ...editingReclamation, ...formData } : rec
        )
      );
    } else {
      const newReclamation = {
        ...formData,
        id: reclamations.length + 1,
        date: new Date().toISOString().split("T")[0],
      };
      setReclamations([...reclamations, newReclamation]);
    }

    setShowForm(false);
    setEditingReclamation(null);
    setFormData({ titre: "", description: "", statut: "Ouverte" });
  };

  const confirmDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réclamation ?")) {
      setReclamations(reclamations.filter((rec) => rec.id !== id));
    }
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
    <Container className="py-4" style={{ maxWidth: "1200px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Gestion des réclamations</h2>
        <Button variant="success" onClick={() => { setShowForm(true); setEditingReclamation(null); }}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Ajouter une réclamation
        </Button>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {reclamations.map((rec) => (
          <Col key={rec.id}>
            <Card
              className={`h-100 shadow-sm border-start border-4 ${
                rec.statut === "Ouverte"
                  ? "border-danger"
                  : rec.statut === "En cours"
                  ? "border-warning"
                  : "border-success"
              }`}
              style={{ transition: "transform 0.2s" }}
            >
              <Card.Header className="d-flex justify-content-between align-items-center bg-light border-0 shadow-sm px-4 py-3 rounded-top">
                <strong>{rec.titre}</strong>
                <Badge
                  bg={
                    rec.statut === "Ouverte"
                      ? "danger"
                      : rec.statut === "En cours"
                      ? "warning"
                      : "success"
                  }
                >
                  {rec.statut}
                </Badge>
              </Card.Header>
              <Card.Body className="px-4 py-3">
                <Card.Text>{rec.description}</Card.Text>
                <small className="text-muted">
                  <i className="fas fa-calendar me-1"></i>
                  {rec.date}
                </small>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end gap-2 px-4 py-3 bg-white border-top">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-circle"
                  title="Modifier"
                  onClick={() => {
                    setEditingReclamation(rec);
                    setFormData({
                      titre: rec.titre,
                      description: rec.description,
                      statut: rec.statut,
                    });
                    setShowForm(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="rounded-circle"
                  title="Supprimer"
                  onClick={() => confirmDelete(rec.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingReclamation ? "Modifier" : "Ajouter"} une réclamation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-3">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Statut</Form.Label>
              <Form.Select name="statut" value={formData.statut} onChange={handleFormChange}>
                <option value="Ouverte">Ouverte</option>
                <option value="En cours">En cours</option>
                <option value="Fermée">Fermée</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="px-4 py-3">
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Enregistrer
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
};

export default ReclamationManager;
