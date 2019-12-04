export const environment = {
  production: false,
  db: {
    name: 'webdev',
    user: 'webdev',
    pass: 'gFi4CL68H6BC7v!'
  }
};

export const getMongoURI = `mongodb://${environment.db.user}:${environment.db.pass}@ds047440.mlab.com:47440/${environment.db.name}`;
