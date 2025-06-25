module.exports = (sequelize, DataTypes) => {
  const MeetingRoom = sequelize.define("meeting_room", {
    Room_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Location_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "location",       
        key: "Location_ID"
      }
    },
    Description: {
      type: DataTypes.TEXT
    },
    Capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Created_At: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    Updated_At: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },{
    tableName:"meeting_room",
    timestamps:false
  });

  return MeetingRoom;
};
