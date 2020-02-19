import HttpStatus from 'http-status'
import uuidv4 from 'uuid/v4'
import uuidv5 from 'uuid/v5'
import { Map } from 'db/fields'

module.exports = (db, DataTypes) => {
  return db.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: HttpStatus.CREATED
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    token: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: true,
      defaultValue() {
        return uuidv5(uuidv4(), uuidv5('users', uuidv5.DNS))
      }
    },
    profile: Map('profile', {
      allowNull: true
    })
  }, {
    tableName: 'users'
  })
}