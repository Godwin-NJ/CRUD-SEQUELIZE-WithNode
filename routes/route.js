const {
  Create,
  findAll,
  findOne,
  update,
  deleteTutorial,
  findAllPublished,
} = require("../controllers/tutorial.controller");
const router = require("express").Router();

// Create a new Tutorial
router.post("/", Create);

// // Retrieve all Tutorials
router.get("/", findAll);

// // Retrieve all published Tutorials
router.get("/published", findAllPublished);

// // Retrieve a single Tutorial with id
router.get("/:id", findOne);

// // Update a Tutorial with id
router.put("/:id", update);

// // Delete a Tutorial with id
router.delete("/:id", deleteTutorial);

// // Delete all Tutorials
// router.delete("/", tutorials.deleteAll);

module.exports = router;
