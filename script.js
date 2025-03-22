let transactions = [];
let chart;

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Budget Tracker Functions
function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description && !isNaN(amount)) {
        transactions.push({ description, amount, type });
        updateTracker();
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    }
}

function updateTracker() {
    const balance = transactions.reduce((acc, t) => 
        t.type === 'income' ? acc + t.amount : acc - t.amount, 0);
    document.getElementById('balance').textContent = `Balance: $${balance.toFixed(2)}`;

    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

    if (chart) chart.destroy();
    const ctx = document.getElementById('budgetChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                data: [income, expenses],
                backgroundColor: ['#2ecc71', '#e74c3c']
            }]
        }
    });
}

function exportToExcel() {
    const data = transactions.map(t => `${t.description},${t.amount},${t.type}`).join('\n');
    const blob = new Blob([`Description,Amount,Type\n${data}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
}

// AI Bot Functions
async function getAIResponse(input) {
    const apiKey = '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'; // Ваш API-ключ от Hugging Face
    const url = 'https://api-inference.huggingface.co/models/distilgpt2';
    const prompt = `Provide financial advice: ${input}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                max_length: 100,
                temperature: 0.7
            })
        });
        const data = await response.json();
        if (data && data[0] && data[0].generated_text) {
            return data[0].generated_text.replace(prompt, '').trim();
        } else {
            return 'Sorry, I couldn’t generate a response. Try again!';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Error connecting to AI service. Please try again later.';
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input').value;
    const output = document.getElementById('chat-output');
    output.innerHTML += `<p><strong>You:</strong> ${input}</p>`;

    output.innerHTML += `<p><strong>AI:</strong> Thinking...</p>`;
    getAIResponse(input).then(response => {
        output.innerHTML = output.innerHTML.replace('<p><strong>AI:</strong> Thinking...</p>', 
            `<p><strong>AI:</strong> ${response}</p>`);
        output.scrollTop = output.scrollHeight;
    });
    document.getElementById('chat-input').value = '';
}

// Learning Platform Functions
function startQuiz(lesson) {
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('quiz-question').textContent = 
        lesson === 1 ? 'Is budgeting just about cutting expenses?' : '';
}

function checkAnswer(answer) {
    const result = answer ? 'No, it’s about balancing income and expenses.' : 'Correct!';
    alert(result);
    document.getElementById('quiz').style.display = 'none';
}
