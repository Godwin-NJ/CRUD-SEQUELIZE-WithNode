const TutorialDB = require("../models/tutorial.model");
const { Op } = require("sequelize");

// Create and Save a new Tutorial
const Create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Tutorial in the database
  try {
    const tutorialDB = await TutorialDB.create(tutorial);
    res.send(tutorialDB);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

// Retrieve all Tutorials from the database.
const findAll = async (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const allTutorialData = await TutorialDB.findAll({ where: condition });

  if (!allTutorialData) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }

  res.send(allTutorialData);
};

// Find a single Tutorial with an id
const findOne = async (req, res) => {
  const id = req.params.id;
  const tutorialPK = await TutorialDB.findByPk(id);
  console.log(tutorialPK, "tutorialPK");
  if (!tutorialPK) {
    res.status(404).send({
      message: `Cannot find Tutorial with id=${id}.`,
    });
  }
  res.send(tutorialPK);
};

// Update a Tutorial by the id in the request
const update = async (req, res) => {
  const id = req.params.id;
  const updateTutorial = await TutorialDB.update(req.body, {
    where: { id: id },
  });
  if (!updateTutorial) {
    res.send({
      message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
    });
  }
  res.send({
    message: "Tutorial was updated successfully.",
  });
};

// Delete a Tutorial with the specified id in the request
const deleteTutorial = async (req, res) => {
  const id = req.params.id;
  const deleteTutorial = await TutorialDB.destroy({
    where: { id: id },
  });
  if (!deleteTutorial) {
    res.send({
      message: "Tutorial was deleted successfully!",
    });
  }

  res.send({
    message: "Tutorial was deleted successfully!",
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
const findAllPublished = async (req, res) => {
  const findPublished = await TutorialDB.findAll({
    where: { published: true },
  });

  if (!findPublished) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
  res.send(findPublished);
};

module.exports = {
  Create,
  findAll,
  findOne,
  update,
  deleteTutorial,
  findAllPublished,
};
