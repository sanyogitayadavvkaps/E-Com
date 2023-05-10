const express = require("express");
const chairsRoutes = express.Router();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const { postChairsContorller, getChairsContorller, getChairsContorllerById } = require("../Controller/chairController");
chairsRoutes.use(cors());

const DestinationsFunction = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../ChairImage"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: DestinationsFunction });

chairsRoutes.post(
  "/insert-chairs",
  upload.single("image"),
  postChairsContorller
);
chairsRoutes.get('/get-chairs',getChairsContorller)
chairsRoutes.get('/get-chairs-id/:id',getChairsContorllerById)



module.exports= chairsRoutes