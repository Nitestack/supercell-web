$("#hidingDiv").hide();

document.getElementById("playerSearchForm").onsubmit = function(ev) {
    ev.preventDefault();
    //@ts-ignore
    if (!document.getElementById("playerTag").value) return;
    $("#loadingScreen").show();
    document.getElementById("loadingScreen").innerHTML = loadingScreen;
    $.ajax({
        method: "POST",
        url: "/stats-tracker/clashroyale/searchForPlayer",
        data: {
            //@ts-ignore
            playerTag: document.getElementById("playerTag").value
        },
        success: function(object) {
            $("#loadingScreen").hide();
            $("#hidingDiv").show();
            const { player, htmlCode } = object;
            document.getElementById("playerContainer").innerHTML = htmlCode;
        },
        error: function(err) {
            $("#loadingScreen").hide();
            document.getElementById("error").textContent = err.responseText;
        }
    });
    //@ts-ignore
    document.getElementById("playerSearchForm").reset();
};

function copyDeckLink() {
    if (isMobileOrTablet()) {
        window.open(this.getAttribute("data-mobile-link"));
    } else {
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(document.getElementById("copyDeckButton").getAttribute("data-link"));
    };
};