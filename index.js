const express = require('express')
const app = express();

app.use(express.static(__dirname + '/dist/ng-blog'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'dist/bripley-front/index.html'));
});

app.listen(process.env.PORT || 8080)
