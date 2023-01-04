import React, {Component, useEffect, useState} from "react";
import "./chart.css"
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis, Tooltip,
} from 'recharts';
import {format, parseISO} from "date-fns";


class BuyButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {"price_value":[{"time": "2022-12-27T14:39:38.580057+00:00", "value": "16761.06"}, {"time": "2022-12-27T14:38:38.580057+00:00", "value": "16760.06"}]}
            }
    }


    componentDidMount() {
        const fetchDatas = async () => {

            const res = await fetch("http://127.0.0.1:5000/bitcoin/price_value");
            const resjson = await res.json();
            console.log(resjson);
            this.setState({data: resjson})

            //setData(data)
            //setdata(data?.data);
        };
        fetchDatas();
    }

    timeSeriesChart = () => {
        return (<ResponsiveContainer width="80%" height={400} className="center">
            <AreaChart data={this.state.data.price_value}>
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
                        if (date.getMinutes() % 10 === 0) {
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
                    domain={["dataMin", "dataMax"]}
                    tickFormatter={(number) => `$${number.toFixed(0)}`}
                />

                <Tooltip/>

                <CartesianGrid opacity={0.1} vertical={false} />
            </AreaChart>
        </ResponsiveContainer>
    );}



    render() {
        return (
        <div className="App">
            {this.timeSeriesChart()}
        </div>
    );
    }
}
export default BuyButton