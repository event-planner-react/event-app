import { Outlet } from 'react-router-dom';

export default function SharedLayout() {
  return (
    <div className="container-fluid px-0 min-vh-100 d-flex flex-column">
      {/* Header partagé */}
      <header className="bg-primary text-white p-3 shadow">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h4 mb-0">Mon Application</h1>
            </div>
            {/* ... autres éléments du header ... */}
          </div>
        </div>
      </header>

      {/* Contenu qui change selon la route */}
      <main className="flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
}