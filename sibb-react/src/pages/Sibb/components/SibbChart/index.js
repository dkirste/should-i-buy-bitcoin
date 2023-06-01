import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import moment from "moment";
import MKBox from "../../../../components/MKBox";
import MKTypography from "../../../../components/MKTypography";
import Grid from "@mui/material/Grid";
import "./sibbToolTip.scss";

const CustomTooltip2 = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <MKBox
        bgColor="white"
        variant="contained"
        borderRadius="none"
        borderColor="red"
        opacity={0.7}
        shadow="lg"
        p={0}
      >
        <Grid container spacing={0}>
          <Grid item mr={4} xs={4} lg={4}>
            <MKTypography
              variant="string"
              color="black"
              fontSize={14}
              //fontFamily='"Brush Script MT", "Helvetica", "Arial", sans-serif'
            >
              {`${moment(label).format("DD/MM")}`}
            </MKTypography>
          </Grid>
          <Grid item mr={4} xs={4} lg={4}>
            <MKTypography
              variant="string"
              color="black"
              fontSize={14}
              align="right"
              //fontFamily='"Brush Script MT", "Helvetica", "Arial", sans-serif'
            >
              {`${moment(label).format("hh:mm")}`}
            </MKTypography>
          </Grid>
        </Grid>
        <Grid item mr={4} xs={4} lg={4}>
          <MKTypography
            variant="string"
            color="black"
            fontSize={13}
            //fontFamily='"Brush Script MT", "Helvetica", "Arial", sans-serif'
          >
            {payload[0].value.toFixed(2)}
          </MKTypography>
        </Grid>
      </MKBox>
    );
  }

  return null;
};

const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${moment(label).format("DD/MM hh:mm")}`}</p>
        <p className="desc"> {payload[0].value.toFixed(2)}</p>
      </div>
    );
  }

  return null;
};

class SibbChart extends React.Component {
  constructor(props) {
    super(props);
    this.selectedCoin = props.selectedCoin.toLowerCase();
    this.metric = this.props.metric;
    this.state = {
      data: {},
      decimals: {},
    };
    this.sessionId = this.props.sessionId;
  }

  componentDidMount() {
    const fetchDatas = async () => {
      const res = await fetch(
        "http://127.0.0.1:5000/" +
          this.selectedCoin +
          "/" +
          this.metric +
          "/" +
          this.sessionId
      );
      const resjson = await res.json();
      this.setState({ data: resjson });
      this.setState({ decimals: 5 - this.longestLabelLength() });

      //setData(data)
      //setdata(data?.data);
    };
    fetchDatas();
  }

  getData = () => {
    for (const [key, value] of Object.entries(this.state.data)) {
      if (key === this.metric) {
        return value;
      }
    }
  };

  longestLabelLength = () => {
    for (const [key, value] of Object.entries(this.state.data)) {
      if (key === this.metric) {
        for (const [k, v] of Object.entries(value)) {
          console.log(Math.round(v.value).toString().length);
          return Math.round(v.value).toString().length;
        }
      }
    }
  };

  timeSeriesChart = () => {
    this.getData();
    return (
      <ResponsiveContainer height={300}>
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
              return moment(str).format("hh:mm");
            }}
          />

          <YAxis
            datakey="value"
            axisLine={true}
            tickLine={true}
            tickCount={8}
            width={undefined}
            domain={["dataMin", "dataMax"]}
            tickFormatter={(number) => `${number.toFixed(0)}`}
          />

          <Tooltip
            wrapperStyle={{ outline: "none" }}
            content={<CustomTooltip />}
          />

          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  render() {
    return <div className="App">{this.timeSeriesChart()}</div>;
  }
}
export default SibbChart;
