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
    status, token = stribe_lib.check_payment_status(stribeSessionId, stripe.api_key)
    if status == 'paid':
        pass
    elif stribeSessionId == 'test':
        pass
    else:
        return ""
        #return ""
    # Create influx query api
    query_api = influx_lib.setup_influx_query()

    # get latest results of the api
    query = f'''
            from(bucket: "tradingviewdata")
              |> range(start: -15m)
              |> filter(fn: (r) => r["_measurement"] == "{measurement}")
              |> filter(fn: (r) => r["_field"] == "field1")
              |> filter(fn: (r) => r["pair"] == "btcusdt")
          '''
    influx_res = query_api.query(query=query, org="sibb")
    fin_res = influx_lib.transform_data_structure(influx_res)
    return fin_res

@app.route('/v2/bitcoin/<measurement>/<stribeSessionId>')
@cross_origin()
def bitcoin_price_value_v2(measurement, stribeSessionId):
    status, token = stribe_lib.check_payment_status(stribeSessionId, stripe.api_key)
    if status == 'paid':
        pass
    elif stribeSessionId == 'test':
        pass
    else:
        return ""
        #return ""
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
    fin_res = influx_lib.transform_data_structure_v2(influx_res)
    return fin_res


@app.route('/checkout/<selectedCoin>/<refCode>', methods=['GET'])
@cross_origin()
def checkout(selectedCoin, refCode):
    print(selectedCoin)
    selectedCoin = selectedCoin.lower()
    refCode = refCode.lower()
    checkout_session = stripe.checkout.Session.create(
        line_items=[
            {
                'price_data': {
                    'product_data': {
                        'name': f"Should I Buy Bitcoin",
                        'description': f"{selectedCoin}"
                    },
                    'unit_amount': 100,
                    'currency': 'usd',
                },
                'quantity': 1,
            },
        ],
        payment_method_types=['card'],
        mode='payment',
        success_url='http://127.0.0.1:3000/analysis?id={CHECKOUT_SESSION_ID}',
        cancel_url='http://127.0.0.1:3000',
        metadata={'token':f"{selectedCoin}",
                  'refCode':f"{refCode}"}
    )
    print(checkout_session)
    return checkout_session


@app.route('/checkpayment/<stribeSessionId>', methods=['GET'])
@cross_origin()
def checkpayment(stribeSessionId):
    print(stribe_lib.check_payment_status(stribeSessionId, stripe.api_key))
    status, token = stribe_lib.check_payment_status(stribeSessionId, stripe.api_key)
    return {'status': status, 'token': token}


if __name__ == '__main__':
    app.run()
