import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"

const myFirstElement = <html>
                        <head>
                            <title>Should I buy Tesla?</title>
                        </head>
                        <body>
                            <h1 id="centerText">Should I buy Tesla?</h1>
                        </body>
                        </html>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myFirstElement);