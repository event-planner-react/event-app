import { useEffect, useRef } from 'react';
import MessageInput from './MessageInput';

export default function ChatWindow({ contact, messages, onSendMessage }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!contact) return <div className="w-75">Sélectionnez un contact pour chatter</div>;

  return (
    <div className="card w-75 border-0 shadow-sm">
  <div className="card-header bg-secondary text-white fw-bold">
    <i className="bi bi-chat-dots me-2"></i>Conversation avec {contact.name}
  </div>
  <div className="card-body bg-white" style={{ height: '400px', overflowY: 'auto' }}>
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`d-flex mb-2 ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}
      >
        <div
          className={`p-2 rounded-3 ${msg.sender === 'me' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
          style={{ maxWidth: '70%' }}
        >
          <div>{msg.content}</div>
          <div className="text-end">
            <small className="text-muted">{msg.timestamp}</small>
          </div>
        </div>
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>
  <div className="card-footer bg-light">
    <MessageInput onSend={onSendMessage} />
  </div>
</div>

  );
}
