const express = require('express');
const app = express();
const PORT = 3000;

/*Including the data here directly for now.
In the real world an app like this would be
connected to a DB with many users, and
the `/data` route would look more like
`:user/data`*/
const scheduleData = require('./data.json');

//for static files
app.use(express.static('./public'));

app.get('/data', (req, res) => {
  res.json(scheduleData);
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})