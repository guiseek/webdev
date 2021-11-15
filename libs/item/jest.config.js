module.exports = {
  name: 'item',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/item',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
