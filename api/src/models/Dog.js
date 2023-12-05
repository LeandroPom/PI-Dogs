const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type:DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        // combierte el nombre que le llegue a minuscula antes de guardarlo en la db
        this.setDataValue("name", value.toLowerCase());
      }
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false
    },
    
     /*flag*/
     createdInDb: {
      type : DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      set(value){
        // Comvierte el balor en un booleano
        const boolValue = !!value;
        this.setDataValue('createdInDb',boolValue);
      }
    }
  },{timestamps: false, freezeTableName: true}
  );
};
