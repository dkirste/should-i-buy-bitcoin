from flask import Flask
import influx_lib
import stribe_lib
import json
import stripe
from flask_cors import CORS, cross_origin

app = Flask(__name__)
stripe.api_key = 'sk_test_51MT9rdCucEhG8tYmfVzmXd65sQsyz2TQLN4BQCR7gthMo2wU2A2NF1QNFs8fBcPn8i0thYV0rYGFLOulAC9N0R1a00vvy193NG'

@app.route('/bitcoin/<measurement>/<stribeSessionId>')
@cross_origin()
def bitcoin_price_value(measurement, stribeSessionId):
    if stribe_lib.check_payment_status(stribeSessionId, stripe.api_key) == 'paid':
        pass
    else:
        return ""
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


@app.route('/checkout/<selectedCoin>', methods=['GET'])
@cross_origin()
def checkout(selectedCoin):
    checkout_session = stripe.checkout.Session.create(
        line_items=[
            {
                'price_data': {
                    'product_data': {
                        'name': f"SIBB | {selectedCoin}",
                    },
                    'unit_amount': 100,
                    'currency': 'usd',
                },
                'quantity': 1,
            },
        ],
        payment_method_types=['card'],
        mode='payment',
        success_url='http://127.0.0.1:3000?id={CHECKOUT_SESSION_ID}',
        cancel_url='http://127.0.0.1:3000',
    )
    print(checkout_session)
    return checkout_session


@app.route('/checkpayment/<stribeSessionId>', methods=['GET'])
@cross_origin()
def checkpayment(stribeSessionId):
    if stribe_lib.check_payment_status(stribeSessionId, stripe.api_key) == 'paid':
        return {'status': 'paid'}
    else:
        return {'status': 'unpaid'}

if __name__ == '__main__':
    app.run()
