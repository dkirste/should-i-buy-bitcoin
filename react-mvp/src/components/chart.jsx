import {format, parseISO} from "date-fns";
import React, {useEffect, useState} from "react";
import "./chart.css"
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis, Tooltip,
} from 'recharts';

class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.selectedCoin = props.selectedCoin.toLowerCase()
        this.metric = this.props.metric
        this.state = {
            data: {}
        }
        console.log(props.sessionId)
        this.sessionId = this.props.sessionId
    }


    componentDidMount() {
        const fetchDatas = async () => {
            const res = await fetch("http://127.0.0.1:5000/"+this.selectedCoin+"/"+this.metric+"/"+this.sessionId);
            const resjson = await res.json();
            console.log(resjson);
            this.setState({data: resjson})

            //setData(data)
            //setdata(data?.data);
        };
        fetchDatas();
    }

    getData = () => {
        for (const [key, value] of Object.entries(this.state.data)) {
            if (key === this.metric) {
                return value
            }
        }
    }

    timeSeriesChart = () => {
        this.getData()
        return (<ResponsiveContainer height={300} className="center">
                <AreaChart data={this.getData()}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF9900" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#FF9900" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <Area dataKey="value" stroke="#FF9900" fill="url(#color)" />


                    <XAxis
                        dataKey="time"
                        axisLine={true}
                        tickLine={false}
                        tickFormatter={(str) => {
                            const date = parseISO(str);
                            if (parseInt((date.getTime() / 1000).toFixed(0)) % 600 < 10) {
                                console.log(parseInt((date.getTime() / 1000).toFixed(0)))
                                return format(date, "MMM, d, HH:MM");
                            }
                            return "";
                        }}
                    />

                    <YAxis
                        datakey="value"
                        axisLine={true}
                        tickLine={true}
                        tickCount={8}
                        domain={["dataMin", "dataMax"]}
                        tickFormatter={(number) => `${number.toFixed(0)}`}
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
export default Chart