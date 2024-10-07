import requests
import time
from model.bikestation2 import BikeStation2

def extract_station_status(response):
    fullStation_data = []
    for station in response["data"]["stations"]:
        station_info = {
            "id": station["station_id"],
            "num_bikes_available": station.get("num_bikes_available", 0),
            "num_bikes_overflow": station.get("num_bikes_overflow", 0),
            "num_bikes_disabled": station.get("num_bikes_disabled", 0),
            "num_docks_available": station.get("num_docks_available", 0),
            "num_docks_disabled": station.get("num_docks_disabled", 0),
            "is_charging_station": station.get("is_charging_station", True),
            "status": station.get("status", "IN_SERVICE"),
            "is_renting": station.get("is_renting", False),
            "is_returning": station.get("is_returning", False),
        }
        # Checking if last reported time is available and adding it to the parsed data
        if "last_reported" in station:
            station_info["last_reported"] = station["last_reported"]
        fullStation_data.append(station_info)
    #print(fullStation_data)
    return fullStation_data
def loadStationfromPBSC(url_status):
    max_retries = 3
    attempt = 0
    while attempt < max_retries:
        try:
            response = requests.get(url_status)
            if response.status_code == 200:
                return extract_station_status(response.json())
            else:
                attempt += 1
                time.sleep(5)
        except requests.exceptions.RequestException as e:
            if isinstance(e, requests.exceptions.ReadTimeout):
                time.sleep(5)
                attempt += 1
            else:
                time.sleep(5)
                attempt += 1
    else:
       pass

def extract_station_information(data):
    # Accede a la lista de estaciones
    full_details_station_data = []
    for station in data["data"]["stations"]:
        station_info = {
            "id": station["station_id"],
            "name": station["name"],
            "lat": station["lat"],
            "lon": station["lon"],
            "address": station.get("address", ""),
            "capacity": station.get("capacity", 0),
            "geofenced_capacity": station.get("geofenced_capacity", 0),
        }
        if "station_area" in station and station["station_area"] is not None and "coordinates" in station["station_area"] and station["station_area"]["coordinates"] is not None:
            polygon_coordinates = [item for sublist in station['station_area']['coordinates'][0] for item in sublist]
        else:
            polygon_coordinates = []
        station_info["geofence"] = polygon_coordinates
        full_details_station_data.append(station_info)
        # print(full_details_station_data)
    # full_details_station_data.sort(key=lambda x: x['id'])
    # final_data = {"stations": full_details_station_data}
    return full_details_station_data
def loadAllDetailsfromPBSC(url_details):
    max_retries = 3
    attempt = 0
    while attempt < max_retries:
        try:
            response = requests.get(url_details)
            if response.status_code == 200:
                return extract_station_information(response.json())
            else:
                attempt += 1
                time.sleep(5)
        except requests.exceptions.RequestException as e:
            if isinstance(e, requests.exceptions.ReadTimeout):
                time.sleep(5)
                attempt += 1
            else:
                time.sleep(5)
                attempt += 1
    else:
       pass  
def merge_station_data(full_station_data, full_details_station_data):
    # Create a dictionary to store details using station ID as the key
    if full_details_station_data is not None:
        station_details_dict = {station_details['id']: station_details for station_details in full_details_station_data}
    else:
        from app import app_logger
        app_logger.warning("Error while processing merge_station_data() with a None full_details_station_data")
        return None
    merged_stations = []

    if full_station_data is not None:
        for station_data in full_station_data:
            station_id = station_data['id']
            if station_id in station_details_dict:
                details = station_details_dict[station_id]
                merged_station =BikeStation2 (
                    station_id=station_id,
                    num_bikes_available=station_data.get('num_bikes_available', 0),
                    num_bikes_overflow=station_data.get('num_bikes_overflow', 0),
                    num_bikes_disabled=station_data.get('num_bikes_disabled', 0),
                    num_docks_available=station_data.get('num_docks_available', 0),
                    num_docks_disabled=station_data.get('num_docks_disabled', 0),
                    last_reported=station_data.get('last_reported', 0),
                    is_charging_station=station_data.get('is_charging_station', False),
                    status=station_data.get('status', ''),
                    is_renting=station_data.get('is_renting', False),
                    is_returning=station_data.get('is_returning', False),
                    name=details.get('name', ''),
                    location = (details.get('lat', 0.0), details.get('lon', 0.0)),
                    address=details.get('address', ''),
                    capacity=details.get('capacity', 0),
                    geofenced_capacity=details.get('geofenced_capacity', 0),
                    geofence=details.get('geofence', 0),
                )

                # Append the merged station to the list
                merged_stations.append(merged_station)
        return merged_stations 
    else:
        from app import app_logger
        app_logger.warning("Error while processing merge_station_data() with a None full_station_data")
        return None

def return_merged_stations(url_status,url_details):
    return merge_station_data(loadStationfromPBSC(url_status), loadAllDetailsfromPBSC(url_details))
