const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;
const routes = require('./routes/router');

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
