document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("language");
    const elements = document.querySelectorAll("[data-en], [data-ru]");
    let income = 0, expenses = 0;

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

        if (type === "income") {
            income += amount;
            document.getElementById("income").textContent = income;
        } else {
            expenses += amount;
            document.getElementById("expenses").textContent = expenses;
        }
        document.getElementById("savings").textContent = income - expenses;

        // Placeholder for AI analysis
        document.getElementById("ai-output").textContent = langSelect.value === "en" 
            ? `You added ${amount} to ${type}. Keep going!` 
            : `Ты добавил ${amount} в ${type === "income" ? "доходы" : "расходы"}. Продолжай!`;
        
        form.reset();
    });
});
