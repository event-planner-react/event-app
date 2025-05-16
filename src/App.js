import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import './styles/auth.css'; // Ajoutez cette ligne
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import './styles/adminDashboard.css';
import EventManagement from './components/events/EventManagement';
import SharedLayout from './components/SharedLayout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<EventManagement />} />
        </Route>
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/admin/dashboard" element={
            <AuthProvider>
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute> </AuthProvider>
          } /> 

          <Route path="/events" element={
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
