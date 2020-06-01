// mongo url: mongo "mongodb+srv://cluster0-encm1.mongodb.net/test" --username root

// use (and create if it doesn't exists) a database
use car_bookings;

// check which db we are in
db

// insert vehicle type
db['vehicle_type'].insert({
    "name":"Taxi2",
    "seating_capacity":4,
    "license":"C3",
    "model":{
        "brand":"Ford"
    }
})

db['vehicle_type'].insert({
    "name":"Van",
    "seating_capacity":8,
    "license":"C2"
})

db['vehicle_type'].insert({
    "name":"Truck",
    "seating_capacity":12,
    "license":"C2"
})

// query vehicle type
db['vehicle_type'].find({
    "license":"C2",
    "seating_capacity" : {
        "$gt":10
    }
}).limit(10).pretty()

// query vehicle type
db['vehicle_type'].find({
   "model.brand":"Ford"
}).limit(10).pretty()


// show collections
show.collections()