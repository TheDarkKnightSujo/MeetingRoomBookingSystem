module.exports = (sequelize, DataTypes) => {
  const RecurringBooking = sequelize.define("recurring_booking", {
    RecurringRule_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Booking_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "booking",       
        key: "Booking_ID"
      }
    },
    Frequency: {
      type: DataTypes.ENUM('Daily','Weekly','Monthly'),
      allowNull:false,
      defaultValue:'Daily'
    },
    End_Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Repeat_On:{
        type:DataTypes.STRING,
        allowNull:false
    },
  },{
    tableName:"recurring_bookings",
    timestamps:false
  });

  return RecurringBooking;
};
