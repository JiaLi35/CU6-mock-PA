const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5125;

app.use(express.json());

// instruction: setup cors
app.use(cors());

// instruction: setup MongoDB Connection
// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    // wait for the MongoDB to connect
    await mongoose.connect("mongodb://localhost:27017/course");
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
}

connectToMongoDB();

// instruction: setup routes
app.use("/courses", require("./routes/courses"));
app.use("/instructors", require("./routes/instructors"));

app.get("/", (req, res) => {
  res.send("Good luck!");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
