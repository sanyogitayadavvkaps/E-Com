import { Container } from "@mui/system";
import React, { useState } from "react";
import { postRequest } from "../../ApiFunctions/index";
import MainLayout from "../layoutes/MainLayout";
import Rating from "react-rating-stars-component";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const RateProduct = ({ onPostReview }) => {
  const { id } = useParams();
  console.log("ID+>", id);
  // const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // const handleRatingChange = (event) => {
  //   setRating(event.target.value);
  // };
  const getStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} />);
    }
    return stars;
  }

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await postRequest("/insert-reviews", {
      rating,
      reviews: reviewText,
      productName: id,
      userName: localStorage.getItem("_id"),
    });

    console.log("IIII=>", res);
    if (res.status === 200) {
      onPostReview();
    } else {
      console.log(res.message);
    }
  };

  return (
    <MainLayout>
      <Container>
        <div style={{ margin: "3rem" }}>
          <Typography variant="h4">Please rate</Typography>
          <Rating
            style={{ display: "inline-block !important" }}
            // value={view.totalRating}
            edit={false}
            size={24}
            activeColor="#e7bb5f"
          />
        </div>
        <div className="write-review-box">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>

              <select
                className="form-control"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="0">Select a rating</option>
                <option value="1">{getStars(1)}</option>
                <option value="2">{getStars(2)}</option>
                <option value="3">{getStars(3)}</option>
                <option value="4">{getStars(4)}</option>
                <option value="5">{getStars(5)}</option>
              </select>
              {/* <select
            className="form-control"
            id="rating"
            value={rating}
            onChange={handleRatingChange}
          >
            <option value="0">Select a rating</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select> */}
            </div>
            <div className="form-group">
              <label htmlFor="review-text">Write your review:</label>
              <textarea
                className="form-control"
                id="review-text"
                rows="5"
                value={reviewText}
                onChange={handleReviewTextChange}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#ec631c",
                color: "white",
                borderColor: "beige",
                width: "10%",
              }}
            >
              Post
            </button>
          </form>
        </div>
      </Container>
    </MainLayout>
  );
};

export default RateProduct;
