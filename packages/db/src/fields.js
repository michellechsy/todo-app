import DataTypes from 'sequelize/lib/data-types'
import settings from '../settings'

const type = settings.db.storage ? DataTypes.TEXT : DataTypes.TEXT('long')

export const Map = (name, options = {}) => {
  const Field = Object.assign(options, {
    type,
    get() {
      const text = this.getDataValue(name)
      return text ? JSON.parse(text) : {}
    },
    set(value) {
      if (typeof value === 'object') {
        this.setDataValue(name, value ? JSON.stringify(value) : '{}')
      } else {
        throw new Error({ name: 'ValidationError', message: 'Validation error' })
      }
    }
  })
  return Field
}


export const List = (name, options = {}) => {
  const Field = Object.assign(options, {
    type,
    set(value = []) {
      if (Array.isArray(value)) {
        this.setDataValue(name, JSON.stringify(value))
      } else if (value === null) {
        this.setDataValue(name, '[]')
      } else {
        throw new Error({ name: 'ValidationError', message: 'Validation error -> value has to be an array.' })
      }
    },
    get() {
      const text = this.getDataValue(name)
      return text ? JSON.parse(text) : []
    }
  })
  return Field
}
