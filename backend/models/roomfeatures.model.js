module.exports=(sequelize,DataTypes)=>{
    const Room_Feature=sequelize.define("room_feature",{
        Feature_ID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },{
    tableName: "room_feature",
    timestamps: false
    })
    

    return Room_Feature
}
