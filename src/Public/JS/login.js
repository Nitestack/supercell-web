//@ts-ignore
const error = findGETParameterValue("error");
if (error && error.toLowerCase() == "password")
    document.getElementById("passwordIssue").textContent = "Invalid password!";
else if (error && error.toLowerCase() == "internal")
    document.getElementById("internalIssue").textContent = "There is an internal server error! Please try again!";
else if (error && error.toLowerCase() == "user")
    document.getElementById("usernameIssue").textContent = "User not found!";
//# sourceMappingURL=login.js.map