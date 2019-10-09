const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");

router.get("/document/:id",documentController.getDocument);
router.get("/document", documentController.getAllDocs);
// router.put("/document/:id",documentController.updateDocMetadata);
router.post("/document/upload", documentController.uploadDoc);

module.exports = router;
