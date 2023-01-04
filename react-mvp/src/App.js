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
            <h1 id="centerText">Should I buy Bitcoin?</h1>
            {state === 'unauthorized' && <ShowChartsButton showCharts={triggerShowChartsState}/>}
            {state === 'authorized' && <Chart />}
            </body>
    );
}

export default App;