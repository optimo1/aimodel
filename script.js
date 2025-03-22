// script.js
function analyzeEssay() {
    let text = '';
    const fileInput = document.getElementById('essayFile');
    const textArea = document.getElementById('essayInput');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            text = e.target.result;
            processEssay(text);
        };
        reader.readAsText(file);
    } else if (textArea.value.trim()) {
        text = textArea.value;
        processEssay(text);
    }
}

function processEssay(text) {
    if (!text.trim()) return;

    // Basic analysis
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const sentenceCount = sentences.length;

    // Scoring (simplified simulation of Esslo's scoring)
    const detailScore = Math.min(10, Math.floor(wordCount / 50)); // Rough detail metric
    const voiceScore = Math.min(10, Math.floor(sentenceCount / 5)); // Rough voice metric
    const characterScore = Math.min(10, Math.floor((wordCount + sentenceCount) / 20)); // Rough character metric

    // Line-by-line feedback (basic example)
    let lineByLine = '<h3>Line-by-Line Feedback</h3>';
    sentences.forEach((sentence, index) => {
        if (sentence.split(/\s+/).length > 30) {
            lineByLine += `<p>Sentence ${index + 1}: This sentence is quite long. Consider splitting it for clarity.</p>`;
        } else if (sentence.split(/\s+/).length < 5) {
            lineByLine += `<p>Sentence ${index + 1}: This is very short. Could you add more detail?</p>`;
        }
    });

    // Scoring output
    const scoring = `
        <h3>Scoring (0-10)</h3>
        <p>Detail: ${detailScore}</p>
        <p>Voice: ${voiceScore}</p>
        <p>Character: ${characterScore}</p>
    `;

    // Suggestions
    let suggestions = '<h3>Suggestions</h3>';
    if (wordCount < 250) {
        suggestions += '<p>Your essay is on the shorter side. Consider adding more examples and depth.</p>';
    }
    if (sentenceCount < 10) {
        suggestions += '<p>Try adding more sentences to fully develop your ideas.</p>';
    }
    if (detailScore < 7) {
        suggestions += '<p>Add more specific details to strengthen your narrative.</p>';
    }

    // Update DOM
    document.getElementById('line-by-line').innerHTML = lineByLine;
    document.getElementById('scoring').innerHTML = scoring;
    document.getElementById('suggestions').innerHTML = suggestions;
}
