db = db.getSiblingDb("adventcalendarmongo");
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