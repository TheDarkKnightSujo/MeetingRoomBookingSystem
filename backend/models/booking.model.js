
module.exports=(sequelize,DataTypes)=>{
    const Booking=sequelize.define("booking",{
        Booking_ID:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        Room_ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "meeting_room",       
                key: "Room_ID"
            }

        },
        User_ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",       
                key: "User_ID"
            }
        },
        
        Title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Start_Time:{type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,},
        End_Time:{type: DataTypes.DATE,
            defaultValue: DataTypes.NOW},
        Status:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Created_At:{type: DataTypes.DATE,
            defaultValue: DataTypes.NOW},
        Updated_At:{type: DataTypes.DATE,
            defaultValue: DataTypes.NOW},
    },{
    tableName: "booking",
    timestamps: false
    });
      Booking.associate = (models) => {
    Booking.belongsTo(models.users, {
      foreignKey: "User_ID",
      as: "User",
    });

    Booking.belongsTo(models.meetingroom, {
      foreignKey: "Room_ID",
      as: "MeetingRoom",
    });

    Booking.hasMany(models.participants, {
      foreignKey: "Booking_ID",
      as: "Participants",
    });
  };

  return Booking;
};