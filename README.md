TextSumm: Text Summarization Tool

Project Overview

TextSumm is a text summarization web application that leverages state-of-the-art NLP models to generate concise summaries from user-provided text. This project includes a Flask-based backend hosted on AWS EC2, a React frontend deployed on a custom domain via InfinityFree, and Firebase integration for authentication and data storage.

Features

Text Summarization: Utilizes the Hugging Face model facebook/bart-large-cnn for accurate and efficient text summarization.

Flask Backend: Handles API requests and communicates with the summarization model.

React Frontend: Provides an intuitive user interface for text input and displaying summaries.

Includes a page to view the last three summary histories.

Firebase Integration:

User authentication using Google Login.

Data storage for saving summaries associated with user accounts.

Custom Domain: Frontend hosted at https://textsummapi.com using InfinityFree.

Project Architecture

Backend:

Built with Flask and hosted on AWS EC2.

Exposes RESTful endpoints for processing text and generating summaries.

Nginx is used as a reverse proxy to manage HTTP requests and ensure seamless communication.

Frontend:

Built using React.

Deployed on InfinityFree with a custom domain.

Firebase:

Handles Google-based user authentication.

Stores user-generated summaries in a secure NoSQL database.

Setup Instructions

Prerequisites

Python 3.8 or higher

Node.js and npm

Firebase account

AWS EC2 instance

Custom domain (configured with InfinityFree)

Backend Setup

Clone the repository:

git clone https://github.com/yourusername/textsumm.git
cd textsumm/backend

Install dependencies:

pip install -r requirements.txt

Configure environment variables:
Create a .env file with the following content:

HUGGINGFACE_MODEL=facebook/bart-large-cnn
FLASK_APP=app.py
FLASK_ENV=production

Start the Flask application:

fl

Deploy to AWS EC2:

Set up an EC2 instance and SSH into it.

Install required dependencies (Python, Flask, Nginx).

Configure Nginx to reverse proxy requests to the Flask app.

Frontend Setup

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Configure Firebase:

Create a Firebase project.

Enable Google authentication.

Set up Firestore for data storage.

Add your Firebase configuration to .env:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

Build the React app:

npm run build

Upload the build files to InfinityFree:

Access your InfinityFree file manager.

Replace the contents of the htdocs folder with your build files.

Firebase Integration

Ensure your Firebase project is configured with the necessary permissions.

Use Firestore for storing summaries by associating each record with the authenticated user.

Usage

Visit the application at https://textsummapi.com.

Log in using Google authentication.

Enter the text you want to summarize and click "Summarize".

View and save your generated summaries.

Access the history page to see your last three generated summaries.

Technologies Used

Hugging Face: facebook/bart-large-cnn for NLP processing.

Flask: Backend development.

AWS EC2: Hosting the backend.

Nginx: Reverse proxy for HTTP requests.

React: Frontend development.

Firebase: User authentication and data storage.

InfinityFree: Hosting the frontend on a custom domain.

Future Enhancements

Add more NLP features like keyword extraction and sentiment analysis.

Enhance the UI with advanced visualization for text data.

Implement HTTPS for backend using AWS Load Balancer.

Contributing

Contributions are welcome! Please create a pull request or open an issue for suggestions.
