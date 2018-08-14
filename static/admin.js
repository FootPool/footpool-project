const admin = document.querySelector(".admin_form");
admin.addEventListener("submit", function(event) {
  event.preventDefault();

  const poolId = document.querySelector(".poolId").value;

  fetch("/admin", {
    method: "POST",
    body: JSON.stringify({
      poolId
    }),
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  }).catch(error => console.log(error, "Something went wrong"));
});
