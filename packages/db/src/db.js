import { ObjectId } from 'bson'
import glob from 'glob'
import path from 'path'
import Sequelize from 'sequelize'
import fixtures from 'sequelize-fixtures'
import { settings } from '../settings'

const options = {
  host: settings.host,
  dialect: settings.dialect,
  pool: settings.pool.enabled ? {
    max: settings.max,
    idle: settings.idle,
    acquire: settings.acquire
  } : false
}

export class Database extends Sequelize {
  constructor() {
    if (settings.storage) {
      super({
        dialect: 'sqlite',
        storage: settings.storage,
        logging: settings.logging
      })
    } else {
      super(
        settings.database,
        settings.username,
        settings.password,
        options
      )
    }
    this.ready = false
  }

  Key = () => new ObjectId().toHexString()

  /**
   * Table definition with pre-defined common fields, e.g. id
   * @param {String} name table name
   * @param {Object} fields table columns
   * @param {Object} options other options for the table definition
   */
  define(name, fields, options = {}) {
    const attrs = Object.assign({
      id: {
        primaryKey: true,
        type: Sequelize.CHAR(24),
        defaultValue: Key
      }
    }, fields || {})
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

    // associate models
    Object.values(this.models).forEach(Model => {
      Model.associate && Model.associate(this.models)
    })
    this.ready = true
  }

  // async seed(profile = 'default', filepath) {
  //   if (!this.ready) {
  //     this.this.bootstrap(filepath)
  //   }
  //   const yamls = Object.values(glob.sync(`${settings.directory.seeds}/*.yaml`))
  //   return this.transaction(transaction => fixtures.loadFiles(yamls, this.models, { transaction }))
  // }
}

