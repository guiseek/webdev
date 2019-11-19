module.exports = {
  name: 'desktop',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/desktop',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
