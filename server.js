const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./models");
const router = require("./routes/route");

let corsOptions = {
  origin: "http://localhost:8081",
};

// Middleware;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// route middleware
app.use("/api/tutorials", router);

const PORT = process.env.PORT || 8080;
const AppListen = async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

AppListen();
