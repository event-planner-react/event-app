export const mockAuth = {
    login: ({ email, password }) => {
      return Promise.resolve({
        user: {
          id: 1,
          email,
          role: email.includes('admin') ? 'admin' : 'user',
          token: 'fake-jwt-token'
        }
      });
    },
    register: (data) => {
      return Promise.resolve({
        user: {
          ...data,
          id: Math.floor(Math.random() * 1000),
          token: 'fake-jwt-token'
        }
      });
    }
  };