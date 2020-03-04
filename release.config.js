module.exports = {
  branch: 'master',
  tagFormat: 'v${version}', // eslint-disable-line no-template-curly-in-string
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'feat', release: 'patch' },
          { type: 'fix', release: 'patch' },
          { type: 'chore', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'test', release: 'patch' }
        ]
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        changelogFile: 'docs/CHANGELOG.md'
      }
    ],
    [
      '@semantic-release/github',
      {
        githubUrl: 'https://github.com/michellechsy/todo-app.git'
      }
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['docs/CHANGELOG.md', 'package.json'],
        message: 'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}' // eslint-disable-line no-template-curly-in-string
      }
    ]
  ]
}
