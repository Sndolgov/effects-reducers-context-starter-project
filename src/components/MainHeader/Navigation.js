import React, {useContext} from "react";

import styles from "./Navigation.module.css";
import AuthContext from "../../store/AuthContext";

const Navigation = () => {
    const ctx = useContext(AuthContext)
    return (
        // <AuthContext.Consumer>
        //     {(ctx) => {
        //         return (
                    <nav className={styles.nav}>
                        <ul>
                            {ctx.loggedIn && (
                                <li>
                                    <a href="/">Users</a>
                                </li>
                            )}
                            {ctx.loggedIn && (
                                <li>
                                    <a href="/">Admin</a>
                                </li>
                            )}
                            {ctx.loggedIn && (
                                <li>
                                    <button onClick={ctx.onLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </nav>
        //         )
        //     }}
        // </AuthContext.Consumer>
    );
};

export default Navigation;
