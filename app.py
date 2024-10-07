from flask import Flask, redirect, render_template, request,session, url_for
from flask_googlemaps import GoogleMaps
from flask_googlemaps import Map
import requests
import threading
import time
from datetime import timedelta
import logging
import json
import os
import api_pbsc
import app_drawer

google_apikey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao" #TEST KEY :D
refresh_interval = 30 #seconds
app = Flask(__name__, template_folder="templates",static_url_path='/static')

app.config['REMEMBER_COOKIE_DURATION'] = timedelta(days=28)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=28)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['REMEMBER_COOKIE_SECURE'] = True
app.config['FLASK_ENV']= 'production'
app.config['SESSION_PERMANENT'] = False

if os.getenv('FLASK_DEBUG') != '1':
    print("The FLASK_DEBUG is OFF this PROD!")

app.config['MESSAGE_FLASHING_OPTIONS'] = {'duration': 6}

logging.basicConfig(level=logging.WARN)
app_logger = app.logger
app_logger.warning("BiciMadrid Lite Running!")

def get_logger():
    return app_logger

app.logger = get_logger()
def loadStation():
    cities = ["madrid", "barcelona", "bilbao","hospitalet","acoruna","sansebastian","valladolid","laspalmas"]
    for city in cities:
        if city =="bilbao":
            url_status = f"https://gbfs.nextbike.net/maps/gbfs/v2/nextbike_bo/es/station_status.json"
            url_details = f"https://gbfs.nextbike.net/maps/gbfs/v2/nextbike_bo/es/station_information.json"
        elif city =="hospitalet":
            url_status = f"https://gbfs.nextbike.net/maps/gbfs/v2/nextbike_bs/es/station_status.json"
            url_details = f"https://gbfs.nextbike.net/maps/gbfs/v2/nextbike_bs/es/station_information.json"
        elif city =="sansebastian":
            url_status = f"https://{city}.publicbikesystem.net/customer/ube/gbfs/v1/en/station_status"
            url_details = f"https://{city}.publicbikesystem.net/customer/ube/gbfs/v1/en/station_information"
        elif city =="laspalmas":
            url_status = f"https://gbfs.nextbike.net/maps/gbfs/v2/nextbike_el/es/station_status.json"
            url_details = f"https://gbfs.nextbike.net/maps/gbfs/v2/nextbike_el/es/station_information.json"
        else:              
            url_status = f"https://{city}.publicbikesystem.net/customer/gbfs/v2/en/station_status"
            url_details = f"https://{city}.publicbikesystem.net/customer/gbfs/v2/en/station_information"


        response_api_pbsc = api_pbsc.return_merged_stations(url_status, url_details)
        if response_api_pbsc is not None:
            # Create a new marker list for the city if not exists
            if city not in city_marker_data:
                city_marker_data[city] = []
            # Append markers to the specific city's marker list
            app_drawer.create_new_markerPBSC(response_api_pbsc, city_marker_data[city])
        
city_marker_data = {}

GoogleMaps(app,key=google_apikey,)

first_request = True

@app.before_request
def handle_before_first_request():
    global first_request
    if first_request:
        items = [1558, 1559, 261]
        thread = MyThread(stop_event, app, (items,))
        thread.start()
        first_request = False
        app_logger.warning("handle_before_first_request -> Starting MyThread")

@app.route('/manifest.json')
def manifest():
    return app.send_static_file('manifest.json')

default_coordinates = {
    'madrid': {'lat': 40.4165873, 'lng': -3.7033305},
    'barcelona': {'lat': 41.3851, 'lng': 2.1734},
    'bilbao': {'lat': 43.263, 'lng': -2.934},
    'hospitalet': {'lat': 41.3595295, 'lng': 2.0999658},
    'acoruna': {'lat': 43.3716, 'lng': -8.3955},
    'sansebastian': {'lat': 43.3183, 'lng': -1.9812},
    'valladolid': {'lat': 41.652, 'lng': -4.7245},
    'laspalmas': {'lat': 28.125963, 'lng': -15.438026},
}

@app.route('/')
@app.route('/<string:city>')
def index(city=None):
    if city is None:
        city = "madrid"
    city = city.lower()
    default_lat = default_coordinates.get(city, {}).get('lat', 0)
    default_lng = default_coordinates.get(city, {}).get('lng', 0)

    mode = request.cookies.get('mode', 'light')
    #new
    if city not in city_marker_data or len(city_marker_data[city]) == 0:
        markers1 = None
    else:
        markers1 = city_marker_data[city]
        
    if mode == 'night':
        with open('dark_mode.json') as d:
            dark_data = json.load(d) 
    else:
        dark_data = []   
    avoidPois = [
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}],
        }
    ]
    styles =  avoidPois + dark_data    
    index = Map(
        identifier="index",
        varname="index",
        disableDefaultUI=True,
        fullscreen_control=True,
        language="es",
        region="ES",
        zoom_control=False,
        streetview_control=False,
        rotate_control=False,
        cluster=True,
        center_on_user_location=True,
        bicycle_layer=True,
        style=(
            "height: calc(100vh);"#- 50px
            "width: 100%;"
            "position: relative;"
            "overflow: hidden;"
        ),
        lat=default_lat,
        lng=default_lng,
        markers=markers1,
        zoom="16",
        styles=styles,
        mapTypeId = "roadmap"
    )
    return render_template(
        "index.html",
        index=index,
        GOOGLEMAPS_KEY=request.args.get("apikey"),
        mode=mode,
    )

@app.route('/error')  # Handle error page
def error_page():
    response = requests.get('https://random.dog/woof.json')
    image_url = response.json()['url']
    return render_template('error.html', image_url=image_url)

@app.errorhandler(500)  # Handle 500 Internal Server Error
def handle_internal_error(error):
    return error_page()

@app.errorhandler(404)  # Handle 404 Not Found Error
def handle_not_found_error(error):
    return error_page()

# Custom handle_abort function
def handle_abort(worker):
    logging.error(f"Gunicorn worker encountered an abort signal. Worker: {worker.pid}")


class MyThread(threading.Thread):
    def __init__(self, stop_event,app, args):
        super().__init__()
        self.stop_event = stop_event
        self.args = args
        self.app=app

    def run(self):
        loadStationTask(self.stop_event,self.app, *self.args)
task_id_to_thread = {}
stop_event = threading.Event()

def loadStationTask(stop_event,app, arg1):
    while not stop_event.is_set():
        loadStation()
        time.sleep(refresh_interval)
    app_logger.warning("loadStationTask > STOPPING THREAD")
