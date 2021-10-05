function displayAllUsers() {
    $.ajax({
        method: "POST",
        url: "/admin/getEveryUser",
        success: function (users) {
            const userDisplay = document.getElementById("userDisplay");
            $(userDisplay).show();
        },
        error: function () {
            window.open("/admin");
        }
    });
}
;
//# sourceMappingURL=admin.js.map