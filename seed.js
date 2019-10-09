const db = require("./helpers/db");
const Document = db.Document;
const User = db.User;
const Role = db.Role;

const rolesObj = {
  user: 1,
  admin: 2
};

function addRoles() {
  for (let key in rolesObj) {
    let roleInstance = new Role();
    roleInstance.id = rolesObj[key];
    roleInstance.title = key;
    roleInstance
      .save()
      .then(result => console.log(`Roles created!! \n ${result}`))
      .catch(err => console.log(`Error in creating roles!!  \n ${err}`));
  }
}

function addDocs(n) {
  for (let index = 0; index < n; index++) {
    let dateObj = new Date();
    const docInstance = new Document();
    docInstance.id = index + 1;
    docInstance.metaData.name = "Document" + index + 1;
    docInstance.metaData.lastModified = dateObj.getTime().toString();
    docInstance.metaData.lastModifiedDate = dateObj;
    docInstance.metaData.type = "image/png";
    docInstance.metaData.size = 10000;
    docInstance.addedDate = dateObj;

    docInstance
      .save()
      .then(result => console.log(`Documents created! \n ${result}`))
      .catch(err => console.log(`Error in creating docs!! \n ${err}`));
  }
}

function addUsers() {}

function addAdmin() {}

module.exports = {
  addDocs: addDocs,
  addRoles: addRoles,
  addAdmin: addAdmin,
  addUsers: addUsers
};
