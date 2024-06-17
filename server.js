const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const wardenRoutes = require("./routes/wardenRoutes.js");
const coordinatorRoutes = require("./routes/coordinatorRoutes.js");
const principalRoutes = require("./routes/principalRoutes");
const emailRoutes = require("./routes/emailRoutes");
const authMiddleware = require("./middleware/Authmiddleware.js");
const cors = require("cors");
dotenv.config();

// const insertP = require('./scripts/insertPrincipal.js')
const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173", // The origin of your frontend
  credentials: true, // Allow credentials (cookies)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};


app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/coordinator", coordinatorRoutes);
app.use("/api/warden", wardenRoutes);
app.use("/api/principal", principalRoutes);
app.use("/api/email", authMiddleware, emailRoutes);

mongoose
  .connect(`${process.env.MONGO_DB_URI}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
