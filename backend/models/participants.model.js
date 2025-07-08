

module.exports=(sequelize,DataTypes)=>{
    const Participants=sequelize.define("participant",{
        Participant_ID:{
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
        User_ID:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"users",
                key:"User_ID"
            }
        },
        Invitation_Status:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
            
        },
        Notification_Sent:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
           
        },
    },{
        tableName:"participants",
        timestamps:false
    });
    return Participants;
}