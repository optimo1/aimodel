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

        if (type === "income") income += amount;
        else expenses += amount;

        const savings = income - expenses;
        document.getElementById("income").textContent = `${income.toLocaleString()} KZT`;
        document.getElementById("expenses").textContent = `${expenses.toLocaleString()} KZT`;
        document.getElementById("savings").textContent = `${savings.toLocaleString()} KZT`;
        document.getElementById("progress").textContent = `${((savings / goal) * 100).toFixed(2)}% to 1M KZT`;

        // Placeholder AI analysis
        const lang = langSelect.value;
        const insight = lang === "en"
            ? `Added ${amount} to ${type}. To reach 1M faster, save ${(goal - savings) / 60} KZT monthly for 5 years.`
            : `Добавлено ${amount} в ${type}. Чтобы быстрее достичь 1 млн, откладывай ${(goal - savings) / 60} KZT ежемесячно 5 лет.`;
        document.getElementById("ai-output").textContent = insight;

        form.reset();
    });
});
