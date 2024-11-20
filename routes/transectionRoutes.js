const express = require("express");
const {
  addTransection,
  getAllTransection,
  editTransection,
  deleteTransection,
} = require("../controllers/transectionCtrl");

//router object
const router = express.Router();

//routers
//add transection POST method
router.post("/add-transdection", addTransection);

//get transection
router.post("/get-transection", getAllTransection);

module.exports = router;
