import { useState, useEffect } from 'react';
import UserForm from './UserForm';
import { Modal, Button, Badge } from 'react-bootstrap';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const mockUsers = [
      { id: 1, email: 'admin@test.com', role: 'admin', name: 'Admin Principal' },
      { id: 2, email: 'user1@test.com', role: 'user', name: 'Utilisateur 1' },
      { id: 3, email: 'user2@test.com', role: 'user', name: 'Utilisateur 2' }
    ];
    setUsers(mockUsers);
  }, []);

  const handleCreate = (newUser) => {
    setUsers([...users, { ...newUser, id: Math.max(...users.map(u => u.id)) + 1 }]);
    setShowForm(false);
  };

  const handleUpdate = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
    setShowForm(false);
  };

  const confirmDelete = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== userToDelete));
    setShowDeleteModal(false);
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-white rounded-top-4 d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
          <h2 className="h4 fw-bold mb-0 text-primary">
            <i className="fas fa-users me-2"></i>Gestion des utilisateurs
          </h2>
          <Button 
            variant="primary" 
            className="d-flex align-items-center gap-2 rounded-pill px-4"
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
          >
            <i className="fas fa-user-plus"></i> Ajouter
          </Button>
        </div>

        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Badge
                        bg={user.role === 'admin' ? 'primary' : 'secondary'}
                        className="text-capitalize px-3 py-2 rounded-pill"
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <div className="d-flex gap-2 justify-content-end">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          className="rounded-circle"
                          title="Modifier"
                          onClick={() => {
                            setEditingUser(user);
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
                          onClick={() => confirmDelete(user.id)}
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

      {/* Modal pour le formulaire */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? 'Modifier utilisateur' : 'Ajouter un utilisateur'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm 
            user={editingUser} 
            onSubmit={editingUser ? handleUpdate : handleCreate}
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
          Êtes-vous sûr de vouloir supprimer cet utilisateur ?
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
