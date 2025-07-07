  const { Sequelize, DataTypes } = require("sequelize");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");

  const sequelize = new Sequelize("meeting_room_system", "root", "Suhaas@2025", {
    host: "localhost",
    dialect: "mysql",
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;


  db.users=require("./user.model")(sequelize,DataTypes);
  db.location=require("./location.model")(sequelize,DataTypes);
  db.meetingroom=require("./meetingroom.model")(sequelize,DataTypes);
  db.room_feature=require('./roomfeatures.model')(sequelize,DataTypes);
  db.booking=require('./booking.model')(sequelize,DataTypes);
  db.participants=require('./participants.model')(sequelize,DataTypes);
  db.meeting_minutes=require('./meetingminutes.model')(sequelize,DataTypes);
  db.audit_log=require('./auditlog.model')(sequelize,DataTypes);
  db.room_feature_mapping=require('./room_feature_mapping.model')(sequelize,DataTypes);
  db.recurring_bookings=require('./recurringbooking.model')(sequelize,DataTypes);


  db.users.hasMany(db.meetingroom,{foreignKey:"User_ID"});
  db.meetingroom.belongsTo(db.users,{foreignKey:"User_ID"});

  db.location.hasMany(db.meetingroom,{foreignKey:"Location_ID"});
  db.meetingroom.belongsTo(db.location,{foreignKey:"Location_ID"});

  db.users.hasMany(db.booking,{foreignKey:"User_ID"});
  db.booking.belongsTo(db.users,{foreignKey:"User_ID"});


  db.booking.hasOne(db.meeting_minutes,{foreignKey:"Booking_ID"});
  db.meeting_minutes.belongsTo(db.booking,{foreignKey:"Booking_ID"});

  
  db.meetingroom.belongsToMany(db.room_feature,{
    through: db.room_feature_mapping,
    foreignKey:"Room_ID",
    otherKey:"Feature_ID",
    as: "features"
  })
  db.room_feature.belongsToMany(db.meetingroom,{
    through: db.room_feature_mapping,
    foreignKey:"Feature_ID",
    otherKey:"Room_ID",
    as:"rooms"
  })

  db.booking.hasMany(db.participants, { foreignKey: "Booking_ID" });
  db.participants.belongsTo(db.booking, { foreignKey: "Booking_ID" });

  db.users.hasMany(db.participants, { foreignKey: "User_ID" });
  db.participants.belongsTo(db.users, { foreignKey: "User_ID" });


  db.booking.hasOne(db.recurring_bookings, { foreignKey: "Booking_ID" });
  db.recurring_bookings.belongsTo(db.booking, { foreignKey: "Booking_ID" });


  db.users.hasMany(db.audit_log, { foreignKey: "User_ID" });
  db.audit_log.belongsTo(db.users, { foreignKey: "User_ID" });
//   db.meetingroom.belongsToMany(db.room_feature, {
//   through: db.room_feature_mapping,
//   foreignKey: "Room_ID",
//   otherKey: "Feature_ID",
//   as: "features"  
// });

// db.room_feature.belongsToMany(db.meetingroom, {
//   through: db.room_feature_mapping,
//   foreignKey: "Feature_ID",
//   otherKey: "Room_ID",
//   as: "rooms"    
// });

  db.sequelize.sync({alter:false})
    .then(() => console.log("Database synced"))
    .catch(err => console.error("DB sync error:", err));

  module.exports = db;

