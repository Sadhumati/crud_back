require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST_PROD,
  port: process.env.DB_PORT_PROD,
  username: process.env.DB_USER_PROD,
  password: process.env.DB_PASS_PROD,
  database: process.env.DB_NAME_PROD,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  },
};
