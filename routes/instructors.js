const express = require("express");
const router = express.Router();
const Instructor = require("../models/instructor");

// instruction: import the book model

// instruction: GET /: List all instructors
router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find().sort({ _id: -1 });
    res.status(200).send(instructors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// instruction: setup GET /:id: Get a specific instructor  by its _id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const instructor = await Instructor.findById(id);
    res.status(200).send(instructor);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// instruction: setup POST /: Add a new instructor
router.post("/", async (req, res) => {
  try {
    const { name, qualification, profile, coursesTaught } = req.body;
    const newInstructor = new Instructor({
      name,
      qualification,
      profile,
      coursesTaught,
    });
    await newInstructor.save();
    res.status(200).send(newInstructor);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// instruction: setup PUT /:id: Update a instructor by its _id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, qualification, profile, coursesTaught } = req.body;
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      id,
      {
        name,
        qualification,
        profile,
        coursesTaught,
      },
      {
        new: true,
      }
    );
    res.status(200).send(updatedInstructor);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// instruction: setup DELETE /:id: Delete a instructor by its _id
router.delete("/:id", async (req, res) => {
  try {
    id = req.params.id;
    await Instructor.findByIdAndDelete(id);
    res.status(200).send({
      message: `Instructor with ${id} has been deleted successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// instruction: export the router
module.exports = router;
