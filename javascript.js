async function searchGame() {
    const gameName = document.getElementById("gameInput").value;
    const gameDate = document.getElementById("gameDate").value;
    let url = `https://www.thesportsdb.com/api/v1/json/123/searchevents.php?e=${encodeURIComponent(gameName)}`;
    if (gameDate) {
      url += `&d=${gameDate}`;
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const container = document.getElementById("results");
      container.innerHTML = "";
  
      if (data && data.event) {
        data.event.forEach(event => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${event.strEvent}</h3>
            <p><strong>Date:</strong> ${event.dateEvent}</p>
            <p><strong>Time:</strong> ${event.strTime || 'N/A'}</p>
            <p><strong>Venue:</strong> ${event.strVenue || 'N/A'}</p>
            <p><strong>Teams:</strong> ${event.strHomeTeam} vs ${event.strAwayTeam}</p>
          `;
          container.appendChild(card);
        });
      } else {
        container.innerHTML = "No matches found.";
      }
    } catch (error) {
      document.getElementById("results").innerHTML = "An error occurred while fetching data.";
      console.error(error);
    }
  }
  