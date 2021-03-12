const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/lang/:lang', (req, res, next) => {
  const pathName = `data/${req.params.lang}.json`;
  if (fs.existsSync(pathName)) {
    const rawData = fs.readFileSync(pathName);
    const data = JSON.parse(rawData);
    res.json(data);
  } else {
    next();
  }
});

app.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/404.html'));
})

app.get('*', (req, res) => {
  res.redirect('/404');
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});