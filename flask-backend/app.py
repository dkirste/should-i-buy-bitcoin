from flask import Flask
import influx_lib
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)


@app.route('/bitcoin/<measurement>')
@cross_origin()
def bitcoin_price_value(measurement):  # put application's code here
    # Create influx query api
    query_api = influx_lib.setup_influx_query()

    # get latest results of the api
    query = f'''
            from(bucket: "tradingviewdata")
              |> range(start: -1h)
              |> filter(fn: (r) => r["_measurement"] == "{measurement}")
              |> filter(fn: (r) => r["_field"] == "field1")
              |> filter(fn: (r) => r["pair"] == "btcusdt")
          '''
    influx_res = query_api.query(query=query, org="sibb")
    fin_res = influx_lib.transform_data_structure(influx_res)
    return fin_res


if __name__ == '__main__':
    app.run()
