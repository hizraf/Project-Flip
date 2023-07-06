'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
    get formattedDate() {
      const date = new Date(this.birthOfDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }


    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'first name required'
        },
        isAlpha: {
          msg: 'first name must letter'
        },
        notEmpty: {
          msg: 'first name required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'first name required'
        },
        isAlpha: {
          msg: 'last name must letter'
        },
        notEmpty: {
          msg: 'first name required'
        }
      }
    },
    birthOfDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'date name required'
        },
        notEmpty: {
          msg: 'date name required'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'first name required'
        },
        notEmpty: {
          msg: 'first name required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'first name required'
        },
        notEmpty: {
          msg: 'first name required'
        }
      }

    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};