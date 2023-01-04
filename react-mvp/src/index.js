import ReactDOM from 'react-dom/client';
import "./index.css"
import React, {  } from 'react';
import Chart from "./components/chart";
import BuyButton from "./components/buybutton";





const sibbSite = <html>
                        <head>
                            <title>Should I buy Tesla?</title>
                        </head>
                        <body>
                            <h1 id="centerText">Should I buy Bitcoin? -> YES</h1>
                            <BuyButton/>
                        </body>
                        </html>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(sibbSite);