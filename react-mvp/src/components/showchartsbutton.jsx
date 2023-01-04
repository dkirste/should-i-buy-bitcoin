import React, {Component, useEffect, useState} from "react";
import "./chart.css"
import 'bootstrap/dist/css/bootstrap.css';



function ShowChartsButton(props) {


    return (<div className="card w-50 center">
            <img className="card-img-top" src="paypal_logo.png" alt="Paypal logo"/>
                <div className="card-body w-100">
                    <h5 className="card-title">Pay 1 Euro via Paypal to see results</h5>
                    <button className="btn btn-secondary btn-large w-100" onClick={props.showCharts}>Show Charts</button>
                </div>
        </div>);



}
export default ShowChartsButton