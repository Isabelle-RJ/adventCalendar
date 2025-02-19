db = db.getSiblingDB("adventcalendarmongo");
db.createUser({
    user: "adventcalendarmongo",
    pwd: "adventcalendarmongo",
    roles: [
        {
            role: "readWrite",
            db: "adventcalendarmongo"
        }
    ]
})