const logIn = document.querySelectorAll("#login-form");
logIn.addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.querySelectorAll("#username").value;
  const password = document.querySelectorAll("#password").value;

  fetch("/login", {
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
