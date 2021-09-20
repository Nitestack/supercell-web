$("#hidingDiv").hide();
document.getElementById("playerSearchForm").onsubmit = function (ev) {
    ev.preventDefault();
    //@ts-ignore
    if (!document.getElementById("playerTag").value)
        return;
    $("#loadingScreen").show();
    document.getElementById("loadingScreen").innerHTML = loadingScreen;
    $.ajax({
        method: "POST",
        url: "/stats-tracker/clashroyale/searchForPlayer",
        data: {
            //@ts-ignore
            playerTag: document.getElementById("playerTag").value
        },
        success: function (object) {
            $("#loadingScreen").hide();
            $("#hidingDiv").show();
            const { player, htmlCode } = object;
            document.getElementById("playerContainer").innerHTML = htmlCode;
        },
        error: function (err) {
            $("#loadingScreen").hide();
            document.getElementById("error").textContent = err.responseText;
        }
    });
    //@ts-ignore
    document.getElementById("playerSearchForm").reset();
};
//# sourceMappingURL=stats.js.map