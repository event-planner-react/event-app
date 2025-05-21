export default function ContactList({ contacts, messages, onSelect, selectedId }) {
    return (
        <div className="card w-25 me-3 border-0 shadow-sm">
        <div className="card-header bg-primary text-white fw-bold">
          <i className="bi bi-people-fill me-2"></i>Contacts
        </div>
        <ul className="list-group list-group-flush">
          {contacts.map(contact => {
            const lastMsg = messages[contact.id]?.slice(-1)[0]?.content || 'Aucun message';
            return (
              <li
                key={contact.id}
                className={`list-group-item ${selectedId === contact.id ? 'active text-white bg-primary' : ''}`}
                onClick={() => onSelect(contact)}
                style={{ cursor: 'pointer' }}
              >
                <div className="fw-semibold">{contact.name}</div>
                <div className="text-muted small">{lastMsg}</div>
              </li>
            );
          })}
        </ul>
      </div>
      
    );
  }
  