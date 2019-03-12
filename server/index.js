/* eslint-disable global-require */

const path = require('path');
const express = require('express');

const app = express();

const publicPath = path.resolve(__dirname, '../dist');

if (process.env.NODE_ENV === 'development') {
  require('./devServer.js')(app);
}

app.use(express.static(publicPath));

app.get('*', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));

app.listen(3000);
