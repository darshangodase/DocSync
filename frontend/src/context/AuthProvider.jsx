import React, { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { fetchUserData, clearUserState } from "../redux/userSlice";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if(authUser) 
      {
        dispatch(fetchUserData(authUser.uid));
      } 
      else 
      {
        dispatch(clearUserState());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); 
      dispatch(clearUserState()); 
    } catch (error) {
      console.error("Sign-out failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
