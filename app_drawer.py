import json

def format_geofence_coordinates(flat_array):
    formatted_coords = []
    if flat_array and isinstance(flat_array[0], list):
        for coord_pair in flat_array:
            formatted_coords.append({
                "lat": coord_pair[1],
                "lng": coord_pair[0]
            })
    else:
        for i in range(0, len(flat_array), 2):
            formatted_coords.append({
                "lat": flat_array[i + 1],
                "lng": flat_array[i]
            })
    return formatted_coords

def get_infoboxPBSC(element):
    if (element.station_id == "1558"):
        pass
    infobox_lines = [f"<h5><p>{element.name}</p><h5>"]
    if element.status != "IN_SERVICE":
        infobox_lines.append(f"<div style='text-align: center;'><h3><p><strong>Desactivada</strong></p><h3></div>")
    else:
        infobox_lines.append(f"<div style='text-align: center;'><h2><p>")
        if element.num_bikes_overflow is not None and element.num_bikes_overflow > 0:
            infobox_lines.append(f"🚴‍♂️💨{element.num_bikes_overflow}")
            infobox_lines.append(f"&emsp;")
        infobox_lines.append(f"🚲<strong>{element.num_bikes_available}</strong>&emsp;")
        infobox_lines.append(f"🅿️<strong>{element.num_docks_available}</strong>")
        infobox_lines.append(f"</p><h2>")
        infobox_lines.append(f"<div style='text-align: center;'><h2><strong>")
        if element.num_bikes_disabled is not None and element.num_bikes_disabled > 0:
            infobox_lines.append(f"🔧{element.num_bikes_disabled}")
            infobox_lines.append(f"&emsp;")
        if element.num_docks_disabled is not None and element.num_docks_disabled > 0:
            #print(f"{element.name}")
            infobox_lines.append(f"🅿️🚫{element.num_docks_disabled}")#🚳
            infobox_lines.append(f"&emsp;")
        infobox_lines.append(f"</strong><h2></div>") 
        ###GEOFENCE
        geofence_icon="🚧"
        if element.num_docks_available is not None and element.num_docks_available <=2:
            if element.geofenced_capacity is not None and element.geofenced_capacity > 0:
                infobox_lines.append(f"<div class='geofence-icon' style='text-align: center;'><h2>"+f"{geofence_icon}")
                infobox_lines.append("</p><h2></div>")
            element.geofence = format_geofence_coordinates(element.geofence)
            geofence_json = json.dumps(element.geofence)

            geofence_info = "<div style='display: none;' id='geofence-info'>" + geofence_json + "</div>"
            infobox_lines.append(geofence_info)
            infobox_lines.append("<div style='display: none;' id='capacity'>" + str(element.geofenced_capacity) + "</div>")
    
    infobox_lines.append(f"<div style='text-align: center;'>")

    infobox = "".join(infobox_lines) + "<img src='/static/images/bike.png'>"
    infobox = infobox.replace("<img src='/static/images/bike.png'>", "<img src='/static/images/bike.png' style='width:40%; height:40%;'>")
    infobox += f"<p><a target='_blank' href='https://www.google.com/maps/place/{element.location[0]},{element.location[1]}/@{element.location[0]},{element.location[1]},16z'><img src='/static/images/maps_64dp.png'></a></div>"
    # Parseo para "last_reported" y "is_charging_station"
    if element.last_reported is not None:
        from datetime import datetime, timedelta
        current_time_utc = datetime.utcnow()
        last_reported_utc = datetime.utcfromtimestamp(element.last_reported)
        time_difference = current_time_utc - last_reported_utc

        minutes, seconds = divmod(time_difference.total_seconds(), 60)
        minutes = int(minutes)
        seconds = int(seconds)
        infobox += f"<p style='font-size: 45%'>"
        infobox += f"{minutes} minutos y {seconds} segundos"

        if element.is_charging_station is not None and not element.is_charging_station:
            charging_status = "🔌🚫"
            infobox += f"&emsp;{charging_status}"
            infobox += f"</p>"
        else:
            infobox += "</p>"
    return infobox

def get_titlePBSC(element):
    bikes_available = getattr(element, "num_bikes_available", "N/A")
    docks_available = getattr(element, "num_docks_available", "N/A")
    return f"{bikes_available}/{docks_available}"


def get_icon_docksPBSC(element):
    if hasattr(element, "num_bikes_available"):
        if element.num_bikes_available == 0:
            if element.status == "NOT_IN_SERVICE" or element.status == "END_OF_LIFE":
                return "/static/images/markers/deactivated.png"
            else:
                return "/static/images/markers/stop.png"
        elif element.num_bikes_available >= 20:
            return "/static/images/markers/fire.png"
        elif 10 <= element.num_bikes_available <= 19:
            return "/static/images/markers/go.png"
        else:
            return "/static/images/markers/" + str(element.num_bikes_available) + ".png"
    else:
        pass

def create_new_markerPBSC(FullStationsInformation,marker_data_list):
    for element in FullStationsInformation:
        marker_found = False
        for elementFind in marker_data_list:
            if elementFind["id"] == str(element.station_id):
                marker_found = True
                icon_url = get_icon_docksPBSC(element)
                elementFind["title"] = get_titlePBSC(element)
                elementFind["icon"] = icon_url
                elementFind["infobox"] = get_infoboxPBSC(element)
        if not marker_found:
            icon_url = get_icon_docksPBSC(element)
            newmarker = {
                "id": str(element.station_id),
                "name": element.name,
                "icon": {
                    "url": icon_url,
                    "scale": 0.5
                },
                "title": get_titlePBSC(element),
                "lat": element.location[0],
                "lng": element.location[1],
                "infobox": get_infoboxPBSC(element),
            }
            marker_data_list.append(newmarker)