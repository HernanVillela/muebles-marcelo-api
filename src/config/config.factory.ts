import * as process from 'node:process';

export const configFactory = () => ({
  databases: {
    muebles_marcelo: {
      name: 'muebles_marcelo',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      dialect: 'postgres',
    },
  }
});
