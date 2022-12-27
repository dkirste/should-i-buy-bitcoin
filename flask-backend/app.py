from flask import Flask
import influx_lib
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)


@app.route('/bitcoin')
@cross_origin()
def hello_world():  # put application's code here
    query_api = influx_lib.setup_influx_query()
    # get latest results of the api
    query = '''
            from(bucket: "tradingviewdata")
              |> range(start: -1h)
              |> filter(fn: (r) => r["_measurement"] == "price_value")
              |> filter(fn: (r) => r["_field"] == "field1")
              |> filter(fn: (r) => r["pair"] == "btcusdt")
          '''
    influx_res = query_api.query(query=query, org="sibb")
    fin_res = influx_lib.transform_data_structure(influx_res)
    return fin_res


if __name__ == '__main__':
    app.run()
