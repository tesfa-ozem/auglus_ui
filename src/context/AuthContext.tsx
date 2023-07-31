import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../utilities/Hooks';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    'isAuthenticated',
    false
  );
  const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin', false)
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', null);
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', null);
  const [userId, setUserId] = useLocalStorage('user_id',null)
  const navigate = useNavigate();


  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIsAdmin(null)
    setUserId(null)
    setIsAuthenticated(false)
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthenticated,
      setIsAuthenticated,
      setAccessToken,
      setRefreshToken,
      isAdmin,
      setIsAdmin,
      userId,
      setUserId,
      logout,
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
