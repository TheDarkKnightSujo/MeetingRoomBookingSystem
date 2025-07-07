
module.exports=(sequelize,DataTypes)=>{
    const MeetingMinutes=sequelize.define("meeting_minutes",{
        Minute_ID:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        Booking_ID:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"booking",
                key:"Booking_ID"
            }
        },
        Notes_Text:{
            type:DataTypes.STRING,
        },
        Attachments_Path:{
            type:DataTypes.STRING,
        },
        Created_By:{
            type:DataTypes.INTEGER,
            references:{
                model:"users",
                key:"User_ID",
            },
        },
        Created_At:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },{
        tableName:"meeting_minutes",
        timestamps:false,
        createdAt:false,
        updatedAt:false
    });
    return MeetingMinutes;
}