import ShowChartsButton from "./components/showchartsbutton";
import {useEffect, useState} from 'react'
import ResultPanel from "./components/result";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {DropdownButton, Dropdown, Container} from "react-bootstrap";
import PaymentButton from "./components/paymentbutton"






function App() {

    const [selectedCoin, setSelectedCoin] = useState('Bitcoin')
    const [paymentStatus, setPaymentStatus] = useState('init')
    const queryParameters = new URLSearchParams(window.location.search)

    useEffect(() => {
        // Update the document title using the browser API
        const err = updatePaymentStatus();
    });


    const triggerShowChartsState = () => {
        console.log("Setting state!");
        setPaymentStatus('authorized');
    }

    const handleSelect = (e) => {
        setSelectedCoin(e)
    }

    const triggerPayment = async () => {
        const sessionId = await retrieveNewSession()
        console.log(sessionId)
        window.location.href = sessionId.url
    }

    const retrieveNewSession = async () => {
        const res = await fetch("http://127.0.0.1:5000/checkout/"+selectedCoin);
        return await res.json();
    };

    const updatePaymentStatus = async () => {
        const sessionId = queryParameters.get("id")
        let status = 'unpaid'
        setPaymentStatus('unpaid')
        if (sessionId !== undefined) {
            const res = await fetch("http://127.0.0.1:5000/checkpayment/"+sessionId);
            const resString = await res.json()
            console.log(resString)
            status = resString.status
        }

        if (status === 'paid') {
            setPaymentStatus('paid')
        }
        else {
            setPaymentStatus('unpaid')
        }
    }


    const getUrlSessionId = () => {
        const sessionId = queryParameters.get("id")
        console.log(sessionId)
        return(sessionId)
    }

    return (
            <body>
            <div id="mainpage">
                <div >
                    <p id="shouldibuytext">Should I Buy Now?</p>
                    <p id="shouldibuysubtext">Find out if it is the right moment to buy a Cryptocurrency without looking into all the technical signals by yourself!</p>
                </div>
                <div id="buttondiv" className="d-flex justify-content-center">
                    <div className="btn-group">
                        <DropdownButton
                            alignRight
                            title={selectedCoin}
                            id="coin-dropdown"
                            variant="secondary"
                            size="lg"
                            onSelect={handleSelect}
                        >
                            <Dropdown.Item eventKey="Bitcoin">Bitcoin</Dropdown.Item>
                            <Dropdown.Item eventKey="Ehereum">Ethereum</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="Cosmos">Cosmos</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                {paymentStatus === 'unpaid' && <div>
                    <PaymentButton selectedCoin={selectedCoin} triggerPayment={triggerPayment}/>
                </div>
                }
                {paymentStatus === 'paid' && <ResultPanel selectedCoin={selectedCoin} sessionId={getUrlSessionId()}/>}
            </div>
            </body>
    );
}

export default App;