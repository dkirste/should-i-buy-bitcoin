import ShowChartsButton from "./components/showchartsbutton";
import { useState } from 'react'
import Chart from "./components/chart";
import ResultPanel from "./components/result";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {DropdownButton, Dropdown} from "react-bootstrap";





function App() {

    const [selectedCoin, setSelectedCoin] = useState('Bitcoin')
    const [authStatus, setAuthStatus] = useState('unauthorized')


    const triggerShowChartsState = () => {
        console.log("Setting state!");

        setAuthStatus('authorized');
    }

    const handleSelect = (e) => {
        setSelectedCoin(e)
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
            {authStatus === 'unauthorized' && <ShowChartsButton showCharts={triggerShowChartsState}/>}
            {authStatus === 'authorized' && <ResultPanel />}
            </body>
    );
}

export default App;