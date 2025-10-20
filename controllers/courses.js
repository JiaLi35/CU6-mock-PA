const Course = require("../models/course");

const getCourses = async () => {
  const courses = await Course.find().sort({ _id: -1 }).populate("instructor");
  return courses;
};

const getCourse = async (id) => {
  const course = await Course.findById(id).populate("instructor");
  return course;
};

const addCourse = async (
  title,
  instructor,
  startDate,
  endDate,
  subject,
  description,
  enrollmentCount
) => {
  const newCourse = new Course({
    title,
    instructor,
    startDate,
    endDate,
    subject,
    description,
    enrollmentCount,
  });
  await newCourse.save();
  return newCourse;
};

const updateCourse = async (
  id,
  title,
  instructor,
  startDate,
  endDate,
  subject,
  description,
  enrollmentCount
) => {
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    {
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount,
    },
    {
      new: true,
    }
  );
  return updatedCourse;
};

const deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
