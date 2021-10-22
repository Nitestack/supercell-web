//@ts-ignore
const error = findGETParameterValue("error");
if (error && error.toLowerCase() == "user") document.getElementById("usernameIssue").textContent = "Username is already in use!";
else if (error && error.toLowerCase() == "internal") document.getElementById("internalIssue").textContent = "There is an internal server error! Please try again!";
else if (error && error.toLowerCase() == "email") document.getElementById("emailIssue").textContent = "Email is already in use!";

(document.getElementById("submitButton") as HTMLButtonElement).onclick = function() {
    document.getElementById("confirmPasswordIssue").textContent = "";
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const maximumPasswordLength = 15;
    const minimumPasswordLength = 8;
    //Check empty password field  
    if (password == "") return document.getElementById("passwordIssue").innerHTML = "Fill in a password!";
    //Minimum password length validation  
    else if (password.length < 8) return document.getElementById("passwordIssue").innerHTML = `Password length must be atleast ${minimumPasswordLength} characters!`;
    //Maximum length of password validation  
    else if (password.length > 15) return document.getElementById("passwordIssue").innerHTML = `Password exceeds the maximum of ${maximumPasswordLength} characters!`;
    //Atleast one capitalized character
    else if (!includesCapitalizedOrLowerCaseCharacter(password, "capitalized")) return document.getElementById("passwordIssue").innerHTML = `Password must include atleast one capitalized letter!`;
    //Atleast one lowercase character
    else if (!includesCapitalizedOrLowerCaseCharacter(password, "lowercase")) return document.getElementById("passwordIssue").innerHTML = `Password must include atleast one lowercase letter!`;
    else if (!includesNumber(password)) return document.getElementById("passwordIssue").innerHTML = `Password must include atleast one numeric character!`;
    else {
        document.getElementById("passwordIssue").innerHTML = "";
        const pw1 = (document.getElementById("password") as HTMLInputElement).value;
        const pw2 = (document.getElementById("confirmPassword") as HTMLInputElement).value;
        if (pw1 != pw2) document.getElementById("confirmPasswordIssue").textContent = "Password doesn't match!";
        else (document.getElementById("registerForm") as HTMLFormElement).submit();
    };
};

function includesCapitalizedOrLowerCaseCharacter(text: string, mode: "capitalized" | "lowercase") {
    let trueCondition = false;
    for (const letter of text.split("")) if (isNaN((letter as unknown as number) * 1)) {
        if (mode == "capitalized" && letter == letter.toUpperCase()) trueCondition = true;
        else if (mode == "lowercase" && letter == letter.toLowerCase()) trueCondition = true;
    };
    return trueCondition;
};

function includesNumber(text: string) {
    let includesNumber = false;
    for (const letter of text.split("")) if (!isNaN((letter as unknown as number) * 1)) includesNumber = true;
    return includesNumber;
};