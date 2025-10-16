# Calculator App - Git Bisect Demo

A simple calculator application built with React (frontend) and Spring Boot (backend) to demonstrate git bisect.

## Purpose

This project is designed to teach the use of `git bisect` for finding bugs. The commit history contains a bug that was introduced at a specific commit, and you can use git bisect to find it.

## Structure

- `backend/` - Spring Boot Java application (REST API)
- `frontend/` - React + Vite application (UI)

## Running the App

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven (or use the included Maven wrapper)

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

Or on Windows:
```bash
cd backend
mvnw.cmd spring-boot:run
```

The backend API will be available at http://localhost:8080

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The calculator UI will be available at http://localhost:5173

## Features

- **Basic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Decimal Support**: Use the decimal point for floating-point calculations
- **Keyboard Support**: 
  - Numbers: 0-9
  - Operations: +, -, *, /
  - Calculate: Enter or =
  - Clear: Escape or C
- **Clear Function**: Reset the calculator with the C button

## Using Git Bisect

This repository has been set up with a deliberate bug for teaching purposes. To practice using git bisect:

1. Start the bisect process:
   ```bash
   git bisect start
   git bisect bad HEAD
   git bisect good <early-commit>
   ```

2. Test each commit that git bisect checks out

3. Mark commits as good or bad:
   ```bash
   git bisect good  # if the commit works correctly
   git bisect bad   # if the commit has the bug
   ```

4. Git will eventually identify the commit that introduced the bug

5. When done:
   ```bash
   git bisect reset
   ```

