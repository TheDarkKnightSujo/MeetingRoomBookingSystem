
module.exports=(sequelize,DataTypes)=>{
    const Location=sequelize.define("location",{
        Location_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name:{
            type:DataTypes.STRING,
            allownull:false,
        },
        Address:{
            type:DataTypes.STRING,
            allownull:false,
        },
        City:{
            type:DataTypes.STRING,
            allownull:false,
        },
        Postal_Code:{
            type:DataTypes.STRING,
            allownull:false,
        },
    }
,{
    tableName: "location",
    timestamps: false
    });
    return Location
}