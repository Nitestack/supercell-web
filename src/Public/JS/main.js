if (getCookie('sound') == 'false')
    $('#sound').css('display', 'none');
else
    $('#noSound').css('display', 'none');
function setCookie(name, value, durationInDays, path) {
    const date = new Date();
    date.setTime(date.getTime() + (durationInDays * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()};${path ? ` path=${path}` : ""}`;
    if (name.toLowerCase() == "sound")
        setAudioByCookie();
}
;
function getCookie(name) {
    name += "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        let content = cookieArray[i];
        while (content.charAt(0) == " ")
            content = content.substring(1);
        if (content.indexOf(name) == 0)
            return content.substring(name.length, content.length);
    }
    ;
    return "";
}
;
$(".cookie-button").on("click", function () {
    setCookie("sound", this.getAttribute("data-sound"), 730, "/");
    $(this).hide();
    if (this.getAttribute("data-sound") == "true")
        $('#sound').show();
    else
        $("#noSound").show();
});
$("img").on("mousedown", function (event) {
    if (event.button == 2)
        return;
});
function setAudioByCookie() {
    const mute = getCookie("sound") == "true" ? false : true;
    const videoAndAudioElements = document.querySelectorAll("audio, video");
    for (let i = 0; i < videoAndAudioElements.length; i++) {
        videoAndAudioElements[i].muted = mute;
    }
    ;
}
;
setAudioByCookie();
if (getCookie("sound") == "")
    setCookie("sound", "false", 730, "/");
$(document).on("click", function (event) {
    //@ts-ignore
    if (isButton(event.target))
        document.getElementById("clickAudio").play();
});
function isButton(element) {
    return (element.getAttribute("class") || "").toLowerCase().includes("btn")
        || (element.getAttribute("class") || "").toLowerCase().includes("cursor-pointer")
        || (element.getAttribute("class") || "").toLowerCase().includes("nav-link")
        || element.tagName.toLowerCase() == "button"
        || ["button", "submit", "reset"].includes((element.getAttribute("type") || "").toLowerCase());
}
;
function createProgressBar(row, percentage, convertedRemainingTime) {
    //PROGRESS COL
    const progressCol = document.createElement("div");
    progressCol.classList.add("col");
    row.appendChild(progressCol);
    const progressDivContainer = document.createElement("div");
    progressCol.appendChild(progressDivContainer);
    if (percentage == "0%")
        progressDivContainer.classList.add("prg-bar-null");
    else
        progressDivContainer.classList.add("prg-bar");
    progressDivContainer.setAttribute("style", "--width: " + percentage.replace(/%/g, "") + ";");
    progressDivContainer.setAttribute("data-content", `${convertedRemainingTime.includes("d") ? convertedRemainingTime.split(" ").slice(0, convertedRemainingTime.split(" ").length - 1).join(" ") : convertedRemainingTime} (${percentage})`);
}
;
function setErrorPage(errorCode) {
    $.ajax({
        method: "POST",
        url: "/displayError",
        data: {
            errorCode: errorCode | 404
        },
        success: function (htmlCode) {
            document.body.innerHTML = htmlCode;
        }
    });
}
;
function displayErrorModal(errorText, errorTitle) {
    document.getElementById("errorModalTitle").textContent = errorTitle || "Error";
    document.getElementById("errorModalText").textContent = errorText;
    document.getElementById("errorModalButton").click();
}
;
function showFooterBar(text, timeInSeconds) {
    const footerBar = document.getElementById("footerBar");
    footerBar.textContent = text;
    $(footerBar).slideDown();
    setTimeout(() => {
        $(footerBar).slideUp();
    }, timeInSeconds ? timeInSeconds * 1000 : 3000);
}
;
let headerShrunk = false;
window.onscroll = function () {
    if ($(document).scrollTop() > 0) {
        document.getElementById("navbar").style.height = "70px";
        document.getElementById("logo").style.fontSize = "25px";
        document.getElementById("logo").style.padding = "22px";
        $("#inGameEventTimeLine").hide("fast");
        headerShrunk = true;
    }
    else {
        document.getElementById("navbar").style.height = "130px";
        document.getElementById("logo").style.fontSize = "35px";
        document.getElementById("logo").style.padding = "50px";
        $("#inGameEventTimeLine").show("slow");
        headerShrunk = false;
    }
    ;
};
//# sourceMappingURL=main.js.map