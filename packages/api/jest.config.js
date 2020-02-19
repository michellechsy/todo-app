const path = require('path')

module.exports = {
  transform: {
    '^.+\\.js$': path.resolve(__dirname, './jest.transform.js')
  },
  collectCoverage: true,
  testEnvironment: 'node',
  coverageReporters: ['json', 'lcov', 'text']
}
