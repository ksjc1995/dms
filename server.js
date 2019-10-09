global.__baseDir = __dirname;

const express = require("express");
const setGlobalMiddlewares = require("./helpers/setGlobalMiddlewares");
const serverConfig = require("./config/server");
const devSetup = require("./helpers/devSetup");
const seeder = require('./seed');
const documentRoute = require('./routes/document.route');
const userRoute = require('./routes/user.route');
const app = express();

setGlobalMiddlewares(app);

// if (process.env.NODE_ENV == "development") {
//   console.log('\n' + '-'.repeat(40) + "\nApplication running in development mode\n" + '-'.repeat(40));
//   devSetup(app);
// }

app.use(userRoute);
app.use(documentRoute);


// seed data
// seeder.addRoles();
// seeder.addDocs(10);

const PORT = process.env.PORT || serverConfig.port;

// Serve the files on port 3000.
app.listen(PORT, function(err) {
  if(err){
    console.log("Some error occurred while starting the server");
  }
  console.log(`Server listening on port ${PORT} \n\n`);
});
