import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './../../firebase/firebase.init';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  // Fetch JWT from backend
  const getJWT = async (email) => {
    try {
      const res = await fetch("https://hotel-db-server.vercel.app/jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      localStorage.setItem("access-token", data.token);
    } catch (err) {
      console.error("Failed to fetch JWT:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await getJWT(user.email); 
    setUser(user);
    return userCredential;
  };

  const register = async ({ name, email, photoURL, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoURL || 'https://i.ibb.co/FbDdMYbZ/vecteezy-blue-profile-icon-36885313.png',
    });

    const user = {
      ...userCredential.user,
      displayName: name,
      photoURL: photoURL || 'https://i.ibb.co/FbDdMYbZ/vecteezy-blue-profile-icon-36885313.png',
    };

    await getJWT(email); 
    setUser(user);
    return userCredential;
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await getJWT(user.email); 
    setUser(user);
    return user;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.clear(); 
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          login,
          register,
          logout,
          googleSignIn,
          loading,
          resetPassword,
        }}
      >
        {children}
      </AuthContext.Provider>

      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={(context) => {
          const base = "flex items-start gap-3 shadow-lg rounded-xl px-5 py-4 border-l-4 animate-fade-in";
          const type = context?.type;

          switch (type) {
            case "success":
              return `${base} bg-green-100 border-green-500 text-green-800`;
            case "error":
              return `${base} bg-red-100 border-red-500 text-red-800`;
            case "info":
              return `${base} bg-blue-100 border-blue-500 text-blue-800`;
            case "warning":
              return `${base} bg-yellow-100 border-yellow-500 text-yellow-800`;
            default:
              return `${base} bg-white border-gray-400 text-gray-800`;
          }
        }}
        bodyClassName="flex flex-col gap-1 text-sm font-medium"
        progressClassName="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 rounded-full"
      />
    </>
  );
};
