import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from "react-router-dom";
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

import AppProvider from './context/AppProvider';


ReactDOM.render(
    <HashRouter>
        <AppProvider>
            <App />
        </AppProvider>
    </HashRouter>,

    document.getElementById("root"),
);

//registerServiceWorker();
