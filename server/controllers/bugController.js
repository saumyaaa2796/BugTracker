const Bug = require("../models/Bug");
const Project = require("../models/Project");
const createBug = async (req, res) => {
  try {
    const { title, description, priority, status, project, assignedTo } = req.body;
const { projectId, keyword } = req.query;

    const bug = await Bug.create({
      title,
      description,
      priority,
      status,
      project,
      reportedBy: req.user._id,
      assignedTo,
    });
if (!title || !description || !project) {
  return res.status(400).json({
    message: "Title, description and project are required",
  });
}
    res.status(201).json({
      message: "Bug created successfully",
      bug,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getProjectBugs = async (req, res) => {
  try {
    const bugs = await Bug.find({
      project: req.params.projectId,
    })
      .populate("reportedBy", "name email")
      .populate("assignedTo", "name email");

    res.status(200).json(bugs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const assignBug = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({
        message: "Bug not found",
      });
    }

    const project = await Project.findById(bug.project);

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the project owner can assign bugs",
      });
    }

    bug.assignedTo = assignedTo;

    await bug.save();

    res.status(200).json({
      message: "Bug assigned successfully",
      bug,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateBug = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const bugs = await Bug.find({
  project: req.query.projectId,
  title: {
    $regex: keyword,
    $options: "i",
  },
})
.populate("reportedBy", "name email")
.populate("assignedTo", "name email");
    if (!bug) {
      return res.status(404).json({
        message: "Bug not found",
      });
    }

    const project = await Project.findById(bug.project);

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the project owner can edit bugs",
      });
    }

    bug.title = title || bug.title;
    bug.description = description || bug.description;
    bug.priority = priority || bug.priority;

    await bug.save();

    res.status(200).json({
      message: "Bug updated successfully",
      bug,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateBugStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({
        message: "Bug not found",
      });
    }

    const project = await Project.findById(bug.project);

    const isOwner =
      project.owner.toString() === req.user._id.toString();

    const isAssigned =
      bug.assignedTo &&
      bug.assignedTo.toString() === req.user._id.toString();

    if (!isOwner && !isAssigned) {
      return res.status(403).json({
        message: "Not authorized to update this bug",
      });
    }

    bug.status = status;

    await bug.save();

    res.status(200).json({
      message: "Bug status updated successfully",
      bug,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({
        message: "Bug not found",
      });
    }

    const project = await Project.findById(bug.project);

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the project owner can delete bugs",
      });
    }

    await bug.deleteOne();

    res.status(200).json({
      message: "Bug deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const searchBugs = async (req, res) => {
  try {
    const { keyword } = req.query;

    const bugs = await Bug.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    })
      .populate("reportedBy", "name email")
      .populate("assignedTo", "name email");

    res.status(200).json(bugs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const filterBugs = async (req, res) => {
  try {
    const { projectId, status } = req.query;

    const bugs = await Bug.find({
      project: projectId,
      status: status,
    })
      .populate("reportedBy", "name email")
      .populate("assignedTo", "name email");

    res.status(200).json(bugs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createBug,
  getProjectBugs,
  assignBug,
  updateBug,
  updateBugStatus,
  deleteBug,
  searchBugs,
  filterBugs,
};




