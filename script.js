document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("language");
    const elements = document.querySelectorAll("[data-en], [data-ru]");
    let income = 0, expenses = 0, goal = 1000000; // Goal: 1 million KZT

    // Language toggle
    langSelect.addEventListener("change", () => {
        const lang = langSelect.value;
        elements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    });

    // Form submission
    const form = document.getElementById("transaction-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;
        const category = document.getElementById("category").value;
        const date = document.getElementById("date").value;

        if ( skončit

type === "income" ? income += amount : expenses += amount;
        const savings = income - expenses;
        document.getElementById("income").textContent = `${income.toLocaleString()} KZT`;
        document.getElementById("expenses").textContent = `${expenses.toLocaleString()} KZT`;
        document.getElementById("savings").textContent = `${savings.toLocaleString()} KZT`;
        document.getElementById("progress").textContent = `${((savings / goal) * 100).toFixed(2)}% to 1M KZT`;

        // Placeholder AI analysis (to be replaced with API call)
        const lang = langSelect.value;
        const insight = lang === "en" 
            ? `You added ${amount} to ${type}. At this rate, you'll reach 1M in ${Math.ceil((goal - savings) / (savings || 1))} months!`
            : `Ты добавил ${amount} в ${type === "income" ? "доходы" : "расходы"}. С такой скоростью ты достигнешь 1 млн через ${Math.ceil((goal - savings) / (savings || 1))} месяцев!`;
        document.getElementById("ai-output").textContent = insight;

        form.reset();
    });
});
