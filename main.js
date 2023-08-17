document.addEventListener("DOMContentLoaded", () => {
    const jokeForm = document.getElementById("jokeForm");
    const jokeDisplay = document.getElementById("jokeDisplay");

    jokeForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const selectedCategory = document.getElementById("category").value;
        const apiUrl = `https://v2.jokeapi.dev/joke/${selectedCategory}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.joke) {
                jokeDisplay.innerHTML = `<p>${data.joke}</p>`;
            } else {
                jokeDisplay.innerHTML = "<p>No joke available for this category.</p>";
            }
        } catch (error) {
            jokeDisplay.innerHTML = "<p>An error occurred while fetching the joke.</p>";
            console.error(error);
        }
    });
});
