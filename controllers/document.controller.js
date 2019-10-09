const path = require("path");
const uploadHelper = require("../helpers/upload");
const jwt = require("../helpers/jwt");
const db = require("../helpers/db");
const User = db.User;
const Document = db.Document;
const Role = db.Role;

exports.getAllDocs = async function(req, res, err) {
  const authHeader = req.headers["authorization"];
  let decodedToken = "";
  if (authHeader) {
    decodedToken = jwt.decode(authHeader);
    if (!decodedToken)
      return res.json({
        message: "Login again!! Token expired or invalid!",
        status: 401
      });
    else {
      const userDocs = await getAllUserDocuments(decodedToken.userEmail, decodedToken.roleId);
      if (userDocs) {
        return res.json({
          message: "Success",
          docs: userDocs,
          status: 200
        });
      }
      return res.json({
        message: "Unable to fetch documents due to some unknown error!",
        status: 500
      });
    }
  } else {
    return res.json({
      message: "Unauthorised",
      status: 401
    });
  }
};

getAllUserDocuments = async function(userEmail, roleId) {
  try {
    const user = await User.findOne({
      userEmail: userEmail
    });
    console.log(user);
    if (user) {
      const roleIdFromDb = user.roleId;
      const adminRole = await Role.findOne({ title: "admin" });
      const userRole = await Role.findOne({ title: "user" });
      let docs = null;
      if (roleId === roleIdFromDb) {
        if (roleId === adminRole.id) {
          docs = await Document.find({});
        } else if (roleId === userRole.id) {
          docs = user.docs;
        } else {
          docs = null;
        }
        return docs;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

exports.getDocument = async function(req, res, err) {
  const authHeader = req.headers["authorization"];
  const decodedToken = "";
  if (authHeader) {
    decodedToken = jwt.decode(authHeader);
    if (!decodedToken)
      return res.json({
        message: "Login again!! Token expired or invalid!",
        status: 401
      });
    else {
      const docId = req.params.documentId;
      const doc = await Document.findOne({ id: docId });
      if (doc) {
        return res.json({
          message: "success",
          doc: doc,
          status: 200
        });
      }

      return res.json({
        message: "Some error occurred",
        status: 500
      });
    }
  } else {
    return res.json({
      message: "Unauthorised",
      status: 401
    });
  }
};

createDocument = async function(docDetails) {
  console.log(docDetails);
  let dateObj = new Date();
  const docInstance = new Document();
  docInstance.id = docDetails.filename;
  docInstance.metaData.name = docDetails.filename;
  docInstance.metaData.lastModified = docDetails.lastModified;
  docInstance.metaData.lastModifiedDate = docDetails.lastModifiedDate;
  docInstance.metaData.type = docDetails.mimetype;
  docInstance.metaData.size = docDetails.size;
  docInstance.addedDate = dateObj;
  docInstance.path = path.join(__baseDir, "uploads", docDetails.filename);

  try {
    const doc = await docInstance.save();
    if (doc) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(`Error in creating docs!! \n ${error}`);
    return false;
  }
};

exports.uploadDoc = async function(req, res, err) {
  uploadHelper(req, res, async function(err) {
    if (req.noFileFoundError) {
      return res.json({
        message: req.noFileFoundError,
        status: 200
      });
    }else{
        let docDetails = req.file;
        docDetails.lastModified = req.body.lastModified;
        docDetails.lastModifiedDate = req.body.lastModifiedDate;
        const docAdded = await createDocument(docDetails);
        if(docAdded){
            return res.json({
                message: "Successfully uploaded File!",
                status: 200
            });
        }

        return res.json({
            message:"Some error occured, Please try again",
            status:500
        })
    }

    // if (req.fileValidationError) {
    //   return res.send("Unable to upload this type of file");
    // }

  });
};

exports.updateDocMetadata = function(req, res, err) {};
