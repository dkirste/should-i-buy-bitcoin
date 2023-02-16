import requests
import json
from requests.auth import HTTPBasicAuth

def check_payment_status(session_id, api_key):
    basic = HTTPBasicAuth(api_key, '')

    res = requests.get(f"https://api.stripe.com/v1/checkout/sessions/{session_id}", auth=basic)
    if not 'payment_status' in res.json().keys():
        print('failed')
        return 'failed'

    if res.json()['payment_status'] == 'paid':
        return 'paid'
    else:
        return 'unpaid'