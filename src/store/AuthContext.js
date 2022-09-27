import {createContext, useEffect, useState} from "react";


const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
})

export const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setLoggedIn(false)
    }
    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1')
        setLoggedIn(true)
    }

    useEffect(() => {
        const storedLoginInfo = localStorage.getItem('isLoggedIn');
        if (storedLoginInfo === '1') {
            setLoggedIn(true)
        }
    }, [])

    return <AuthContext.Provider value={{
        loggedIn: loggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext