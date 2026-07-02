const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createBug,
  getProjectBugs,
  assignBug,
  updateBug,
  updateBugStatus,
  deleteBug,
  searchBugs,
  filterBugs,
} = require("../controllers/bugController");
const router = express.Router();

router.post("/", protect, createBug);
router.get("/search", protect, searchBugs);
router.get("/filter", protect, filterBugs);

router.get("/project/:projectId", protect, getProjectBugs);
router.put("/:id/assign", protect, assignBug);

router.put("/:id", protect, updateBug);
router.put("/:id/status", protect, updateBugStatus);
router.delete("/:id", protect, deleteBug);
module.exports = router;