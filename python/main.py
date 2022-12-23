import urllib.request
import json
import urllib.parse
from technicals import Compute

import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

# adding a | after the indicator name lets you define the timeframe
# |60 -> 60 minutes
# none -> 1 day
# |1W -> 1 week
# |1M -> 1 month
all_indicators = ["Recommend.Other", "Recommend.All", "Recommend.MA", "RSI", "RSI[1]", "Stoch.K", "Stoch.D",
                  "Stoch.K[1]", "Stoch.D[1]", "CCI20", "CCI20[1]", "ADX", "ADX+DI", "ADX-DI", "ADX+DI[1]",
                  "ADX-DI[1]", "AO", "AO[1]", "AO[2]", "Mom", "Mom[1]", "MACD.macd", "MACD.signal", "Rec.Stoch.RSI",
                  "Stoch.RSI.K", "Rec.WR", "W.R", "Rec.BBPower", "BBPower", "Rec.UO", "UO", "EMA10", "close",
                  "SMA10", "EMA20", "SMA20", "EMA30", "SMA30", "EMA50", "SMA50", "EMA100", "SMA100", "EMA200",
                  "SMA200", "Rec.Ichimoku", "Ichimoku.BLine", "Rec.VWMA", "VWMA", "Rec.HullMA9", "HullMA9",
                  "Pivot.M.Classic.S3", "Pivot.M.Classic.S2", "Pivot.M.Classic.S1", "Pivot.M.Classic.Middle",
                  "Pivot.M.Classic.R1", "Pivot.M.Classic.R2", "Pivot.M.Classic.R3", "Pivot.M.Fibonacci.S3",
                  "Pivot.M.Fibonacci.S2", "Pivot.M.Fibonacci.S1", "Pivot.M.Fibonacci.Middle",
                  "Pivot.M.Fibonacci.R1", "Pivot.M.Fibonacci.R2", "Pivot.M.Fibonacci.R3", "Pivot.M.Camarilla.S3",
                  "Pivot.M.Camarilla.S2", "Pivot.M.Camarilla.S1", "Pivot.M.Camarilla.Middle",
                  "Pivot.M.Camarilla.R1", "Pivot.M.Camarilla.R2", "Pivot.M.Camarilla.R3", "Pivot.M.Woodie.S3",
                  "Pivot.M.Woodie.S2", "Pivot.M.Woodie.S1", "Pivot.M.Woodie.Middle", "Pivot.M.Woodie.R1",
                  "Pivot.M.Woodie.R2", "Pivot.M.Woodie.R3", "Pivot.M.Demark.S1", "Pivot.M.Demark.Middle",
                  "Pivot.M.Demark.R1"]


def get_all_indicators(exchange, symbol):
    """
    This function is used to get all indicators of the provided symbol.
    :param symbol: must be provided as: exchange:symbol
    :return: json object of indicators
    """

    # define the url for the api request
    url = "https://scanner.tradingview.com/crypto/scan"

    # create payload to request correct ticker and column
    payload = {
        "symbols": {"tickers": [f"{exchange}:{symbol}"]},
        "columns": all_indicators,
    }

    # encode the payload
    data = bytes(json.dumps(payload), encoding='utf-8')

    # get the response
    response = urllib.request.urlopen(url, data=data)

    jsonres = json.loads(response.read())

    # reformat and return
    return extract_and_reformat(jsonres['data'][0]['d'])


def extract_and_reformat(api_json):
    reformattedjson = {}
    i = 0
    for value in api_json:
            reformattedjson[all_indicators[i]] = value
            i += 1
    return reformattedjson


def setup_influxwriter():
    token = "lQqjs8ps4htbBPYhegUDytN6K4CjDe07W0x2Fu5bwZv7D0dyw7BwYErcki9syacF7Pqnzm0b85-VSS7mFZ-_Ww=="
    org = "sibb"
    url = "http://127.0.0.1:8086"

    client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)

    write_api = client.write_api(write_options=SYNCHRONOUS)
    return write_api


def strToNum(str):
    if str == "STRONG_SELL":
        return 1
    elif str == "SELL":
        return 2
    elif str == "NEUTRAL":
        return 3
    elif str == "BUY":
        return 4
    elif str == "STRONG_BUY":
        return 5
    else:  # ERROR
        return -1


def send_data_to_influxdb(ind, influx_writer):
    points = []

    # OSCILATORS
    # RSI
    if ind['RSI'] is not None and ind['RSI[1]'] is not None:
        res = Compute.RSI(ind['RSI'], ind['RSI[1]'])
        signal = strToNum(res)
        p = (
            Point("rsi-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("rsi-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['RSI'])
        )
        points.append(p)

    # Stoch %K
    if ind['Stoch.K'] is not None and ind['Stoch.D'] is not None and ind['Stoch.K[1]'] is not None and ind[
        'Stoch.D[1]'] is not None:
        res = Compute.Stoch(ind['Stoch.K'], ind['Stoch.D'], ind['Stoch.K[1]'], ind['Stoch.D[1]'])
        signal = strToNum(res)
        p = (
            Point("stoch-k-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("stoch-k-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['Stoch.K'])
        )
        points.append(p)

    # CCI (20)
    if ind['CCI20'] is not None and ind['CCI20[1]'] is not None:
        res = Compute.CCI20(ind['CCI20'], ind['CCI20[1]'])
        signal = strToNum(res)
        p = (
            Point("cci-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("cci-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['CCI20'])
        )
        points.append(p)

    # ADX (14)
    if ind['ADX'] is not None and ind['ADX+DI'] is not None and ind['ADX-DI'] is not None and ind[
        'ADX+DI[1]'] is not None and ind['ADX-DI[1]']:
        res = Compute.ADX(ind['ADX'], ind['ADX+DI'], ind['ADX-DI'], ind['ADX+DI[1]'], ind['ADX-DI[1]'])
        signal = strToNum(res)
        p = (
            Point("adx-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("adx-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['ADX'])
        )
        points.append(p)

    # AO
    if ind['AO'] is not None and ind['AO[1]'] is not None and ind['AO[2]']:
        res = Compute.AO(ind['AO'], ind['AO[1]'], ind['AO[2]'])
        signal = strToNum(res)
        p = (
            Point("ao-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("ao-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['AO'])
        )
        points.append(p)

    # Mom (10)
    if ind['Mom'] is not None and ind['Mom[1]'] is not None:
        res = Compute.Mom(ind['Mom'], ind['Mom[1]'])
        signal = strToNum(res)
        p = (
            Point("mom-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("mom-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['Mom'])
        )
        points.append(p)

    # MACD
    if ind['MACD.macd'] is not None and ind['MACD.signal'] is not None:
        res = Compute.MACD(ind['MACD.macd'], ind['MACD.signal'])
        signal = strToNum(res)
        p = (
            Point("macd-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("macd-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['MACD.macd'])
        )
        points.append(p)

    # Stoch RSI
    if ind['Rec.Stoch.RSI'] != None:
        res = Compute.Simple(ind['Rec.Stoch.RSI'])
        signal = strToNum(res)
        p = (
            Point("stoch-rsi-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("stoch-rsi-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['Rec.Stoch.RSI'])
        )
        points.append(p)

    # W%R
    if ind['Rec.WR'] != None:
        res = Compute.Simple(ind['Rec.WR'])
        signal = strToNum(res)
        p = (
            Point("wr-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("wr-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['Rec.WR'])
        )
        points.append(p)

    # BBP
    if ind['Rec.BBPower'] != None:
        res = Compute.Simple(ind['Rec.BBPower'])
        signal = strToNum(res)
        p = (
            Point("bbp-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("bbp-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['Rec.BBPower'])
        )
        points.append(p)

    # UO
    if ind['Rec.UO'] != None:
        res = Compute.Simple(ind['Rec.UO'])
        signal = strToNum(res)
        p = (
            Point("uo-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("uo-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['Rec.UO'])
        )
        points.append(p)

    # MOVING AVERAGES
    # EMA 10
    ma_list = ["EMA10", "SMA10", "EMA20", "SMA20", "EMA30", "SMA30",
               "EMA50", "SMA50", "EMA100", "SMA100", "EMA200", "SMA200"]
    for ma in ma_list:
        ma_name = ma.lower()
        res = Compute.MA(ind[ma], ind['close'])
        signal = strToNum(res)
        p = (
            Point(ma_name + "-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point(ma_name + "-value")
                .tag("pair", "btcusdt")
                .field("field1", ind[ma])
        )
        points.append(p)

    # MOVING AVERAGES pt. 2
    # Ichimoku
    if ind['Rec.Ichimoku'] != None:
        res = Compute.Simple(ind['Rec.Ichimoku'])
        signal = strToNum(res)
        p = (
            Point("ichimoku-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("ichimoku-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['Rec.Ichimoku'])
        )
        points.append(p)

    # Rec.VWMA
    if ind['Rec.VWMA'] != None:
        res = Compute.Simple(ind['Rec.VWMA'])
        signal = strToNum(res)
        p = (
            Point("vwma-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("vwma-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['Rec.VWMA'])
        )
        points.append(p)

    # HullMA
    if ind['Rec.HullMA9'] != None:
        res = Compute.Simple(ind['Rec.HullMA9'])
        signal = strToNum(res)
        p = (
            Point("hullma9-signal")
                .tag("pair", "btcusdt")
                .field("field1", signal)
        )
        points.append(p)
        p = (
            Point("hullma9-value")
                .tag("pair", "btcusdt")
                .field("field1", ind['Rec.HullMA9'])
        )
        points.append(p)

    # Add close point
    p = (
        Point("price-value")
            .tag("pair", "btcusdt")
            .field("field1", ind['close'])
    )
    points.append(p)

    # SEND DATA TO INFLUX
    influx_writer.write(bucket="tradingviewdata", org="sibb", record=points)


if __name__ == "__main__":
    influx_writer = setup_influxwriter()
    while True:
        indi = get_all_indicators("BINANCE", "BTCUSDT")
        send_data_to_influxdb(indi, influx_writer)
        time.sleep(5)
