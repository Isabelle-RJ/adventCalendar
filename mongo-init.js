db = db.getSiblingDb("adventCalendar");
db.createUser({
    user: "adventCalendar",
    pwd: "adventCalendar",
    roles: [
        {
            role: "readWrite",
            db: "adventCalendar"
        }
    ]
})