module.exports = {
  name: 'feature-shell',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/feature/shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
