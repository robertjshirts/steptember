const list = document.querySelector("#leaderboard-list");
const numberFormat = new Intl.NumberFormat("en-US");
const medals = ["1", "2", "3"];

function renderLeaderboard(entries) {
  list.innerHTML = entries
    .map(
      ({ player, steps }, index) => `
        <article class="rank rank-${index + 1}">
          <div class="place" aria-label="Position ${index + 1}">${medals[index] ?? index + 1}</div>
          <div class="avatar" aria-hidden="true">${player.charAt(0)}</div>
          <div class="player">
            <h3>${player}</h3>
            <p>${index === 0 ? "Leading the pack" : index === 1 ? "Hot on the trail" : "Building momentum"}</p>
          </div>
          <div class="step-count">
            <strong>${numberFormat.format(steps)}</strong>
            <span>STEPS</span>
          </div>
        </article>`
    )
    .join("");
  list.setAttribute("aria-busy", "false");
}

async function loadLeaderboard() {
  try {
    const response = await fetch("/api/leaderboard");
    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    const data = await response.json();
    renderLeaderboard(data.leaderboard);
  } catch (error) {
    console.error(error);
    list.innerHTML = `
      <div class="status error">
        <strong>We couldn't load the standings.</strong>
        <button type="button" id="retry">Try again</button>
      </div>`;
    list.setAttribute("aria-busy", "false");
    document.querySelector("#retry").addEventListener("click", loadLeaderboard);
  }
}

loadLeaderboard();
