

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

# Initialize Flask app
app = Flask(__name__)
CORS(app)  

# Load the summarization model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        # Get the article text from the POST request
        data = request.json
        article = data.get("text", "")
        if not article:
            return jsonify({"error": "No article text provided"}), 400

        # Generate a summary
        summary = summarizer(article, max_length=130, min_length=30, do_sample=False)

        # Return the summary
        return jsonify({"summary": summary[0]["summary_text"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)

