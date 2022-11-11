import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from '../../Firebase/firebase.config';

export const AuthContext = createContext()
const auth = getAuth(app)

//providers
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    //states 
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)

    //handlers
    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const LoginWithemail = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const LogOut = () => {
        localStorage.removeItem('genius-Token')
        return signOut(auth)
    }

    const googelSignIn = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider)
    }

    // onAuthStateChange
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoader(false)
        });

        return () => unSubscribe()
    }, [])

    // put the value and func here what you want send wtih context.
    const authInfo = {
        user,
        loader,
        createUser,
        LoginWithemail,
        LogOut,
        googelSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;