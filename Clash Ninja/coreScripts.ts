function brokenImg() {}
function overviewDropdown() {
    setTabsDDLFromHash();
    $("#ddlTabs").change(function() {
        $("#tablink" + this.value).click()
    });
    $("#overview-tabs").on("change.zf.tabs", function() {
        setTabsDDLFromHash()
    })
}
function setTabsDDLFromHash() {
    window.location.hash != "" && $("#ddlTabs").val(window.location.hash.replace("#", ""))
}
function showAlertBar(n, t) {
    $("#pnlAlertBanner").removeClass();
    $("#pnlAlertBanner").addClass("level-" + t);
    $("#alert-banner-content").html(n);
    $("#nav-bar").css("top", "40px");
    $("#pnlAlertBanner").slideDown()
}
function clearAlertBar() {
    $("#alert-banner-content").html();
    $("#pnlAlertBanner").slideUp();
    $("#nav-bar").css("top", "0")
}
function showFooterStatusBar(n, t, i, r) {
    var i, r;
    i || (i = !1);
    r || (r = 0);
    $("#footer-status-banner").removeClass();
    $("#footer-status-banner").addClass("level-" + t);
    $("#footer-status-banner-content").html(n);
    $("#footer-status-banner").slideDown();
    i && setTimeout(function() {
        $("#footer-status-banner").slideUp()
    }, r)
}
function clearFooterStatusBar() {
    $("#footer-status-banner-content").html();
    $("#footer-status-banner").slideUp()
}
function switchTheme(n) {
    switch (n) {
    case "dark":
        $("#csstheme").attr("href", "/styles/dark.css");
        $("meta[name=theme-color]").attr("content", "#14253D");
        $("meta[name=apple-mobile-web-app-status-bar-style]").attr("content", "#14253D");
        $("#css-switch-status").html("Dark");
        Cookies.set("css-theme", "dark", {
            expires: 365
        });
        break;
    default:
        $("#csstheme").attr("href", "/styles/light.css");
        $("meta[name=theme-color]").attr("content", "#FFFFFF");
        $("meta[name=apple-mobile-web-app-status-bar-style]").attr("content", "#FFFFFF");
        $("#css-switch-status").html("Light");
        Cookies.set("css-theme", "light", {
            expires: 365
        })
    }
}
function setBanners() {
    let n = $(".v-banner")
      , t = '<div class="vm-placement" data-id="{0}"><\/div>';
    $.each(n, function(n, i) {
        let o = $(i).data("type")
          , r = $(i).data("nodisplay")
          , f = ""
          , u = window.innerWidth
          , e = 0;
        if (r != undefined) {
            if (r = r.split(","),
            r.includes("l") && u > 1024)
                return;
            if (r.includes("m") && u >= 670 && u < 1024)
                return;
            if (r.includes("s") && u < 670)
                return
        }
        switch (o) {
        case 1:
            f = u > 1e3 ? "60927ca04e36631764631ce1" : "60927caa9ddea76a9b42d96c";
            break;
        case 2:
            f = "60927c914e36631764631cdd";
            break;
        case 3:
            f = u > 1e3 ? "60927c994e36631764631cdf" : "60927caa9ddea76a9b42d96c"
        }
        f != "" && $(i).html() == "" && ($(i).html(t.replace("{0}", f)),
        e != 0 && $(i).css("height", e + "px"))
    })
}
function updateOverviewProgressBar(n, t, i, r) {
    var o = new Date(t.cd), c = parseInt(t.ud), l = parseInt(t.lu), f = parseInt((o.getTime() - i.getTime()) / 1e3), u = 100 - f / c * 100, e, s, h;
    u = u > 100 ? 100 : u <= 0 ? 0 : Math.floor(u);
    e = "Complete: " + $.format.date(o, "E D MMM yyyy @ HH:mm");
    s = '<div class="progress" role="progressbar" tabindex="0" aria-valuenow="' + u + '" aria-valuemin="0" aria-valuetext="' + u + ' percent" aria-valuemax="100" title="' + e + '"><span class="progress-meter" style="width: ' + u + '%"><p class="progress-meter-text">' + u + "%<\/p><\/span><\/div>";
    $("#" + n.t.replace("#", "").toLowerCase() + "-" + t.eid + "-" + t.i + "-rem").html(formatTime(f));
    $("#" + n.t.replace("#", "").toLowerCase() + "-" + t.eid + "-" + t.i + "-rem").attr("title", timeToGems(f, r) + " Gems - " + e);
    $("#" + n.t.replace("#", "").toLowerCase() + "-" + t.eid + "-" + t.i + "-pro").html(s);
    h = [115, 116, 117].includes(t.eid) ? timeToGems(f, "home") : timeToGems(f, r);
    $("#" + n.t.replace("#", "").toLowerCase() + "-" + t.eid + "-" + t.i + "-gems").html('<img src="/images/gem.png" />' + h);
    f <= 0 && (oLoads.reload == 0 || Math.floor((i - oLoads.reload) / 1e3) > 30) && (oLoads.reload = Date.now(),
    location.reload())
}
function loadOverview() {
    $.ajax({
        url: "/feed/villages.json",
        method: "GET",
        timeout: 5e3,
        success: function(n, t, i) {
            oLoads.page = Date.now();
            oLoads.feed = i.getResponseHeader("g");
            oTimer.diff = Math.ceil((oLoads.page - oLoads.feed) / 1e3);
            oTimer.diff < 0 && (oTimer.diff = 0);
            overview = n;
            updateOverview()
        }
    })
}
function updateOverview() {
    if (overview != null) {
        var n = new Date;
        $.each(overview, function(t, i) {
            $.each(i.hb.b, function(t, r) {
                updateOverviewProgressBar(i, r, n, "home")
            });
            i.hb.l != null && updateOverviewProgressBar(i, i.hb.l, n, "home");
            i.hb.p != null && updateOverviewProgressBar(i, i.hb.p, n, "home");
            $.each(i.bb.b, function(t, r) {
                updateOverviewProgressBar(i, r, n, "builder")
            });
            i.bb.l != null && updateOverviewProgressBar(i, i.bb.l, n, "builder")
        })
    }
}
function structureSliders() {
    $(".txtUpdate").on("blur", function() {
        $(this).val().trim().length == 0 && $(this).val("0")
    });
    $(".slider").foundation("_reflow");
    $(".slider").on("changed.zf.slider", function() {
        var n = $(this).attr("id"), t, i;
        n != null && (t = $(this).children(".slider-handle").attr("aria-valuenow"),
        $.isNumeric(t) || (t = 0,
        $("#" + n).foundation("_reflow")),
        n = n.replace("-slider", ""),
        i = 0,
        n.indexOf("-") > -1 && (i = n.split("-"),
        i = i[0]),
        $(this).data("home-eid") == undefined ? $("#" + n + "-icon").attr("src", "/images/entities/" + i + "_" + t + ".png") : t == 0 ? $("#" + n + "-icon").attr("src", "/images/entities/" + $(this).data("home-eid") + "_" + $(this).data("home-eidl") + ".png") : $("#" + n + "-icon").attr("src", "/images/entities/" + i + "_" + $(this).data("home-eidl") + "_" + t + ".png"))
    });
    $(".loading-panel").fadeOut("slow")
}
function setGroupValues(n, t) {
    $("." + n).val(t);
    $("." + n + "-slider").foundation("_reflow")
}
function setAllGroupValuesToMax() {
    $(".txtUpdate").each(function() {
        $(this).val($(this).data("end"))
    });
    $(".slider").foundation("_reflow")
}
function setAllGroupValuesToPrevMax() {
    $(".txtUpdate").each(function() {
        $(this).val($(this).data("prevmax"))
    });
    $(".slider").foundation("_reflow")
}
function resetAllGroupValues() {
    $(".txtUpdate").each(function() {
        $(this).val("0")
    });
    $(".slider").foundation("_reflow")
}
function checkOTTOStatus(n) {
    $.ajax({
        url: "/feed/otto-unlock?playertag=" + n,
        method: "GET",
        timeout: 1e4,
        success: function(n) {
            $("#pnlOTTOCheckingStatus").hide();
            n.success ? (n.bh < 9 ? $("#pnlSubBH9").show() : (n.gearUps ? $("#pnlOTTORequirements").append('<div class="unlocked"><i class="fas fa-check"><\/i> Gear Up 3 buildings<\/div>') : $("#pnlOTTORequirements").append('<div class="unknown"><i class="fas fa-times"><\/i> Gear Up 3 buildings<\/div>'),
            n.cannonCart ? $("#pnlOTTORequirements").append('<div class="unlocked"><i class="fas fa-check"><\/i> Upgrade the Cannon Cart to level 18<\/div>') : $("#pnlOTTORequirements").append('<div class="unknown"><i class="fas fa-times"><\/i> Upgrade the Cannon Cart to level 18<\/div>'),
            n.battleMachine ? $("#pnlOTTORequirements").append('<div class="unlocked"><i class="fas fa-check"><\/i> Upgrade the Battle Machine to level 30<\/div>') : $("#pnlOTTORequirements").append('<div class="unknown"><i class="fas fa-times"><\/i> Upgrade the Battle Machine to level 30<\/div>'),
            n.gearUps && n.cannonCart && n.battleMachine && $("#pnlOTTOCheckbox").show()),
            $("#pnlOTTORequirements").show()) : $("#pnlOTTOUnlockError").show();
            console.log(n)
        },
        statusCode: {
            403: function() {
                $("#pnlOTTOCheckingStatus").hide();
                $("#pnlOTTOUnlockError").show()
            },
            500: function() {
                $("#pnlOTTOCheckingStatus").hide();
                $("#pnlOTTOUnlockError").show()
            }
        }
    })
}
function wallSliders(n) {
    $(".txtUpdate").on("blur", function() {
        $(this).val().trim().length == 0 && $(this).val("0")
    });
    $(".slider").on("changed.zf.slider", function() {
        var i = $(this).attr("id"), t;
        i != null && (t = $(this).children(".slider-handle").attr("aria-valuenow"),
        $.isNumeric(t) || (t = 0,
        $("#" + i).foundation("_reflow")));
        $(".wall-total").text(wallTotal(n))
    });
    $(".loading-panel").fadeOut("slow")
}
function wallTotal(n) {
    var t = 0;
    return $("#lbUpdate").attr("href") !== undefined && (href = $("#lbUpdate").attr("href")),
    $('#pnlWalls input[type="number"]').each(function() {
        $.isNumeric(this.value) && (t += parseInt(this.value))
    }),
    t > n ? ($("#lbUpdate").addClass("disabled"),
    $("#lbUpdate").removeAttr("href"),
    $(".walls-overview-status").html('<p class="error"><i class="fas fa-times" aria-hidden="true"><\/i> You have specified a value that exceeds the maxmimum number of wall pieces available<\/p>')) : ($("#lbUpdate").removeClass("disabled"),
    $("#lbUpdate").attr("href", href),
    t < n ? $(".walls-overview-status").html('<p class="warning"><i class="fas fa-exclamation-triangle" aria-hidden="true"><\/i> You can build ' + (n - t) + " more walls<\/p>") : $(".walls-overview-status").html('<p class="success"><i class="fas fa-check" aria-hidden="true"><\/i> You have built the maximum number of wall pieces<\/p>')),
    t
}
function copyShareLink(n, t) {
    var i = $("<input>"), r;
    $("body").append(i);
    i.val($(n).val()).select();
    document.execCommand("copy");
    i.remove();
    r = $(t).html();
    $(t).html("Copied!");
    setTimeout(function() {
        $(t).html(r)
    }, 3e3)
}
function openVillageShareModal(n) {
    $.ajax("/upgrade-tracker/boosts/share?t=" + n).done(function(n) {
        $("#trader-modal").html(n).foundation("open")
    })
}
function setVillageShareMode(n, t) {
    var i, r;
    processing || (processing = !0,
    $("#village-share-error").html("").hide(),
    i = $("#village-share-status-button").html(),
    $("#village-share-status-button").html('<i class="fas fa-spinner fa-pulse"><\/i> &nbsp;  Updating...'),
    r = {
        a: "sharing",
        t: n,
        s: t
    },
    $.ajax({
        url: "/upgrade-tracker/boost-actions",
        method: "POST",
        data: r,
        timeout: 1e4,
        success: function(r) {
            if (r == "OK") {
                switch (t) {
                case "enable":
                    $("#village-share-status").removeClass("disabled");
                    $("#village-share-status").addClass("enabled");
                    $("#village-share-status").html("Sharing: Enabled");
                    $("#village-share-status-button").removeClass("success");
                    $("#village-share-status-button").addClass("alert");
                    $("#village-share-status-button").html('<i class="fas fa-times"><\/i>  Disable Sharing');
                    $(".village-share-socials").slideDown();
                    $("#village-share-status-button").attr("onclick", "setVillageShareMode('" + n + "', 'disable');");
                    break;
                case "disable":
                    $("#village-share-status").addClass("disabled");
                    $("#village-share-status").removeClass("enabled");
                    $("#village-share-status").html("Sharing: Disabled");
                    $("#village-share-status-button").addClass("success");
                    $("#village-share-status-button").removeClass("alert");
                    $("#village-share-status-button").html('<i class="fas fa-check"><\/i>  Enable Sharing');
                    $(".village-share-socials").slideUp();
                    $("#village-share-status-button").attr("onclick", "setVillageShareMode('" + n + "', 'enable');")
                }
                processing = !1
            } else
                $("#village-share-error").html("Error: " + r),
                $("#village-share-error").fadeIn(),
                $("#village-share-status-button").html(i),
                processing = !1
        },
        fail: function() {
            $("#village-share-error").html("Error Updating: Please try again later");
            $("#village-share-error").fadeIn();
            $("#village-share-status-button").html(i);
            processing = !1
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    }))
}
function showFAQModal(n) {
    $.ajax("/faqs?q=" + n).done(function(n) {
        $("#faq-modal").html(n).foundation("open")
    })
}
function openVerifyModal(n, t) {
    $.ajax("/verify-modal/?a=" + n + "&t=" + t).done(function(n) {
        $("#pnlVerifyModal").html(n).foundation("open")
    })
}
function verifyPlayer(n, t) {
    var i = {
        a: "vigt",
        t: n,
        to: t
    };
    processing || (processing = !0,
    t == "" ? ($("#vigtError").html("<p><strong>Error: You must enter your API Token<\/strong><\/p>"),
    $("#vigtError").show(),
    processing = !1) : ($("#vigtError").hide(),
    $("#vigtButton").html('<i class="fas fa-spinner fa-pulse"><\/i> Checking...'),
    $.ajax({
        url: "/upgrade-tracker/modify-upgrade/",
        method: "POST",
        data: i,
        timeout: 1e4,
        success: function(n) {
            if (n.success)
                switch (n.level) {
                case 1:
                    $("#vigtButton").html('<i class="fas fa-check"><\/i> Complete!');
                    $("#verification-complete").show();
                    break;
                case 4:
                    $("#vigtButton").html('<i class="fas fa-search fa-flip-horizontal"><\/i> Verify');
                    $("#vigtError").html("<p><strong>Error: Your API Token failed to validate.  Please try again.<\/strong><\/p>");
                    $("#vigtError").show()
                }
            else
                showFooterStatusBar("<strong>" + n.message + "<\/strong>", n.level, !0, 3e3);
            processing = !1
        },
        statusCode: {
            400: function(n) {
                showFooterStatusBar("<strong>" + n.message + "<\/strong>", n.level, !0, 3e3);
                processing = !1
            },
            403: function() {
                location.reload()
            }
        }
    })))
}
function formatTime(n) {
    var f;
    if (n > 0) {
        var t = Math.floor(n / 2592e3)
          , i = Math.floor((n - t * 2592e3) / 86400)
          , r = Math.floor((n - t * 2592e3 - i * 86400) / 3600)
          , u = Math.floor((n - t * 2592e3 - i * 86400 - r * 3600) / 60);
        f = t > 0 ? t + "mo " + i + "d " + r + "h" : i > 0 ? i + "d " + r + "h " + u + "m" : r > 0 ? r + "h " + u + "m" : u < 1 ? "<1m" : u + "m"
    } else
        f = "Complete";
    return f
}
function formatDuration(n, t, i) {
    var r;
    if (t = typeof t != "undefined" ? t : !1,
    i = typeof i != "undefined" ? i : "Instant",
    n > 0) {
        var s = Math.floor(n / 31536e3)
          , o = Math.floor(n % 31536e3 / 2592e3)
          , e = Math.floor(n % 31536e3 / 86400 % 30)
          , f = Math.floor(n % 31536e3 % 86400 / 3600)
          , u = Math.floor(n % 31536e3 % 86400 % 3600 / 60);
        s > 0 ? (r = s + "y " + o + "mo ",
        t || (r += e + "d ")) : o > 0 ? (r = o + "mo " + e + "d ",
        t || (r += f + "h")) : e > 0 ? (r = e + "d",
        (f > 0 || u > 0) && (r += " " + f + "h",
        t || u > 0 && (r += " " + u + "m"))) : f > 0 ? (r = f + "h",
        u > 0 && (r += " " + u + "m")) : r = u < 1 ? "<1m" : u + "m"
    } else
        r = i;
    return r
}
function getResourceIcon(n) {
    switch (n) {
    case 1:
        return "/images/gold.png";
    case 2:
        return "/images/elixir.png";
    case 3:
        return "/images/de.png"
    }
}
function formatNumber(n, t) {
    for (var r = [{
        value: 1,
        symbol: ""
    }, {
        value: 1e3,
        symbol: "K"
    }, {
        value: 1e6,
        symbol: "M"
    }, {
        value: 1e9,
        symbol: "B"
    }], i = r.length - 1; i > 0; i--)
        if (n >= r[i].value)
            break;
    return (n / r[i].value).toFixed(t).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + r[i].symbol
}
function timeToGems(n, t) {
    var r, u, i, f;
    t = typeof t != "undefined" ? t : "home";
    r = [60, 3600, 86400, 604800];
    switch (t) {
    case "builder":
        u = [1, 50, 500, 2e3];
        break;
    default:
        u = [1, 20, 260, 1e3]
    }
    if (isNaN(n) && (n = 0),
    n < 0)
        return 0;
    if (n === 0)
        gems = 0;
    else if (n <= 246)
        gems = u[0];
    else {
        for (i = 3,
        f = 1; f < r.length; f++)
            if (n <= r[f]) {
                i = f;
                break
            }
        gems = Math.floor((n - r[i - 1]) * (u[i] - u[i - 1]) / (r[i] - r[i - 1])) + u[i - 1];
        gems == 0 && n > 0 && (gems = 1)
    }
    return gems < 0 && (gems = 0),
    gems
}
function gemsToTime(n, t) {
    var r, i, u;
    t = typeof t != "undefined" ? t : "home";
    r = [60, 3600, 86400, 604800];
    switch (t) {
    case "builder":
        i = [1, 50, 500, 2e3];
        break;
    default:
        i = [1, 20, 260, 1e3]
    }
    return (u = 0,
    isNaN(n) && (n = 0),
    n < 0 && (n = 0),
    n == 0) ? 0 : n <= i[0] ? 246 : n <= i[1] ? Math.ceil((n - i[0]) * ((r[1] - r[0]) / (i[1] - i[0])) + r[0]) : n <= i[2] ? Math.ceil((n - i[1]) * ((r[2] - r[1]) / (i[2] - i[1])) + r[1]) : Math.ceil((n - i[2]) * ((r[3] - r[2]) / (i[3] - i[2])) + r[2])
}
function addDays(n, t) {
    var i = new Date(n);
    return i.setDate(i.getDate() + t),
    i
}
function scrollToElement(n, t) {
    t = typeof t != "undefined" ? t : 125;
    var i = $(n);
    $("html,body").animate({
        scrollTop: i.offset().top - t
    }, "slow")
}
function ValidatorUpdateDisplay(n) {
    if (typeof n.display == "string") {
        if (n.display == "None")
            return;
        if (n.display == "Dynamic") {
            n.style.display = n.isvalid ? "none" : "inline";
            return
        }
    }
    n.style.visibility = n.isvalid ? "hidden" : "visible";
    n.isvalid ? (document.getElementById(n.controltovalidate).style.border = "1px solid #CACACA",
    document.getElementById(n.controltovalidate).style.backgroundColor = "#FEFEFE") : (document.getElementById(n.controltovalidate).style.border = "1px solid #FF0000",
    document.getElementById(n.controltovalidate).style.backgroundColor = "#FFEAEA")
}
function getCookie(n) {
    var i = document.cookie, u = n + "=", t = i.indexOf("; " + u), r;
    if (t == -1) {
        if (t = i.indexOf(u),
        t != 0)
            return null
    } else
        t += 2,
        r = document.cookie.indexOf(";", t),
        r == -1 && (r = i.length);
    return decodeURI(i.substring(t + u.length, r))
}
function is_touch_device() {
    var t = " -webkit- -moz- -o- -ms- ".split(" "), i = function(n) {
        return window.matchMedia(n).matches
    }, n;
    return "ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch ? !0 : (n = ["(", t.join("touch-enabled),("), "heartz", ")"].join(""),
    i(n))
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
function IGELoad() {
    $.each($(".in-game-event-timer"), function(n, t) {
        let i = $(t).data("eid")
          , r = $(t).data("remaining");
        i !== undefined && r !== undefined && (i = parseInt(i),
        r = parseInt(r),
        igeRemain[i] = r)
    });
    IGEUpdate();
    setInterval(IGEUpdate, 1e3)
}
function IGEUpdate() {
    let n = Math.floor(Date.now() - start) / 1e3;
    $.each($(".in-game-event-timer"), function(t, i) {
        let r = $(i).data("eid")
          , u = $(i).data("remaining");
        r !== undefined && u !== undefined && (r = parseInt(r),
        u = parseInt(u),
        igeRemain[r] > 0 ? $(i).html(formatTime(igeRemain[r] - n)) : $(i).html("Now"))
    })
}
var DateFormat, igeRemain, start;
var $header = $("#nav-bar")
  , headerShrunk = !1
  , processing = !1
  , oLoads = {
    page: 0,
    feed: 0,
    reload: 0
}
  , oTimer = {
    diff: 0,
    cycle: 30
};
setBanners();
$(document).foundation();
$(window).on("scroll", function() {
    $(document).scrollTop() > 0 ? headerShrunk || ($header.addClass("shrunk"),
    headerShrunk = !0) : headerShrunk && ($header.removeClass("shrunk"),
    headerShrunk = !1)
});
$(function() {
    $(".lazy").Lazy({
        visibleOnly: !0
    });
    $(this).scrollTop() > 0 && (headerShrunk = !0,
    $header.addClass("shrunk"));
    $("#jump-to-button-button").on("touchstart", function() {
        $("#jump-to-menu").is(":visible") ? $("#jump-to-menu").delay(150).hide(0) : $("#jump-to-menu").show()
    });
    $("#jump-to-button").on("mouseenter", function() {
        $("#jump-to-menu").show()
    });
    $("#jump-to-button").on("mouseleave", function() {
        $("#jump-to-menu").delay(150).hide(0)
    });
    $("#chkCSSSwitch").change(function() {
        this.checked ? switchTheme("dark") : switchTheme("light")
    });
    getCookie("css-theme") === null && matchMedia("(prefers-color-scheme: dark)").matches && ($("#chkCSSSwitch").prop("checked", !0),
    switchTheme("dark"));
    brokenImg();
    is_touch_device() && $(".app-install-banner").show()
});
"serviceWorker"in navigator && navigator.serviceWorker.register("/OneSignalSDKWorker.js").then(()=>{}
).catch(()=>{}
);
let deferredPrompt;
window.addEventListener("beforeinstallprompt", n=>{
    n.preventDefault(),
    deferredPrompt = n,
    $(".install-app").click(function() {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(n=>{
            n.outcome === "accepted" ? gtag("event", "install", {
                event_category: "PWA",
                event_label: ""
            }) : gtag("event", "dismiss", {
                event_category: "PWA",
                event_label: ""
            })
        }
        )
    })
}
);
window.addEventListener("appinstalled", ()=>{
    gtag("event", "installed", {
        event_category: "PWA",
        event_label: ""
    })
}
);
window.addEventListener("DOMContentLoaded", ()=>{
    let n = "browser tab";
    navigator.standalone && (n = "standalone-ios");
    window.matchMedia("(display-mode: standalone)").matches && (n = "standalone");
    gtag("event", "launch", {
        event_category: "PWA",
        event_label: n
    })
}
);
igeRemain = [0, 0, 0, 0, 0];
start = Date.now()
