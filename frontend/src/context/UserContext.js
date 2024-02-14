"use client"
import { fetchUserSession } from '@/lib/fetch-user';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

// Create a context with an undefined initial state
const UserContext = createContext(undefined);

// Provider component that wraps your app and makes the user object and setter function available to any child component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const getSession = async () => {
      const { user } = await fetchUserSession();
      setUser(user);
      if(user) setLoggedIn(true)
    };

    getSession();
  }, [loggedIn, pathname]);

  return (
    <UserContext.Provider value={{ user, setUser, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
