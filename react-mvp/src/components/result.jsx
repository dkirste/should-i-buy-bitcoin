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
                            <h5 className="card-title">Relative Strength Index (RSI)</h5>
                            <Chart selectedCoin={selectedCoin} metric="rsi_value"/>
                            <p className="card-text">The relative strength index (RSI) is a momentum indicator used in technical analysis. RSI measures the speed and magnitude of a security's recent price changes to evaluate overvalued or undervalued conditions in the price of that security.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row m-4">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Stochastic %K</h5>
                            <Chart selectedCoin={selectedCoin} metric="stoch_k_value"/>
                            <p className="card-text">A stochastic oscillator is a momentum indicator comparing a particular closing price of a security to a range of its prices over a certain period of time. The sensitivity of the oscillator to market movements is reducible by adjusting that time period or by taking a moving average of the result. It is used to generate overbought and oversold trading signals, utilizing a 0–100 bounded range of values.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">MACD Level</h5>
                            <Chart selectedCoin={selectedCoin} metric="macd_value"/>
                            <p className="card-text">Moving average convergence/divergence (MACD, or MAC-D) is a trend-following momentum indicator that shows the relationship between two exponential moving averages (EMAs) of a security’s price. The MACD line is calculated by subtracting the 26-period EMA from the 12-period EMA.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );

}
export default ResultPanel