
class BikeStation2:
    def __init__(self, station_id, num_bikes_available, num_bikes_overflow, num_bikes_disabled,
                 num_docks_available, num_docks_disabled, last_reported, is_charging_station,
                 status, is_renting, is_returning,name, location, address, capacity, geofenced_capacity,
                 geofence):
        # Station_status
        self.station_id = station_id
        self.num_bikes_available = num_bikes_available
        self.num_bikes_overflow = num_bikes_overflow
        self.num_bikes_disabled = num_bikes_disabled
        self.num_docks_available = num_docks_available
        self.num_docks_disabled = num_docks_disabled
        self.last_reported = last_reported
        self.is_charging_station = is_charging_station
        self.status = status
        self.is_renting = is_renting
        self.is_returning = is_returning
        # Station_information
        self.name = name
        self.location = location
        self.address = address
        self.capacity = capacity
        self.geofenced_capacity = geofenced_capacity
        self.geofence = geofence

    def print_station_info(self):
        print(f"Station ID: {self.station_id}")
        print(f"Num Bikes Available: {self.num_bikes_available}")
        print(f"Num Bikes Overflow: {self.num_bikes_overflow}")
        print(f"Num Bikes Disabled: {self.num_bikes_disabled}")
        print(f"Num Docks Available: {self.num_docks_available}")
        print(f"Num Docks Disabled: {self.num_docks_disabled}")
        print(f"Last Reported: {self.last_reported}")
        print(f"Is Charging Station: {self.is_charging_station}")
        print(f"Status: {self.status}")
        print(f"Is Renting: {self.is_renting}")
        print(f"Is Returning: {self.is_returning}")
        print(f"Name: {self.name}")
        print(f"Location: {self.location}")
        print(f"Address: {self.address}")
        print(f"Capacity: {self.capacity}")
        print(f"Geofenced Capacity: {self.geofenced_capacity}")
        print(f"Geofence: {self.geofence}")
        print("------------------------")