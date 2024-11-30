let RunSentimentAnalysis = () => {
    // Get the input text value
    const textToAnalyze = document.getElementById("textToAnalyze").value;

    // Create an XMLHttpRequest object
    let xhttp = new XMLHttpRequest();

    // Define the callback function for the request
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Parse and display the response if it is JSON
                let responseText;
                try {
                    const jsonResponse = JSON.parse(this.responseText);
                    responseText = `
                        <strong>Anger:</strong> ${jsonResponse.anger}<br>
                        <strong>Disgust:</strong> ${jsonResponse.disgust}<br>
                        <strong>Fear:</strong> ${jsonResponse.fear}<br>
                        <strong>Joy:</strong> ${jsonResponse.joy}<br>
                        <strong>Sadness:</strong> ${jsonResponse.sadness}<br>
                        <strong>Dominant Emotion:</strong> ${jsonResponse.dominant_emotion}
                    `;
                } catch (e) {
                    // If the response is plain text, display as-is
                    responseText = this.responseText;
                }
                document.getElementById("system_response").innerHTML = responseText;
            } else {
                // Handle errors gracefully
                document.getElementById("system_response").innerHTML = 
                    "An error occurred. Please try again.";
            }
        }
    };

    // Open the GET request and send it
    xhttp.open("GET", "emotionDetector?textToAnalyze=" + encodeURIComponent(textToAnalyze), true);
    xhttp.send();
};
