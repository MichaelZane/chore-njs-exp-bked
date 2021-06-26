require('dotenv').config()

const server = require('./api/server.js');

const PORT = process.env.PORT || 5000;
server.listen(PORT, (err) => {
  if(err) return console.error(err)
  console.log(`\n<=*=> Rocking it on port ${PORT} <=*=>\n`);
});

