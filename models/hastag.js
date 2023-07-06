'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hastag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hastag.belongsToMany(models.Tweet, { through: models.TweetHastag });
    }
  }
  Hastag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hastag',
  });
  return Hastag;
};