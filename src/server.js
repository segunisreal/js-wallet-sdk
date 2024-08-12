const app = require('./app');
const config = require('./config');
// require('./config/db'); // Connect to the database

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});