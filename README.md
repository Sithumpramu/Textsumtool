# TextSumm: Text Summarization Tool

## Project Overview

TextSumm is a text summarization web application that leverages state-of-the-art NLP models to generate concise summaries from user-provided text. This project includes a Flask-based backend hosted on AWS EC2, a React frontend deployed on a custom domain via InfinityFree, and Firebase integration for authentication and data storage.

---

## Features

- **Text Summarization**: Utilizes the Hugging Face model `facebook/bart-large-cnn` for accurate and efficient text summarization.
- **Flask Backend**: Handles API requests and communicates with the summarization model.
- **React Frontend**: Provides an intuitive user interface for text input and displaying summaries.
  - Includes a page to view the last three summary histories.
- **Firebase Integration**:
  - User authentication using Google Login.
  - Data storage for saving summaries associated with user accounts.
- **Custom Domain**: Frontend hosted at [http://textsumm.42web.io](http://textsumm.42web.io) using InfinityFree.

---

## Project Architecture

1. **Backend**:

   - Built with Flask and hosted on AWS EC2.
   - Exposes RESTful endpoints for processing text and generating summaries.
   - Nginx is used as a reverse proxy to manage HTTP requests and ensure seamless communication.

2. **Frontend**:

   - Built using React.
   - Deployed on InfinityFree with a custom domain.

3. **Firebase**:

   - Handles Google-based user authentication.
   - Stores user-generated summaries in a secure NoSQL database.

---

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js and npm
- Firebase account
- AWS EC2 instance
- Custom domain (configured with InfinityFree)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/textsumm.git
   cd textsumm/backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure environment variables:
   Create a `.env` file with the following content:
   ```env
   HUGGINGFACE_MODEL=facebook/bart-large-cnn
   FLASK_APP=app.py
   FLASK_ENV=production
   ```
4. Start the Flask application:
   ```bash
   python app.py
   ```
5. Deploy to AWS EC2:
   - Set up an EC2 instance and SSH into it.
   - Install required dependencies (Python, Flask, Nginx).
   - Configure Nginx to reverse proxy requests to the Flask app.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase:
   - Create a Firebase project.
   - Enable Google authentication.
   - Set up Firestore for data storage.
   - Add your Firebase configuration to `.env`:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     ```
4. Build the React app:
   ```bash
   npm run build
   ```
5. Upload the build files to InfinityFree:
   - Access your InfinityFree file manager.
   - Replace the contents of the `htdocs` folder with your build files.

### Firebase Integration

1. Ensure your Firebase project is configured with the necessary permissions.
2. Use Firestore for storing summaries by associating each record with the authenticated user.

---

## Usage

1. Visit the application at [http://textsumm.42web.io](http://textsumm.42web.io).
2. Log in using Google authentication.
3. Enter the text you want to summarize and click "Summarize".
4. View and save your generated summaries.
5. Access the history page to see your last three generated summaries.

---

## Technologies Used

- **Hugging Face**: `facebook/bart-large-cnn` for NLP processing.
- **Flask**: Backend development.
- **AWS EC2**: Hosting the backend.
- **Nginx**: Reverse proxy for HTTP requests.
- **React**: Frontend development.
- **Firebase**: User authentication and data storage.
- **InfinityFree**: Hosting the frontend on a custom domain.

---

## Future Enhancements

- Implement HTTPS for backend using AWS Load Balancer.
- Use an HTTPS domain for frontend hosting to improve security and compatibility
- Enhance the UI with advanced visualization for text data.

---

## Contributing

Contributions are welcome! Please create a pull request or open an issue for suggestions.



