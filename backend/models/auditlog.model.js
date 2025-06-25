

module.exports=(sequelize,DataTypes)=>{
    const Auditlogs=sequelize.define("audit_log",{
        Log_ID:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        User_ID:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"users",
                key:"User_ID"
            }
        },
        Action_Type:{ 
            type:DataTypes.STRING,
            allowNull:false,
        },
        Description:{
            type:DataTypes.TEXT,
        },
        Timestamp:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW,
        },
        IP_Address:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },{
        tableName:"audit_log",
        timestamps:false,
    })
    return Auditlogs
}