const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());


app.get("/api/health", (req, res) => {

  res.json({
    status: "OK"
  });

});


app.use(
  "/api/auth",
  require("./routes/authRoutes")
);


app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `Backend running on port ${PORT}`
  );

});