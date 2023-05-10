import { getRequest, ServerUrl } from "../../ApiFunctions/index";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Cards = () => {
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    const res = await getRequest("/get-chairs");
    console.log("RES=>", res);
    setData(res.data);
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        {loading ? (
          <CircularProgress />
        ) : (
          data?.map((user, index) => {
            console.log("RATe=>");

            const { _id, chairName, price, profile, descriptions ,rating} =
              user;
            // Calculate total rating
            // const totalRating =
            //   rating?.length && rating.reduce((a, b) => a + b, 0);
            // const averageRating = totalRating / rating?.length;

            return (
              <Card sx={{ maxWidth: 345, margin: "5px" }} key={index}>
                <CardMedia
                  component="img"
                  style={{ height: "500px", backgroundColor: "gray" }}
                  image={`${ServerUrl}/ChairImage/${profile}`}
                  className="img-fluid"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="h4">{chairName}</Typography>
                  <Typography variant="h6">₹{price}</Typography>
                  <div className="_3LWZlK">
                    <button
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      {user.rating}
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
                  </div>
                  <Typography gutterBottom variant="h5">
                    {descriptions}
                  </Typography>
                </CardContent>
                <CardActions style={{}}>
                  <Button
                    variant="contained"
                    onClick={() => history(`/view-deatils/${_id}`)}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Cards;
