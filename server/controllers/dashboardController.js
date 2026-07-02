const Project = require("../models/Project");
const Bug = require("../models/Bug");

const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments({
      owner: req.user._id,
    });

    const totalBugs = await Bug.countDocuments();

    const openBugs = await Bug.countDocuments({
      status: "Open",
    });

    const inProgressBugs = await Bug.countDocuments({
      status: "In Progress",
    });

    const resolvedBugs = await Bug.countDocuments({
      status: "Resolved",
    });

    const closedBugs = await Bug.countDocuments({
      status: "Closed",
    });

    const criticalBugs = await Bug.countDocuments({
      priority: "Critical",
    });

    res.status(200).json({
      totalProjects,
      totalBugs,
      openBugs,
      inProgressBugs,
      resolvedBugs,
      closedBugs,
      criticalBugs,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};