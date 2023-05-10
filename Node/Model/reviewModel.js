const mongoose = require("mongoose");

const reviewSchemas = mongoose.Schema({
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdatas",
  },
  rating:
    {
      type: Number,
      // min: 0,
      // max: 5,
      // required: true,
      // get: v => Math.round(v * 10) / 10, // getter to round the value to one decimal place
      // set: v => Math.round(v * 10) / 10 // setter to round the value to one decimal place
    },

  reviews: 
    {
      type: String,
    },
  productName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chairs",
  },
});

const Reviews = mongoose.model("reviews", reviewSchemas);

const postReviewsModel = async ({ body }) => {
  const { userName, rating, reviews, productName } = body;
  try{
      const res = await Reviews.create({ userName, rating, reviews, productName})
   return { data: res, message: "Succes", status: 200 };
  } catch (err) {
    return { message: err, status: 500 };
  }
};

const getReviewsModel = async () => {
  try {
    const res = await Reviews.aggregate([
      {
        $lookup: {
          from: "chairs", // collection name to join with
          localField: "productName",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: { path: "$product" } },
      {
        $lookup: {
          from: "userdatas", // collection name to join with
          localField: "userName",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$product", 0] }, "$$ROOT"],
            $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {   
          firstName: 1,
          lastName: 1,
          rating: 1,
          reviews: 1,
            //  chairName: 1,
           product: {chairName: 1 },
        },
      },
    ]);
    console.log("RESponse=>",res);
    return { data: res, message: "Succes", status: 200 };
  } catch (err) {
    return { message: err, status: 500 };
  }
};
module.exports = { getReviewsModel, postReviewsModel };
