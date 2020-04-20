const router = require("express").Router();

router.post("/add", (req, res) => {
  // assert that a course has been added already
  Course.count({}, function (err, count) {
    if (err) {
      return res.status(400).json("Internal server error. Please, try again!");
    } else if (!count) {
      if (!count) return res.status(400).json("No course has been added yet!");
    } else if (count > 1) {
      return res.status(400).json("Delete a course before adding a module!");
    }
  });

  //validate module
  validateRequest(req, res);

  // add module to course
  Course.find()
  .then(course =>
        const module
    )

});

function validateRequest(req, res) {
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

  const { error } = Joi.validate(req.body, moduleSchema);
  if (error) return res.status(400).send("Invalid request body...");
}

module.exports = router;
