# THE CS50 STUDY TRACKER
#### Video Demo: [INSERT YOUR YOUTUBE URL HERE]
#### Description:

The CS50 Study Tracker is a full-stack web application designed to solve a common problem for students: the lack of a centralized, simple way to visualize academic productivity. While there are many complex project management tools available, they often feel overwhelming for a student who simply wants to track how much time they are spending on specific subjects like Computer Science, Mathematics, or Art. This project provides a clean, intuitive interface to log study hours and review historical data.

### Technical Implementation
The application is built using the Flask framework for the backend, providing a robust bridge between the user interface and the data storage layer. For data persistence, I utilized a SQLite database managed through the CS50 SQL library. This choice was deliberate; while a text file or CSV could store data, a relational database allows for more powerful aggregate functions, such as calculating the total sum of study minutes across all entries with a single query.

The frontend is built using HTML5 and CSS3, heavily supported by the Bootstrap 4.5.3 framework. Using Bootstrap allowed me to implement a responsive design that looks equally professional on a desktop monitor and a mobile phone. This ensures that a student can log their study session immediately after finishing, even if they are away from their computer.

### File Breakdown
*   **app.py**: This is the "brain" of the project. It handles all server-side logic, including the initialization of the Flask app and the connection to the SQLite database. It contains three main routes: the index route, which calculates total study time; the add route, which processes form data using POST requests; and the history route, which retrieves all records for display.
*   **project.db**: This file contains the schema for the application. It features a table named `logs` with columns for `id`, `subject`, `minutes`, `notes`, and a `date` column that automatically timestamps every entry using the `CURRENT_TIMESTAMP` function.
*   **templates/layout.html**: To maintain a DRY (Don't Repeat Yourself) code structure, I implemented a master layout. This file contains the boilerplate HTML, the Bootstrap CDN links, and a dynamic navigation bar. This ensures that changes to the header or footer only need to be made in one place.
*   **templates/index.html**: This serves as the main dashboard. It uses Jinja syntax to pull the total minutes from the backend and display it prominently in a Bootstrap Jumbotron. It also features a clean, shadowed card containing the input form for new sessions.
*   **templates/history.html**: This page focuses on data visualization through a structured table. It iterates through the SQL rows provided by the backend to generate a clean list of all previous study sessions, ordered from newest to oldest.
*   **static/styles.css**: While Bootstrap handles the layout, this file adds custom aesthetic touches, such as a subtle gradient background and custom padding for the main container to ensure the UI doesn't feel cramped.

### Design Choices and Challenges
One significant design choice was the decision to include a "Notes" section. I realized that knowing *how long* I studied wasn't enough; I also wanted to remember *what* specifically I accomplished during that time. Another challenge was handling the state where the database was empty. Initially, the `SUM` query returned a `None` type, which caused a runtime error when trying to display it. I solved this by implementing a conditional check in Python to default the value to zero if no entries exist.

I also debated whether to include a user login system. Ultimately, for the scope of this project, I decided to focus on a "single-user local tool" philosophy. This allowed me to perfect the data entry and retrieval logic without the added complexity of session management, though it is a feature I plan to add in a future version.

### Conclusion
This project represents a culmination of the skills I have learned throughout CS50x. From designing a database schema in SQL to managing backend routes in Python and creating a responsive frontend with Bootstrap, it integrates the entire "full-stack" of web development.

#### How to Run:
1. Install requirements: `pip install flask cs50`
2. Run the app: `flask run`
