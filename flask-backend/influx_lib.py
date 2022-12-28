import influxdb_client, os, time, json
from influxdb_client import InfluxDBClient, Point, WritePrecision

def setup_influx_query():
    token = "YVpXPe10vASl3jYtegtGnZzngih6RaNSG2-jzu-ScqdV8ItNWovQEDTCpdTVTVHzoDraLbKM8J0uxTf3eCKKdQ=="
    org = "sibb"
    url = "http://192.168.2.206:8086"

    client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)

    query_api = client.query_api()
    return query_api

def transform_data_structure(influx_result):
    records = json.loads(influx_result.to_json())
    new_result={}
    index = {}
    for record in records:
        if record['_measurement'] in new_result.keys():
            new_result[record['_measurement']].append({'time': record['_time'],'value': record['_value']})

        else:
            new_result[record['_measurement']] = []
            new_result[record['_measurement']].append({'time': record['_time'], 'value': record['_value']})


    return new_result

if __name__ == "__main__":
    query_api = setup_influx_query()
    query = '''
            from(bucket: "tradingviewdata")
              |> range(start: -1d)
              |> filter(fn: (r) => r["_measurement"] == "price-value")
              |> filter(fn: (r) => r["_field"] == "field1")
              |> filter(fn: (r) => r["pair"] == "btcusdt")
          '''

    result = query_api.query(query=query, org="sibb")
    transform_data_structure(result)