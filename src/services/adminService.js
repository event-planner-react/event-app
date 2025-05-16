// Simulation des données pour le développement
export const getAdminStats = async () => {
    return {
      totalUsers: 124,
      newUsersThisWeek: 12,
      totalEvents: 56,
      newEventsThisWeek: 5,
      activeUsers: 89
    };
  };
  
  export const getRecentUsers = async () => {
    return [
      {
        id: 1,
        email: "admin@example.com",
        role: "admin",
        createdAt: "2023-10-01"
      },
      {
        id: 2,
        email: "user1@example.com",
        role: "user",
        createdAt: "2023-10-15"
      },
      // Ajoutez plus d'utilisateurs au besoin
    ];
  };
  
  export const getRecentEvents = async () => {
    return [
      {
        id: 1,
        title: "Conférence React",
        date: "2023-11-20T14:00:00",
        participants: 42
      },
      {
        id: 2,
        title: "Atelier Node.js",
        date: "2023-11-22T10:00:00",
        participants: 35
      },
      // Ajoutez plus d'événements au besoin
    ];
  };