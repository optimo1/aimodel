// script.js
function evaluateEssay() {
    let text = '';
    
    // Check if file is uploaded
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

    // Basic statistics
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;
    const avgWordsPerSentence = (wordCount / sentenceCount).toFixed(1);
    
    // Simple analysis
    const longSentences = sentences.filter(s => s.split(/\s+/).length > 30).length;
    const repeatedWords = findRepeatedWords(words);
    
    // Generate feedback
    let statsHtml = `
        <p>Word Count: ${wordCount}</p>
        <p>Sentence Count: ${sentenceCount}</p>
        <p>Average Words per Sentence: ${avgWordsPerSentence}</p>
    `;
    
    let suggestionsHtml = '<h3>Suggestions:</h3>';
    if (wordCount < 100) {
        suggestionsHtml += '<p class="suggestion">Your essay is quite short. Consider adding more details and examples.</p>';
    }
    if (longSentences > 0) {
        suggestionsHtml += `<p class="suggestion">Found ${longSentences} very long sentence(s). Consider splitting them for better readability.</p>`;
    }
    if (repeatedWords.length > 0) {
        suggestionsHtml += '<p class="suggestion">You might be overusing these words: ' + 
            repeatedWords.join(', ') + '. Try using synonyms.</p>';
    }
    if (sentenceCount < 5) {
        suggestionsHtml += '<p class="suggestion">Try adding more sentences to develop your ideas further.</p>';
    }

    document.getElementById('stats').innerHTML = statsHtml;
    document.getElementById('suggestions').innerHTML = suggestionsHtml;
}

function findRepeatedWords(words) {
    const wordFreq = {};
    words.forEach(word => {
        word = word.toLowerCase().replace(/[.,!?]/g, '');
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    return Object.entries(wordFreq)
        .filter(([_, count]) => count > 5)
        .map(([word, _]) => word)
        .slice(0, 3);
}
