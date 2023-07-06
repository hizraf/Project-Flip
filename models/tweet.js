'use strict';
const { Op } = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tweet.belongsTo(models.User);
      Tweet.belongsToMany(models.Hastag, { through: models.TweetHastag });
    }

    static findByText(search, Hastag, Profile, User) {
      let option = {
        include: [
          {
            model: Hastag
          },
          {
            model: User,
            include: {
              model: Profile
            }
          }
        ]
      };
      if (search) {
        option = {
          include: [
            {
              model: Hastag
            },
            {
              model: User,
              include: {
                model: Profile,
              }
            }

          ],
          where: {
            text: {
              [Op.like]: `%${search}%`
            }
          }
        };
      }
      return Tweet.findAll(option);
    }

  }
  Tweet.init({
    text: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tweet',
  });
  return Tweet;
};