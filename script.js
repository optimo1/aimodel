let transactions = [];
let chart;
let currentUser = null;

function showSection(sectionId) {
    if (!currentUser) {
        showAuth();
        return;
    }
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function showAuth() {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = section.id === 'auth' ? 'block' : 'none';
    });
    document.getElementById('sidebar').style.display = 'none';
}

// Authentication Functions
function handleAuth() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isLogin = document.getElementById('auth-title').textContent === 'Login';
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (isLogin) {
        if (users[username] && users[username].password === password) {
            currentUser = username;
            loadUserData();
            updateUIAfterLogin();
        } else {
            alert('Invalid username or password.');
        }
    } else {
        if (users[username]) {
            alert('Username already exists.');
        } else {
            users[username] = { password, transactions: [] };
            localStorage.setItem('users', JSON.stringify(users));
            currentUser = username;
            transactions = [];
            updateUIAfterLogin();
        }
    }
}

function toggleAuthMode() {
    const isLogin = document.getElementById('auth-title').textContent === 'Login';
    document.getElementById('auth-title').textContent = isLogin ? 'Register' : 'Login';
    document.getElementById('auth-btn').textContent = isLogin ? 'Register' : 'Login';
    document.getElementById('auth-switch').textContent = isLogin ? 'Already have an account? Login here.' : 'Need an account? Register here.';
}

function logout() {
    currentUser = null;
    transactions = [];
    document.getElementById('welcome-msg').textContent = '';
    document.getElementById('logout-btn').style.display = 'none';
    showAuth();
}

function updateUIAfterLogin() {
    document.getElementById('welcome-msg').textContent = `Welcome, ${currentUser}!`;
    document.getElementById('logout-btn').style.display = 'inline';
    document.getElementById('sidebar').style.display = 'block';
    showSection('tracker');
}

// Budget Tracker Functions
function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description && !isNaN(amount)) {
        const transaction = { 
            date: new Date().toLocaleString(), 
            description, 
            amount, 
            type 
        };
        transactions.push(transaction);
        saveUserData();
        updateTracker();
        updateHistory();
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
                backgroundColor: ['#28a745', '#dc3545']
            }]
        }
    });
}

function exportToExcel() {
    const data = transactions.map(t => `${t.date},${t.description},${t.amount},${t.type}`).join('\n');
    const blob = new Blob([`Date,Description,Amount,Type\n${data}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
}

// History Functions
function updateHistory() {
    const tbody = document.getElementById('history-body');
    tbody.innerHTML = '';
    transactions.forEach(t => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td>$${t.amount.toFixed(2)}</td>
            <td>${t.type}</td>
        `;
        tbody.appendChild(row);
    });
}

// Data Persistence
function saveUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[currentUser].transactions = transactions;
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    transactions = users[currentUser]?.transactions || [];
    updateTracker();
    updateHistory();
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

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sidebar').style.display = 'none';
    showAuth();
});
