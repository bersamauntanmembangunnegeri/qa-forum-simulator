const { parse } = require('pg-connection-string');

module.exports = ({ env }) => {
  const { host, port, user, password, database } = parse(env('DATABASE_URL'));

  return {
    connection: {
      client: 'postgres',
      connection: {
        host,
        port,
        user,
        password,
        database,
        ssl: { rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false) },
      },
      pool: {
        min: 0,
        max: 10,
      },
    },
  };
};
