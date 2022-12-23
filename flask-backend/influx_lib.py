import influxdb_client, os, time, json
from influxdb_client import InfluxDBClient, Point, WritePrecision

def setup_influx_query():
    token = "q-gAX6R9BYtUHGko0H1_5xnRsPG6u_p99GNoyOmVWtPxVACiKSLy8v3u48Lcm0CS3j0SjcfW06o1Oki0zzGLgQ=="
    org = "sibb"
    url = "http://127.0.0.1:8086"

    client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)

    query_api = client.query_api()
    return query_api

def transform_data_structure(influx_result):
    records = json.loads(influx_result.to_json())
    new_result={}
    index = {}
    for record in records:
        if record['_measurement'] in new_result.keys():
            new_result[record['_measurement']][index[record['_measurement']]] = {'time': record['_time'],'value': record['_value']}
            index[record['_measurement']] += 1
        else:
            new_result[record['_measurement']] = {}
            index[record['_measurement']] = 0
            new_result[record['_measurement']][index[record['_measurement']]] = {'time': record['_time'], 'value': record['_value']}
            index[record['_measurement']] += 1


    return new_result

if __name__ == "__main__":
    query_api = setup_influx_query()
    query = '''
            from(bucket: "tradingviewdata")
              |> range(start: -1h)
              |> filter(fn: (r) => r["_measurement"] == "price-value")
              |> filter(fn: (r) => r["_field"] == "field1")
              |> filter(fn: (r) => r["pair"] == "btcusdt")
          '''

    result = query_api.query(query=query, org="sibb")
    transform_data_structure(result)