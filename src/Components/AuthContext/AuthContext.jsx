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
    sessionStorage.removeItem('offerModalShown');
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
  style={{ top: "80px" }} 
  toastClassName={(context) => {
    const base =
      "backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 shadow-xl rounded-2xl px-6 py-4 text-sm flex items-start gap-4 transition-all duration-300 border-l-4";

    const type = context?.type;
    let colorClass = "";

    switch (type) {
      case "success":
        colorClass = "border-emerald-400 text-emerald-700 dark:text-emerald-300";
        break;
      case "error":
        colorClass = "border-rose-400 text-rose-700 dark:text-rose-300";
        break;
      case "info":
        colorClass = "border-sky-400 text-sky-700 dark:text-sky-300";
        break;
      case "warning":
        colorClass = "border-amber-400 text-amber-700 dark:text-amber-300";
        break;
      default:
        colorClass = "border-slate-300 text-slate-800 dark:text-slate-200";
    }

    return `${base} ${colorClass}`;
  }}
  bodyClassName="flex flex-col gap-1 font-semibold tracking-wide"
  progressClassName="bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 h-1 rounded-full"
/>
    </>
  );
};
