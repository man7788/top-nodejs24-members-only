const express = require('express');
const app = express();
const path = require('node:path');

const indexRouter = require('./routes/indexRouter');
const signupRouter = require('./routes/signupRouter');
const memberRouter = require('./routes/memberRouter');

const assetsPath = path.join(__dirname, 'public');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/members-only', memberRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
