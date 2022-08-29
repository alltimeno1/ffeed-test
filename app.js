const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models');
const Router = require('./routes/shop.route');

const app = express();

sequelize
  .sync({ force: false, logging: false })
  .then(() => console.log('🟢 db 연결 성공'))
  .catch(console.error);

const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', Router);

app.use((req, res) => {
  res.status(404).send('Page Not Found!');
});

app.use((err, req, res) => {
  const { status, message } = err;

  res.status(status || 500).json({ result: false, message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
