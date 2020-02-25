const uuidv4 = require('uuid/v4')
const uuidv5 = require('uuid/v5')

const name = 'users'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(name, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      token: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: true,
        defaultValue() {
          return uuidv5(uuidv4(), uuidv5(name, uuidv5.DNS))
        }
      },
      profile: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue() {
          return Date.now()
        }
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue() {
          return Date.now()
        }
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable(name)
  }
}
