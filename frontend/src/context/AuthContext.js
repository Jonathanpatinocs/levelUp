import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8080/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Invalid token");
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("jwt");
          setToken(null);
          setUser(null);
        });
    }
  }, [token]);

  const login = (jwt) => {
    localStorage.setItem("jwt", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}