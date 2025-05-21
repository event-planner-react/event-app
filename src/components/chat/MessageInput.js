import { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
  <input
    type="text"
    className="form-control me-2"
    placeholder="Écrire un message..."
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
  <button className="btn btn-primary" type="submit">
    <i className="bi bi-send-fill"></i>
  </button>
</form>

  );
}
