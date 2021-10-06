function displayAllUsers() {
    $.ajax({
        method: "POST",
        url: "/admin/getEveryUser",
        success: function (users) {
            document.getElementById("userDisplay").innerHTML = users;
            $("#userDisplayPre").fadeIn({ duration: "slow" });
        },
        error: function () {
            window.open("/admin");
        }
    });
}
;
function displayAllCoCVillages() {
    $.ajax({
        method: "POST",
        url: "/admin/getEveryClashOfClansVillage",
        success: function (villages) {
            document.getElementById("cocVillagesDisplay").innerHTML = villages;
            $("#cocVillagesDisplayPre").fadeIn({ duration: "slow" });
        },
        error: function () {
            window.open("/admin");
        }
    });
}
;
//# sourceMappingURL=admin.js.map