// Function to fetch a joke from the JokeAPI based on the selected category
async function fetchJoke(category) {
    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}`, {
      headers: {
        "Accept": "application/json"
      }
    });
  
    const data = await response.json();
  
    if (data.type === "single") {
      return data.joke;
    } else if (data.type === "twopart") {
      return `${data.setup} ${data.delivery}`;
    } else {
      return "No jokes found for this category.";
    }
  }
  
  // Function to generate a random joke based on the selected category
  async function generateJoke() {
    const jokeCategory = document.getElementById("category").value;
    const jokeElement = document.getElementById("joke");
    jokeElement.textContent = "Fetching joke...";
  
    const joke = await fetchJoke(jokeCategory);
    jokeElement.textContent = joke;
  
    // Generate a random color for the joke text
    const randomColor = getRandomColor();
    jokeElement.style.color = randomColor;
  }
  
  // Function to generate a random color
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Add click event listener to the button
  document.getElementById("btn-generate").addEventListener("click", generateJoke);
  