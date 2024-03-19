import { createContext, useContext, useState } from 'react';

// Create a session context
const SessionContext = createContext();

// Custom hook to access session context
export const useSession = () => useContext(SessionContext);

// Session provider component
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null); // State to hold session information

  // Function to handle user login
  const signIn = async () => {
    try {
      // Implement your login logic here
      // For example, you can check if the user is authenticated using email/password or Google sign-in
      // After successful authentication, update the session state
      setSession({ /* user data */ });
    } catch (error) {
      console.error('Error occurred during sign-in:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

  // Function to handle user logout
  const signOut = async () => {
    try {
      // Implement your logout logic here, such as clearing user data or tokens
      // After successful logout, update the session state
      setSession(null);
    } catch (error) {
      console.error('Error occurred during sign-out:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <SessionContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
};
