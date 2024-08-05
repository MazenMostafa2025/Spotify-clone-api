export default () => {
  console.log('Database Username:', process.env.USERNAME);
  console.log('Database Password:', process.env.PASSWORD);

  return {
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    JWT_SECRET: process.env.SECRET,
    db_host: process.env.DB_HOST,
    db_port: parseInt(process.env.DB_PORT, 10),
    db_name: process.env.DB_NAME,
    db_username: process.env.PG_USERNAME,
    db_password: process.env.PASSWORD,
  };
};
