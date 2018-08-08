const logIn = document.querySelector("#login-form");
logIn.addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  }).then(function(response) {
    if (response.status === 200) {
      window.location.pathname = "/index";
    } else {
      alert("invalid user name or password");
    }
  });
});
