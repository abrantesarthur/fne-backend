const router = require("express").Router();
const Course = require("../models/course.model");
const Joi = require("joi");

// routes
router
  .route("/")
  .get((req, res) => {
    // get course from database
    Course.find()
      .then((course) => res.json(course))
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
    // send it back to the user
  })
  .post((req, res) => {
    // can only add one course for now
    Course.count({}, function (err, count) {
      if (err) {
        return res.status(400).json("Internal error. Please, try again.");
      }
      if (count > 0) {
        return res.status(400).json("A course has already been created!");
      }
    });
    // validate request body
    validateRequest(req, res);

    // save data in database
    course = new Course(req.body);
    course
      .save()
      .then((course) => res.json(course._id))
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .delete((req, res) => {
    // delete course
    Course.deleteMany({}, (err, result) => {
      if (err) {
        res.json("Error " + err);
      } else {
        res.json("Deleted all courses succesffully!");
      }
    });
  });

function validateRequest(req, res, next) {
  const classSchema = Joi.array().items({
    title: Joi.string().required().min(3).max(255),
    length: Joi.number().required(),
    completed: Joi.boolean().required(),
    selected: Joi.boolean().required(),
  });

  const moduleSchema = Joi.array().items({
    title: Joi.string().required().min(3).max(255),
    classes: classSchema.required().min(1),
  });

  const courseSchema = Joi.object({
    title: Joi.string().required().min(3).max(255),
    modules: moduleSchema.required().min(1),
  });

  const { error } = Joi.validate(req.body, courseSchema);
  if (error) return res.status(400).send("Invalid request body...");
}

module.exports = router;
