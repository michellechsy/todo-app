import { ObjectId } from 'bson'
import glob from 'glob'
import path from 'path'
import Sequelize from 'sequelize'
import { settings } from 'core'

const defaultOptions = {
  host: settings.db.host,
  dialect: settings.db.dialect,
  pool: settings.db.pool.enabled
    ? {
        max: settings.db.max,
        idle: settings.db.idle,
        acquire: settings.db.acquire
      }
    : false
}

/**
 * Generate object ID as a key
 */
export const Key = () => new ObjectId().toHexString()

export class Database extends Sequelize {
  constructor() {
    if (settings.db.storage) {
      super({
        dialect: 'sqlite',
        storage: settings.db.storage,
        logging: settings.db.logging
      })
    } else {
      super(settings.db.database, settings.db.username, settings.db.password, defaultOptions)
    }
    this.ready = false
  }

  /**
   * Table definition with pre-defined common fields, e.g. id
   * @param {String} name table name
   * @param {Object} fields table columns
   * @param {Object} options other options for the table definition
   */
  define(name, fields, options = {}) {
    const attrs = {
      id: {
        primaryKey: true,
        type: Sequelize.CHAR(24),
        defaultValue: Key
      },
      ...(fields || {})
    }
    return super.define(name, attrs, options)
  }

  /**
   * Find and register all table models into `sequelize` global model caches, and handle associations
   * @param {String} filePattern the path of all table models
   */
  bootstrap(filePattern = `${path.resolve(__dirname, '../../api')}/**/models/*.js`) {
    const filepaths = Object.values(glob.sync(filePattern))
    Object.values(filepaths).forEach(filepath => {
      this.import(filepath) // register the model & cache it
    })

    // associate model
    Object.values(this.models).forEach(Model => {
      if (Model.associate) {
        Model.associate(this.models)
      }
    })
    this.ready = true
  }
}
