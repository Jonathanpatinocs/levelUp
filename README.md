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
   - Docker MySQL:  `docker-compose up -d`
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