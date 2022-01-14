require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST_DEV,
  port: process.env.DB_PORT_DEV,
  username: process.env.DB_USER_DEV,
  password: process.env.DB_PASS_DEV,
  database: process.env.DB_NAME_DEV,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
