import ShowChartsButton from "./components/showchartsbutton";
import { useState } from 'react'
import ResultPanel from "./components/result";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {DropdownButton, Dropdown} from "react-bootstrap";
import PaymentButton from "./components/paymentbutton"






function App() {

    const [selectedCoin, setSelectedCoin] = useState('Bitcoin')
    const [authStatus, setAuthStatus] = useState('unauthorized')
    const queryParameters = new URLSearchParams(window.location.search)




    const triggerShowChartsState = () => {
        console.log("Setting state!");

        setAuthStatus('authorized');
    }

    const handleSelect = (e) => {
        setSelectedCoin(e)
    }

    const triggerPayment = async () => {
        const sessionId = await retrievNewSession()
        console.log(sessionId)
        window.location.href = sessionId.url
    }

    const retrievNewSession = async () => {
        const res = await fetch("http://127.0.0.1:5000/checkout");
        const resjson = await res.json();
        return resjson
    };

    const checkPayment = () => {
        const paymentStatus = queryParameters.get("status")
        console.log(paymentStatus)
        if (paymentStatus === 'success') {
            return 'success'
        }
        else {
            return 'cancel'
        }
    }

    const getUrlSessionId = () => {
        const sessionId = queryParameters.get("id")
        console.log(sessionId)
        return(sessionId)
    }

    return (
            <body>
            <h1 id="centerText">Should I buy <div className="btn-group">
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
            </div>?</h1>
            {checkPayment() !== 'success' && <div>
                <ShowChartsButton showCharts={triggerShowChartsState}/>
                <PaymentButton triggerPayment={triggerPayment}/>
            </div>
}
            {checkPayment() === 'success' && <ResultPanel selectedCoin={selectedCoin} sessionId={getUrlSessionId()}/>}
            </body>
    );
}

export default App;