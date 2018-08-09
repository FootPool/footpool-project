function getFixtures(week) {
  return fetch(
    `http://api.football-data.org/v2/competitions/2021/matches?matchday=${week}`,
    {
      headers: {
        "X-Auth-Token": "db40501154f6451aaa0c34fb63296bb1"
      }
    }
  )
    .then(response => response.json())
    .catch(error => alert("RED CARD! I couldn't find the fixtures!"));
}

export default getFixtures;
