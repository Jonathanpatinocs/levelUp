# levelUp

Financial planner app

## Run Database

1. Install Docker Desktop
2. Run `docker-compose up -d`
3. Database runs at `localhost:3306` with:
   - user: root
   - password: rootpassword
   - db: project_db

## Quick Start: Testing API with Postman

Install Postman
Download from https://www.postman.com/downloads/

http://localhost:8080

Start Backend & Database

- Docker MySQL: `docker-compose up -d`
- Spring Boot: run the backend normally.

Send Requests
Use Postman to test API endpoints:

- GET /users → retrieve users
- POST /users → add new user (JSON body { "name": "Alice", "email": "alice@example.com" })
- PUT /users/{id} → update user
- DELETE /users/{id} → remove user

## Running Backend

Install Java (JDK)

- Spring Boot requires Java to run.
- Download and install the latest Java SE Development Kit (JDK) for your OS from the official site:https://www.java.com/en/download/manual.jsp
- After installation, verify it’s working: `java -version`
- Note: Make sure it’s the JDK, not just the JRE, because the backend needs the development kit to compile and run Spring Boot.

Install IntelliJ IDEA

- Recommend IntelliJ IDEA Community Edition (free).
- Download: https://www.jetbrains.com/idea/download/
- Install using the standard installer.
  Optional: install the Spring Assistant / Spring Boot Plugin inside IntelliJ for easier development.

Run the Spring Boot Application

- Run from IntelliJ
- Open the main class (e.g., Application.java) → click the green Run button.
- The backend should start on http://localhost:8080
- Note: Make sure Dockerized MySQL is running before starting Spring Boot (docker-compose up -d)

## Running Frontend

Install Node.js and npm

- Download and install Node.js (which include npm) from the official site: https://nodejs.org/
- Verify the installation in your terminal: `- node -v` `- npm -v`
#### Navigate to the frontend folder
- From the project root: `cd frontend`
- Install dependencies: `npm install`
- Start the development server: `npm start`
  - Opens the React app on http://localhost:3000.
  - The frontend will interact with the backend (Spring Boot) at http://localhost:8080.
- Note: If a new dependency is added later, `run npm install` again.

## Git Workflow: Committing and Pushing Changes

1. Check your current branch

- `git branch`
  Make sure you’re on the correct branch (e.g., main or a feature branch).
- For new work, it’s a good idea to create a feature branch: `git checkout -b feature/your-feature-name`

2. Check the status of your changes

- `git status`
- Shows files that are modified, new, or untracked.
- Helps you see what will be committed.

3. Stage your changes

- `git add .`
- Adds all changes to the staging area.

4. Commit your changes

- git commit -m "Add brief but clear message describing your changes"
- Keep messages short and descriptive, e.g
  - "Add user list page"
  - "Fix login form validation

5. Pull latest changes from remote

- `git pull origin main`
- Ensures you have the latest code before pushing.
- Resolve any merge conflicts if prompted.

6. Push your changes

- `git push origin your-branch-name`
- Sends your commits to the remote repository.
- Other team members can now pull your changes.

7. Merge feature branch into main

- Create a Pull Request (PR) in GitHub or GitLab for review.
- After approval, merge into main.
