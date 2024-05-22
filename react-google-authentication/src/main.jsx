import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Provider} from "react-redux";
import store from "./store.js";
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <React.StrictMode>
            <Provider store={store}>
                <App/>
                <Toaster position={"botton-center"} gutter={12} containerStyle={{margin: '8px'}} toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 3000,
                    },
                    style: {
                        fontSize: '16px',
                    }
                }}/>
            </Provider>
        </React.StrictMode>
    </GoogleOAuthProvider>,
)
