const signUp = document.querySelectorAll("#signup-form");
signUp.addEventListener("submit", function(event) {
  event.preventDefault();

  const newUsername = document.querySelectorAll("#new-username").value;
  const newPassword = document.querySelectorAll("#new-password").value;
  const newEmail = document.querySelectorAll("#new-email").value;
  const newSecretAnswer = document.querySelectorAll("#new-secret-answer").value;

  fetch("/signup", {
    method: "POST",
    body: JSON.stringify({
      newUsername,
      newPassword,
      newEmail,
      newSecretAnswer
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
