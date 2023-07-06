'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Tweet);
    }

    static autoUser() {
      return 'user';
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: {
          msg: 'email name required'
        },
        notEmpty: {
          msg: 'email name required'
        },
        isEmail: {
          msg: 'Harus email ya'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password name required'
        },
        notEmpty: {
          msg: 'password name required'
        },
        len: {
          args: [8, Infinity],
          msg: 'Password Harus 8 '
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (instance, option) => {
    const pass = instance.password;
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(pass, salt);

    instance.password = hash;

  });


  return User;
};