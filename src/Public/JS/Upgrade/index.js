$("#hidingDiv").hide();
document.getElementById("playerSearchForm").onsubmit = function (ev) {
    ev.preventDefault();
    //@ts-ignore
    if (!document.getElementById("playerTag").value)
        return;
    $("#loadingScreen").show();
    document.getElementById("loadingScreen").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    $.ajax({
        method: "POST",
        url: "/upgrade-tracker/searchForPlayer",
        data: {
            //@ts-ignore
            playerTag: document.getElementById("playerTag").value
        },
        success: function (object) {
            $("#loadingScreen").hide();
            $("#hidingDiv").show();
            const { homeVillage, builderBase, player } = object;
            //@ts-ignore
            document.getElementById("player").value = JSON.stringify(player);
            document.getElementById("playerContainer").innerHTML = `${homeVillage}\n${builderBase}`;
        },
        error: function (err) {
            $("#loadingScreen").hide();
            document.getElementById("error").textContent = err.responseText;
        }
    });
    //@ts-ignore
    document.getElementById("playerSearchForm").reset();
};
//# sourceMappingURL=index.js.map