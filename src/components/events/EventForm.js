import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export default function EventForm({ event, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        date: event.date || "",
        time: event.time || "",
        location: event.location || "",
        image: event.image || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      alert("Merci de remplir les champs obligatoires : titre, date, heure, lieu.");
      return;
    }
    onSubmit({ ...event, ...formData });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Titre *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Titre de l'événement"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Description de l'événement"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date *</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTime">
        <Form.Label>Heure *</Form.Label>
        <Form.Control
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Lieu *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Lieu de l'événement"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image (URL ou chemin local)</Form.Label>
        <Form.Control
          type="text"
          placeholder="https://exemple.com/image.jpg ou /images/image.jpg"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Vous pouvez saisir une URL d'image ou un chemin relatif (ex: /images/monimage.jpg). Pour les images locales, placez-les dans le dossier <code>public/images/</code>.
        </Form.Text>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button variant="primary" type="submit">
          {event ? "Modifier" : "Créer"}
        </Button>
      </div>
    </Form>
  );
}
