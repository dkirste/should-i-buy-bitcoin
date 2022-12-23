import urllib.request
import json
import urllib.parse

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
    print(jsonres)
    # reformat and return
    return extract_and_reformat(jsonres)


def extract_and_reformat(api_json):
    reformattedjson = {}
    for data in api_json['data']:
        symbol = data['s']
        reformattedjson[symbol] = {}

        i = 0
        for value in data['d']:
            reformattedjson[symbol][all_indicators[i]] = value
            i += 1
    return reformattedjson


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print(get_all_indicators("BINANCE", "BTCUSDT"))
