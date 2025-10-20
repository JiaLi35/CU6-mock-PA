const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

// instruction: import the course model

/* 
    instruction: 
    - setup GET /: List all courses (utilize populate() to bring in instructor details)
*/
router.get("/", async (req, res) => {
  try {
    const courses = await getCourses();
    res.status(200).send(courses);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// instruction: setup GET /:id: Retrieve details of a specific course by its _id (use populate() for instructor details)
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await getCourse(id);
    res.status(200).send(course);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// instruction: setup POST /: Add a new course
router.post("/", async (req, res) => {
  try {
    const {
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount,
    } = req.body;
    const newCourse = await addCourse(
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount
    );
    res.status(200).send(newCourse);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// instruction: setup PUT /:id: Modify details of a course by its _id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount,
    } = req.body;
    const updatedCourse = await updateCourse(
      id,
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount
    );
    res.status(200).send(updatedCourse);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// instruction: setup DELETE /:id: Remove a course by its `_id`
router.delete("/:id", async (req, res) => {
  try {
    id = req.params.id;
    await deleteCourse(id);
    res
      .status(200)
      .send({ message: `Course with ${id} has been deleted successfully.` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// instruction: export the router
module.exports = router;
