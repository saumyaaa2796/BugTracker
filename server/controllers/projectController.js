const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const owner = req.user._id;

if (!name || !description) {
  return res.status(400).json({
    message: "Name and description are required",
  });
}
    const project = await Project.create({
      name,
      description,
      owner,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user._id,
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createProject,
  getProjects,
};