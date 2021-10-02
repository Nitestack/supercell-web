if (validateToken()) window.open("/account");
const error = findGETParameterValue("error");
if (error && error.toLowerCase() == "password") document.getElementById("passwordIssue").textContent = "Invalid password!";
else if (error && error.toLowerCase() == "user") document.getElementById("usernameIssue").textContent = "User not found!";