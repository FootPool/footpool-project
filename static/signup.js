const signUp = document.querySelector("#signup-form");
signUp.addEventListener("submit", function(event) {
  event.preventDefault();

  const newUsername = document.querySelector("#new-username").value;
  const newPassword = document.querySelector("#new-password").value;
  const newEmail = document.querySelector("#new-email").value;

  fetch("/signup", {
    method: "POST",
    body: JSON.stringify({
      newUsername,
      newPassword,
      newEmail
    }),
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  }).then(function(response) {
    if (response.status === 200) {
      window.location.pathname = "/login";
    } else {
      alert("something went wrong");
    }
  });
});
