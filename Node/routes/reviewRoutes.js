const express = require("express");
const reviewRoutes = express.Router();
const cors = require("cors");
const { postReviewsController, getReviewsController } = require("../Controller/reviewController");
reviewRoutes.use(cors());

reviewRoutes.post("/insert-reviews", postReviewsController);
reviewRoutes.get("/get-reviews", getReviewsController);


   





module.exports = reviewRoutes;
