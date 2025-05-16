// Remplacez les imports axios par :
//import { mockAuth } from './mockAuth';
import { mockAuth } from '../mockAuth';

export const authService = {
  login: mockAuth.login,
  register: mockAuth.register,
  getProfile: () => Promise.resolve({ data: { user: JSON.parse(localStorage.getItem('user')) } })
};