import bcrypt from 'bcrypt'

const rounds = 10

/**
 * Encrypt the secret value by bcrypt.
 * @param {String} value
 * @return encrypted hash value
 */
export const encrypt = value => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(value, rounds, (err, hash) => {
      return err ? reject(err) : resolve(hash)
    })
  })
}

/**
 * Check if the value is the source of a hashed value.
 * @param {String} value the plain value used to check whether it's the source of the encryption.
 * @param {String} hash the hash stored after encrypted.
 * @return Whether the value and the hash are same.
 */
export const compare = (value, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, hash, (err, same) => {
      return err ? reject(err) : resolve(same)
    })
  })
}
