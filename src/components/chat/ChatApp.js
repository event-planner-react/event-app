import { useState } from 'react';
import ContactList from './ContactList';
import ChatWindow from './ChatWindow';

const mockContacts = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

export default function ChatApp() {
  const [contacts] = useState(mockContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});

  const handleSendMessage = (contactId, text) => {
    const newMessage = {
      sender: 'me',
      content: text,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMessage]
    }));
  };

  return (
    <div
    className="d-flex border rounded shadow-lg p-3 bg-light"
    style={{ height: '500px', maxWidth: '900px', margin: '0 auto' }}>
      <ContactList
        contacts={contacts}
        messages={messages}
        onSelect={setSelectedContact}
        selectedId={selectedContact?.id}
      />
      <ChatWindow
        contact={selectedContact}
        messages={messages[selectedContact?.id] || []}
        onSendMessage={text => handleSendMessage(selectedContact.id, text)}
      />
    </div>
  );
}
