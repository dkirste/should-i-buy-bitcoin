import requests
import json
from requests.auth import HTTPBasicAuth

# We should make the cache circular in the future :)
cache = {}

def check_payment_status(session_id, api_key):
    res = ""

    if session_id in cache.keys():
        print("Cache hit!")
        res = cache[session_id]
    else:
        basic = HTTPBasicAuth(api_key, '')
        res = requests.get(f"https://api.stripe.com/v1/checkout/sessions/{session_id}", auth=basic).json()
        if not 'payment_status' in res.keys():
            print(f"{session_id}-{res}")
            return ('failed', "none")
        cache[session_id]=res




    if res['payment_status'] == 'paid':
        return ('paid', res['metadata']['token'])
    else:
        return ('unpaid', "none")