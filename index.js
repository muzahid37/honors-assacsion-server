const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./router/user");
const authRoute = require("./router/auth");
const postRoute = require("./router/Post");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection sussessfull!"))
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
