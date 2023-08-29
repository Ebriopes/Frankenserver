const PORT = process.env.PORT || 3000;
const ENVIRONMENT = (process.env.NODE_ENV = process.env.NODE_ENV || 'dev');

module.exports = {
  PORT,
  ENVIRONMENT,
};
