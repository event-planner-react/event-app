import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages et composants
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
//import SharedLayout from './components/SharedLayout';
import EventManagement from './components/events/EventManagement';
import ReclamationManager from './components/events/ReclamationManager';
import MyReservations from './components/events/MyReservations';

// Styles
import './styles/auth.css';
import './styles/adminDashboard.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Layout général avec navbar et pages publiques */}
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="reclamations" element={<ReclamationManager />} />
            <Route path="/my-reservations" element={<MyReservations/>} />

          </Route>

          {/* Authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Admin privé */}
          <Route path="/admin/dashboard" element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } />

          {/* Page événements privée */}
          <Route path="/private/events" element={
            <PrivateRoute>
              <EventManagement />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
