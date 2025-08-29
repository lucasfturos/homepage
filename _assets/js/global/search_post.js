const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll("#cardContainer .card");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    let hasMatch = false;

    cards.forEach(card => {
        const title = card.getAttribute("data-title");
        if (title.includes(query)) {
            card.style.display = "block";
            hasMatch = true;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display = hasMatch ? "none" : "block";
});
