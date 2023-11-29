import React, {useContext} from "react";

import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/AuthContext";
import CustomTable from "./components/UI/Table/CustomTable";
import Sheet from "./components/UI/Table/Sheet";

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
            {/*{<AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler
            }}>*/}
            <MainHeader/>
            <main>
                {/*{!ctx.loggedIn && <Login/>}*/}
                {/*{ctx.loggedIn && <Home/>}*/}
                <Sheet/>
            </main>
            {/* </AuthContext.Provider>*/}
        </>
    );
}

export default App;
