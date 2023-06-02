import influxdb_client, os, time, json
from influxdb_client import InfluxDBClient, Point, WritePrecision

def setup_influx_query():
    token = "dIaHfG3MB3DSBSzjU0uj6CrfoQTcp2doQpaN-Oj1II3pvwLYflnXF_Sof4iNufr8wrsPZHeFErYPeGNxQvSZiw=="
    org = "sibb"
    url = "http://85.214.130.182:8086"

    client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)

    query_api = client.query_api()
    return query_api

def transform_data_structure(influx_result):
    records = json.loads(influx_result.to_json())
    new_result={}
    for record in records:
        if record['_measurement'] in new_result.keys():
            new_result[record['_measurement']].append({'time': record['_time'],'value': record['_value']})

        else:
            new_result[record['_measurement']] = []
            new_result[record['_measurement']].append({'time': record['_time'], 'value': record['_value']})


    return new_result

def transform_data_structure_v2(influx_result):
    records = json.loads(influx_result.to_json())
    new_result={}
    for record in records:
        if "value" in new_result.keys():
            new_result["value"][record['_time']] = record['_value']

        else:
            new_result["value"] = {}
            new_result["value"][record['_time']] = record['_value']

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