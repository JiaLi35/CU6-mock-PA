const Instructor = require("../models/instructor");

const getInstructors = async () => {
  const instructors = await Instructor.find().sort({ _id: -1 });
  return instructors;
};

const getInstructor = async (id) => {
  const instructor = await Instructor.findById(id);
  return instructor;
};

const addInstructor = async (name, qualification, profile, coursesTaught) => {
  const newInstructor = new Instructor({
    name,
    qualification,
    profile,
    coursesTaught,
  });
  await newInstructor.save();
  return newInstructor;
};

const updateInstructor = async (
  id,
  name,
  qualification,
  profile,
  coursesTaught
) => {
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

  return updatedInstructor;
};

const deleteInstructor = async (id) => {
  return await Instructor.findByIdAndDelete(id);
};

module.exports = {
  getInstructors,
  getInstructor,
  addInstructor,
  updateInstructor,
  deleteInstructor,
};
