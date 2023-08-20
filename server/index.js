const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const authRoute = require("./routes/auth");
const facultyRoute = require("./routes/faculty");
const studentRoute = require("./routes/student");

/* Middleware Configuration*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* Routes */

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/auth", authRoute);
app.use("/student", studentRoute);
app.use("/faculty", facultyRoute);

/* Database connection */

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
