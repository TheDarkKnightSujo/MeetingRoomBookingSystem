module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("user",{
        User_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        First_Name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Last_Name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        Role:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Created_At: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
         },

    },{
    tableName: "users",
    timestamps: false
    });
    return User;
}