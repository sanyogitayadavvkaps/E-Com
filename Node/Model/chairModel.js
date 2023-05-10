const mongoose = require("mongoose");

const ChairsSchema = mongoose.Schema({
  chairName: {
    type: String,
  },
  totalRating:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reviews",
  }],
  price: {
    type: Number,
    required: true,
  },
  profile: {
    type: String,
    required: false,
  },
  descriptions: {
    type: String,
  },
});

const Chairs = mongoose.model("chairs", ChairsSchema);

const postChairsModel = async ({ body, profile }) => {
  const { chairName, totalRating, price, descriptions } = body;
  try {
    const res = await Chairs.create({
      chairName,
      totalRating,
      price,
      profile,
      descriptions,
    });
    return { data: res, message: "Succes", statua: 200 };
  } catch (err) {
    return { message: err, status: 500 };
  }
};

const getChairsModel = async () => {
  try {
    const res = await Chairs.aggregate([
      {
        $lookup: {
          from: "reviews", // collection name to join with
          localField: "totalRating",
          foreignField: "_id",
          as: "Rating",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$Rating", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          chairName: 1,
          rating: 1,
          price: 1,
          profile: 1,
          descriptions: 1,
        },
      },
    ]);
    return { data: res, message: "Succes", statua: 200 };
  } catch (err) {
    return { message: err, status: 500 };
  }
};

// const getChairsByIdModel = async (id) => {
//   try {
//     const res = await Chairs.findById(id);
//     return { data: res, message: "Succes", status: 200 };
//   } catch (err) {
//     return { message: err, status: 500 };
//   }
// };
const getChairsByIdModel = async (id) => {
  try {
    const res = await Chairs.findById(id).populate({
      path: "totalRating",
      select: "rating",
      model: "reviews",
    });
    const { chairName, price, profile, descriptions ,totalRating} = res;
    const rating = totalRating.map((field) => field.rating);
    return {
      data: {
        chairName,
        price,
        profile,
        descriptions,
        totalRating: rating,
      },
      message: "Success",
      status: 200,
    };
  } catch (err) {
    console.log("Err=>", err);

    return { message: err, status: 500 };
  }
};

module.exports = {
  postChairsModel,
  getChairsModel,
  getChairsByIdModel,
};
