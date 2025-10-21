const express = require("express");
const router = express.Router();
const {
  getInstructor,
  getInstructors,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} = require("../controllers/instructors");

// instruction: import the book model

// instruction: GET /: List all instructors
router.get("/", async (req, res) => {
  try {
    const instructors = await getInstructors();
    res.status(200).send(instructors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// instruction: setup GET /:id: Get a specific instructor  by its _id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const instructor = await getInstructor(id);
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
    const newInstructor = await addInstructor(
      name,
      qualification,
      profile,
      coursesTaught
    );
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
    const updatedInstructor = await updateInstructor(
      id,
      name,
      qualification,
      profile,
      coursesTaught
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
    await deleteInstructor(id);
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
