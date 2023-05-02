# Your Therapy

This project is a full-stack web application built using Node.js with Express.js for the backend and React with Vite for the frontend. Getting Started Prerequisites

Make sure you have Node.js installed on your machine. You can download it from the official website: https://nodejs.org/ 

## Installation

Clone the repository to your local machine using Git:

    git clone https://github.com/TildyB/YourTherapy

Navigate to the project directory:

    cd your-project-name



Navigate to the project backend directory:
    cd be

Install the backend dependencies:
    npm install

Navigate to the frontend directory:

    cd fe

Install the frontend dependencies:

    npm install

Create a .env file in the backend directory of the project and add any necessary environment variables.

// example .env file PORT=5000 DB_URI=mongodb://localhost:27017/my-database JWT_SECRET=mysupersecretkey CLIENT_ID = a client ID for the OAuth2 application from the Google Developer Console. CLIENT_SECRET = a secret key for the OAuth2 application from the Google Developer Console. API_KEY = Google Calendar API KEy

## Usage

Start the backend server:

    node server.js

Start the frontend development server:

     npm run dev

Access the frontend by navigating to http://localhost:5173 in your browser.
