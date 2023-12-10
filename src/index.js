import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {AuthContextProvider} from "./store/AuthContext";
import store from "./store";
import {Provider} from "react-redux";


ReactDOM.render(<Provider store={store}>
    <AuthContextProvider>
        <App/>
    </AuthContextProvider>
</Provider>, document.getElementById('root'));
