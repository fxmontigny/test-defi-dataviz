var compression = require('compression');
const express = require('express');
const path = require('path');
const app = express();


const redirectohttps = true;

app.use(compression());
app.use(express.static(__dirname + '/dist'));
app.get('/*', function(req, res) {
  if (redirectohttps && req.headers['x-forwarded-proto'] !== 'https' && req.hostname !== 'localhost') {
    // special for robots.txt
    if (req.url === '/robots.txt') {
      next();

      return;
    }

    res.redirect(301, 'https://' + req.hostname + req.url);
  }

	res.sendFile(path.join(__dirname + '/dist/index.html'));
});
app.listen(process.env.PORT || 3000);
