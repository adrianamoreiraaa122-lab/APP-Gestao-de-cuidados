import { createContext, useState, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsub;
  }, []);

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    return signOut(auth);
  }

  async function register(name, cpf, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);


    await setDoc(doc(db, "usuarios", cred.user.uid), {
      nome: name,
      cpf: cpf,
      email: email,
      createdAt: new Date()
    });

    return cred;
  }

  return (
    <AuthContext.Provider 
      value={{
        signed: !!user,
        user,
        login,
        logout,
        register,  
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
