import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
  connectionString: 'postgres://postgres:fanimanfaniman@localhost:5432/books',
});

export default db;
