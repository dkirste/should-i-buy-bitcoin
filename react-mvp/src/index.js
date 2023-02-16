import ReactDOM from 'react-dom/client';
import "./index.css"
import React, {  } from 'react';
import App from "./App";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<html>
                <head>
                    <title>Should I buy Bitcoin?</title>
                </head>
                <App />
            </html>
);