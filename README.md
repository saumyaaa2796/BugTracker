# BugTracker

A full-stack bug tracking web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that helps development teams efficiently manage projects, report bugs, track issue status, and monitor project progress through a clean and intuitive interface.

---

## Features

- **User Authentication:** Secure user registration and login using JWT authentication with password hashing through BcryptJS.
- **Project Management:** Create, view, and organize software projects with project descriptions and ownership.
- **Bug Reporting:** Report bugs by providing title, description, priority level, and associated project.
- **Bug Tracking:** Monitor bug status and priority throughout the development lifecycle.
- **Dashboard Overview:** View total projects, reported bugs, open issues, and resolved bugs from a centralized dashboard.

---

## Usage

### Sign Up / Log In

- Create a new account or log in using existing credentials.
- Authentication secures all protected routes using JWT tokens.

### Dashboard

- View a summary of total projects and reported bugs.
- Quickly navigate to Projects and Bugs pages.

### Projects

- Create new software projects.
- View all projects associated with your account.
- Access project details from a single page.

### Bugs

- Report new bugs by selecting a project.
- Assign priority levels (Low, Medium, High).
- View all reported bugs with their current status.
- Search and filter bugs for easier issue management.

---

## Technologies Used

- **MongoDB & Mongoose** – Database and schema modeling.
- **Express.js & Node.js** – Backend API and server.
- **React.js** – Frontend user interface.
- **JWT & BcryptJS** – Authentication and password security.
- **Axios** – API communication between frontend and backend.
- **React Router DOM** – Client-side routing.
- **CSS** – Responsive user interface styling.

---

## Folder Structure

```
BugTracker
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── utils
│
└── README.md
```

---

## Future Improvements

- Assign bugs to team members.
- Comment system for bug discussions.
- Email notifications.
- File attachment support.
- Project analytics and charts.
- Dark mode.
- Role-based access control (Admin, Developer, Tester).

---

## Acknowledgements

Built to simplify software project management by providing an efficient platform for reporting, tracking, and managing bugs. Inspired by modern issue-tracking tools and developed using the MERN stack ecosystem.
