import ShowChartsButton from "./components/showchartsbutton";
import { useState } from 'react'
import Chart from "./components/chart";
import ResultPanel from "./components/result";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';





function App() {

    const [state, setState] = useState('unauthorized')


    const triggerShowChartsState = () => {
        console.log("Setting state!")
        setState('authorized')
    }

    return (
            <body>
            <h1 id="centerText">Should I buy <div className="btn-group">
                <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    Bitcoin
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item">Bitcoin</a>
                    <a className="dropdown-item">Ethereum</a>
                    <a className="dropdown-item">Atom</a>
                </div>
            </div>?</h1>
            {state === 'unauthorized' && <ShowChartsButton showCharts={triggerShowChartsState}/>}
            {state === 'authorized' && <ResultPanel />}
            </body>
    );
}

export default App;