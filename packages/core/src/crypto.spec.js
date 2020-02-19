import * as crypto from './crypto'

describe('crypto.js', () => {
  const secret = 'thePlainTextForEncryption'

  it('encrypt()', async () => {
    const hashA = await crypto.encrypt(secret)
    expect(hashA).toBeTruthy()
    const hashB = await crypto.encrypt(secret)
    expect(hashB).toBeTruthy()
    expect(hashA).not.toEqual(hashB)
  })

  it('encrypt() with undefined', async () => {
    try {
      await crypto.encrypt(undefined)
    } catch (err) {
      expect(err).toBeTruthy()
    }
  })

  it('compare()', async () => {
    const hash = await crypto.encrypt(secret)
    const same = await crypto.compare(secret, hash)
    expect(same).toBeTruthy()
  })

  it('compare() with undefined', async () => {
    try {
      await crypto.compare(undefined, undefined)
    } catch (err) {
      expect(err).toBeTruthy()
    }
  })
})
