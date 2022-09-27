import React, {useContext} from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/AuthContext";

function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     const storedLoginInfo = localStorage.getItem('isLoggedIn');
    //     if (storedLoginInfo === '1') {
    //         setIsLoggedIn(true)
    //     }
    // }, [])
    //
    // const loginHandler = (email, password) => {
    //     localStorage.setItem('isLoggedIn', '1')
    //     setIsLoggedIn(true);
    // };
    //
    // const logoutHandler = () => {
    //     localStorage.removeItem('isLoggedIn')
    //     setIsLoggedIn(false);
    // };

    const ctx = useContext(AuthContext)

    return (
        <>
            {/*<AuthContext.Provider value={{*/}
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler
            }}>
            <MainHeader/>
            <main>
                {!ctx.loggedIn && <Login/>}
                {ctx.loggedIn && <Home/>}
            </main>
            {/* </AuthContext.Provider>*/}
        </>
    );
}

export default App;
