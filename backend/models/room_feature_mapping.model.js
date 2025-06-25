const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Room_Feature_Mapping=sequelize.define("room_feature_mapping",{
        Room_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'meeting_room',
        key: 'Room_ID',
      },
    },
    Feature_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'room_feature',
        key: 'Feature_ID',
      },
    },
  }, {
    tableName: 'room_feature_mapping',
    timestamps: false,
  });
    return Room_Feature_Mapping
}