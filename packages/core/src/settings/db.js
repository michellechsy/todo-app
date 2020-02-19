const { env } = process

module.exports = {
  dialect: env.DB_DIALECT || 'mysql',
  host: env.DB_HOST || 'localhost',
  port: env.DB_PORT || 3306,
  database: env.DB_NAME || 'todo',
  username: env.DB_USERNAME || 'todo',
  password: env.DB_PASSWORD || 'password',
  storage: env.DB_STORAGE,
  pool: {
    enabled: env.DB_ENABLE_POOL || false,
    max: env.DB_CONNECTION_POOL || 5,
    idle: env.DB_CONNECTION_IDLE_TIME || 10000,
    acquire: env.DB_CONNECTION_TIMEOUT || 30000
  },
  logging:
    (Boolean(env.DB_LOGGING) &&
      env.DB_LOGGING.split('.').reduce((obj, path) => {
        return obj[path]
      }, global)) ||
    false
}
