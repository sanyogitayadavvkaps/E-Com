const express = require("express");
const connectDataBase = require("../DataBase/db");
const chairsRoutes = require("../routes/chairRoutes");
const reviewRoutes = require("../routes/reviewRoutes");
const userRoutes = require("../routes/userRoutes");
const app = express();
const PORT = 8000;


app.use(express.json());
app.use('/api',chairsRoutes)
app.use('/api',userRoutes)
app.use('/api',reviewRoutes)





app.use(
  "/api/ChairImage",
  express.static("../ChairImage")
);
app.use(express.urlencoded({ limit: '50mb', extended: true })); 
connectDataBase();

app.listen(PORT, () => {
  console.log(`Server is running PORT:${PORT}`);
});

