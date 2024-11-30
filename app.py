from flask import Flask, request, render_template
from EmotionDetection.emotion_detection import emotion_detector

app = Flask("Emotion Detection")

@app.route("/emotionDetector")
def sent_analyzer():
    """
    Analyzes the emotion of the given text and returns the results in a formatted string.
    
    Returns:
        str: The formatted string containing emotion analysis results.
    """
    text_to_analyze = request.args.get('textToAnalyze')
    emotion_result = emotion_detector(text_to_analyze)
    if emotion_result['dominant_emotion'] is None:
        return "Invalid text! Please try again!"
    return (
        "For the given statement, the system response is "
        f"'anger': {emotion_result['anger']}, "
        f"'disgust': {emotion_result['disgust']}, "
        f"'fear': {emotion_result['fear']}, "
        f"'joy': {emotion_result['joy']} and "
        f"'sadness': {emotion_result['sadness']}. "
        f"The dominant emotion is {emotion_result['dominant_emotion']}."
    )

@app.route("/")
def render_index_page():
    """
    Renders the index.html page.
    
    Returns:
        str: The HTML content of the index page.
    """
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
