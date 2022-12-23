import ReactDOM from 'react-dom/client';
import "./index.css"
import React, {  } from 'react';
import { format, parseISO } from "date-fns";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis, Tooltip,
} from 'recharts';


const data = [{time: '2022-12-23T13:30:34.110567+00:00', value: 400}, {time: '2022-12-23T13:31:34.110567+00:00', value: 200}, {time: '2022-12-23T13:32:34.110567+00:00', value: 500},];

const TimeSeriesChart = (
    <ResponsiveContainer width="80%" height={400} className="center">
        <AreaChart data={data}>
            <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF9900" stopOpacity={0.4} />
                    <stop offset="75%" stopColor="#FF9900" stopOpacity={0.05} />
                </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#FF9900" fill="url(#color)" />


            <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tickFormatter={(str) => {
                    const date = parseISO(str);
                    if (date.getMinutes() % 30 === 0) {
                        return format(date, "MMM, d, HH:MM");
                    }
                    return "";
                }}
            />

            <YAxis
                datakey="value"
                axisLine={false}
                tickLine={false}
                tickCount={8}
                tickFormatter={(number) => `$${number.toFixed(2)}`}
            />

            <Tooltip/>

            <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
    </ResponsiveContainer>
);



const myFirstElement = <html>
                        <head>
                            <title>Should I buy Tesla?</title>
                        </head>
                        <body>
                            <h1 id="centerText">Should I buy Bitcoin? -> YES</h1>
                            {TimeSeriesChart}
                        </body>
                        </html>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myFirstElement);