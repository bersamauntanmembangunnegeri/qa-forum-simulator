const { parse } = require('pg-connection-string');

module.exports = ({ env }) => {
  const connectionString = env('DATABASE_URL');

  if (!connectionString) {
    console.error('DATABASE_URL environment variable is not set. Cannot connect to database.');
    throw new Error('DATABASE_URL environment variable is not set.');
  }

  const { host, port, user, password, database } = parse(connectionString);

  return {
    connection: {
      client: 'postgres',
      connection: {
        host,
        port,
        user,
        password,
        database,
        ssl: env.bool('DATABASE_SSL_SELF', false) ? { rejectUnauthorized: false } : false,
      },
      pool: {
        min: 0,
        max: 10,
      },
    },
  };
};
