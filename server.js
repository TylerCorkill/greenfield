var server = require('./routes.js');
require('./apiKeys.js');

server.listen(process.env.PORT || 8000, function() {
  console.log('Server is listening on 8000');
});