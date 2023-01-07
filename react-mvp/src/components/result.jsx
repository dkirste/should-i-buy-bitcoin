import React, {Component, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Chart from "./chart";



function ResultPanel(selectedCoin) {
    console.log(selectedCoin)


    return (
        <div>
            <div className="alert alert-success m-4" role="alert">
                <h4 className="alert-heading">Yes! You should buy bitcoin</h4>
                <p>All inidicators are good for you, so lets go and hodl.</p>
                <hr/>
                    <p className="mb-0">Currently statically generated - but it is always a good time to hodl some bitcoin ;)</p>
            </div>
            <div className="row m-4">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Bitcoin Price Development</h5>
                            <Chart selectedCoin={selectedCoin} metric="price_value"/>
                            <p className="card-text">The most recent price development of bitcoin.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Bitcoin RSI</h5>
                            <Chart selectedCoin={selectedCoin} metric="rsi_value"/>
                            <p className="card-text">RSI of bitcoin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );

}
export default ResultPanel