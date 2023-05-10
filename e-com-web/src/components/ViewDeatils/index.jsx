import {
  Container,
  Button,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layoutes/MainLayout";
import "../ViewDeatils/viewpage.css";
import { getRequest, getRequestById, ServerUrl } from "../../ApiFunctions";
import { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";
export default function ViewDetails() {
  const [view, setView] = useState([]);
  const [review, setReview] = useState([]);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    getByIdData();
    getRevies();
  }, []);
  const getByIdData = async () => {
    const res = await getRequestById(`/get-chairs-id/${id}`);
    console.log("DATA=>", res.data);
    setView(res.data);
  };
  const getRevies = async () => {
    const res = await getRequest(`/get-reviews`);
    setReview(res.data);
    console.log("RES=>", res.data);
  };
  return (
    <MainLayout>
      <Container component="main" maxWidth="lg">
        <div className="row" style={{ marginTop: "1rem" }}>
          <div className="col-md-4">
            <div className="pe-1">
              <img
                className="img-fluid rounded-start"
                alt="Image"
                src={`${ServerUrl}/ChairImage/${view.profile}`}
              />
            </div>
            <div>
              <Button
                variant="contained"
                style={{ margin: "10px", backgroundColor: "#ff9f00" }}
              >
                <span className="_3iRXzi"></span>Buy Now
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#ec631c" }}
              >
                <svg
                  className="_1KOMV2"
                  width="16"
                  height="16"
                  viewBox="0 0 16 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className=""
                    d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                    fill="#fff"
                  ></path>
                </svg>{" "}
                Add To Add
              </Button>
            </div>
          </div>
          <div className="col-md-8">
            <Typography variant="h5"> {view.chairName}</Typography>
            <div className="_3LWZlK">
              <button style={{ backgroundColor: "green", color: "white" }}>
                {view.totalRating}
                <span style={{ padding: "5px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star"
                    viewBox="0 0 16 16"
                    id="IconChangeColor"
                  >
                    {" "}
                    <path
                      d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                      id="mainIconPathAttribute"
                      stroke-width="0.2"
                      stroke="#fafafa"
                      fill="#ffffff"
                      filter="url(#shadow)"
                    ></path>{" "}
                    <filter id="shadow">
                      <feDropShadow
                        id="shadowValue"
                        stdDeviation=".5"
                        dx="-0.4"
                        dy="-0.2"
                        flood-color="black"
                      ></feDropShadow>
                    </filter>
                  </svg>
                </span>
              </button>
              <span> 31,147 Ratings & 1,190 Reviews</span>
            </div>
            <div className="_1V_ZGU">
              <span>Extra ₹9901 off</span>
            </div>
            <div className="_25b18c">
              <div className="_30jeq3 _16Jk6d">₹{view.price}</div>
            </div>
            <div>
              <div className="_2QKOHZ">Ratings &amp; Reviews</div>
            </div>
            <div style={{ display: "inline-block" }}>
              <Rating
                style={{ display: "inline-block !important" }}
                // value={view.totalRating}
                edit={false}
                size={24}
                activeColor="#e7bb5f"
              />
              <span>
                {" "}
                <Button
                  variant="contained"
                  onClick={() => history(`/rate/product/${id}`)}
                >
                  Rate Product
                </Button>
              </span>
            </div>

            <div style={{ padding: 14 }} className="App">
              <h1>Comments</h1>
              {review?.length &&
                review?.map((data) => {
                  console.log("Data=>", data.reviews);
                return(
                  <Paper style={{ padding: "40px 20px" }}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                      {data.firstName}
                      {data.lastName}
                      </h4>
                      <p style={{ textAlign: "left" }}> {data.reviews}</p>
                      {/* <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                      </p> */}
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                  {/* <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                    
                      </h4>
                      <p style={{ textAlign: "left" }}>{data.re}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                      </p>
                    </Grid>
                  </Grid> */}
                </Paper>
                )
                })}
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
