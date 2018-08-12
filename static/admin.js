const admin = document.querySelector(".admin_form");
admin.addEventListener("submit", function(event) {
  event.preventDefault();

  const gameId = document.querySelector(".gameId").value;

  fetch("/admin", {
    method: "POST",
    body: JSON.stringify({
      gameId
    }),
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  }).catch(error => console.log(error, "Something went wrong"));
});
