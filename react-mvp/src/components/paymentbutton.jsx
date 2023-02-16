import React from "react";

function PaymentButton(props) {


    return (<div className="card w-50 center">
        <div className="card-body w-100">
            <h5 className="card-title">Pay 1 USD to see results</h5>
            <button className="btn btn-secondary btn-large w-100" onClick={props.triggerPayment}>Pay with Stripe</button>
        </div>
    </div>);



}
export default PaymentButton