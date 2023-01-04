import ShowChartsButton from "./components/buybutton";
import { useState } from 'react'
import Chart from "./components/chart";



function App() {

    const [state, setState] = useState('unauthorized')


    const triggerShowChartsState = () => {
        console.log("Setting state!")
        setState('authorized')
    }

    return (
            <body>
            <h1 id="centerText">Should I buy Bitcoin? -> YES</h1>
            <ShowChartsButton showCharts={triggerShowChartsState}/>
            {state === 'authorized' && <Chart />}
            </body>
    );
}

export default App;