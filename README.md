
🚀 TravelMate
=============

A role-based travel booking platform built with React.js, Tailwind CSS, and Context API.
TravelMate supports three distinct user roles — User, Driver, and Admin — each with tailored dashboards and actions to simulate a real-world trip management system.

✅ Internship Project | 👨‍💻 Tech Elecon Pvt. Ltd. 



🧰 Tech Stack
--------------
- Frontend: React.js, Tailwind CSS, Vite
- State Management: React Context API
- Routing: React Router DOM
- Icons: FontAwesome
- Data Persistence: localStorage
- Version Control: Git & GitHub

📦 Features by Role
--------------------

👤 User:
- Login with dummy credentials
- Book trips by selecting cities, dates, and vehicle
- View and filter personal trips (approved, pending, rejected)
- Book from curated travel packages with available seat tracking

👨‍💼 Admin:
- Confirm/reject pending trips
- Assign drivers to approved trips
- Manage and update default travel packages
- Monitor all system trips

🚗 Driver:
- View assigned trips
- Accept or reject trips
- Track trip history and earnings (basic stats)

📁 Project Structure
---------------------

TravelMate/ <br>
├── components/        <br>
│   ├── User/          <br>
│   ├── Admin/         <br>
│   ├── Driver/        <br>
│   └── General/       <br>
├── context/           <br>
├── data/              <br>
├── routes/            <br>
├── utils/             <br>
├── pages/             <br>
├── App.jsx            <br>
├── main.jsx           <br>
└── index.css          <br>



⚙️ Getting Started
-------------------
1. Clone the Repository
   git clone https://github.com/viralbhoi/TravelMate.git
   cd TravelMate

2. Install Dependencies
   npm install

3. Run the App
   npm run dev

The app will start on http://localhost:5173

🧪 Dummy Credentials
---------------------
| Role   | Email              | Password |
|--------|--------------------|----------|
| User   | Alice@example.com    | Alice@123      |
| Admin  | admin@example.com   | admin@123      |
| Driver | A@example.com  | Aaa@123      |

🎯 Key Learning Outcomes
-------------------------
- Role-based routing and protected UI rendering
- Persistent global state with Context API + localStorage
- Dynamic trip cost calculation
- Component-based architecture and modular design
- Git-based collaboration in a team environment


📜 License
-----------
This project is part of a student internship under Tech Elecon Pvt. Ltd.
For educational and demo purposes only.

🙌 Acknowledgments
--------------------
- Tech Elecon Pvt. Ltd. for providing the internship opportunity
- Mr. Satyam Raval for guidance and mentorship
- The incredible TravelMate team for collaboration
