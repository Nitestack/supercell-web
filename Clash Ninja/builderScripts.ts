function loadTab(n, t, i) {
    t = typeof t != "undefined" ? t : !1;
    tabcall != null && tabcall.abort();
    var r = n.replace("cphBody_tab", "");
    (!tabLoad[r] || t) && (tabcall = $.ajax("/upgrade-tracker/" + playertag + "/" + baseType + "/tab/" + r.toLowerCase()).done(function(n) {
        $("#" + r.toLowerCase() + ".tabs-panel").fadeOut("fast", function() {
            $("#" + r.toLowerCase() + ".tabs-panel").html(n);
            $("#" + r.toLowerCase() + ".tabs-panel").fadeIn("fast", function() {
                $(".lazy").Lazy({
                    visibleOnly: !0
                });
                updateUpgrades();
                showBuilderPlanner && loadPlanner(baseType, "builders");
                showLabPlanner && loadPlanner(baseType, "lab");
                showPetPlanner && loadPlanner(baseType, "petplanner");
                $("#" + r.toLowerCase() + ".tabs-panel").foundation();
                $(".tabs-content.overview-tab").css("min-height", $("#" + r.toLowerCase() + ".tabs-panel").height());
                eval($("#scr" + r).html())
            })
        });
        i !== undefined && i();
        tabLoad[r] = !0
    }))
}
function resetTabCache() {
    tabLoad = {
        defences: !1,
        traps: !1,
        army: !1,
        resources: !1,
        spells: !1,
        darkTroops: !1,
        heroes: !1,
        pets: !1,
        walls: !1,
        builders: !1,
        lab: !1,
        petplanner: !1,
        stats: !1
    };
    $(".tabs-panel:not(.is-active)").html("");
    builderPlanner = !1;
    labplanner = !1;
    petplanner = !1;
    buildersItems = new vis.DataSet;
    labItems = new vis.DataSet;
    petItems = new vis.DataSet;
    buildersGroups = new vis.DataSet;
    labGroups = new vis.DataSet;
    petGroups = new vis.DataSet;
    buildersTimeline = null;
    labTimeline = null;
    eventsHolder = null;
    builderInitialLoad = !0;
    labInitialLoad = !0;
    petInitialLoad = !0
}
function reloadCurrentTab(n) {
    resetTabCache();
    loadTab($(".tabs-title.is-active")[0].id, !1, n)
}
function loadUpgrades(n) {
    $.ajax({
        url: "/feed/upgrades/" + n + ".json",
        method: "GET",
        timeout: 5e3,
        success: function(n) {
            loads.page = Date.now();
            loads.feed = n.g;
            timer.diff = Math.ceil((loads.page - loads.feed) / 1e3);
            timer.diff < 0 && (timer.diff = 0);
            upgrades = n;
            updateUpgrades();
            updateTrader(n)
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    })
}
function updateUpgrades() {
    if (upgrades != null) {
        for (i = 0; i <= 10; i++)
            arrAdjTime[i] = arrTime[i];
        now = new Date;
        now.setSeconds(now.getSeconds() + timer.diff);
        $.each(upgrades.hb.b, function(n, t) {
            updateProgressBar(t, now, "home")
        });
        upgrades.hb.l != null && updateProgressBar(upgrades.hb.l, now, "home");
        upgrades.hb.p != null && updateProgressBar(upgrades.hb.p, now, "home");
        $.each(upgrades.bb.b, function(n, t) {
            updateProgressBar(t, now, "builder")
        });
        upgrades.bb.l != null && updateProgressBar(upgrades.bb.l, now, "builder");
        updateAPIButton(now, upgrades.alu);
        updateClockButton(now, upgrades.ctb);
        traderLoadTime == 0 && (traderLoadTime = addDays(now.setUTCHours(0, 0, 0, 0), 1));
        var n = Math.floor((traderLoadTime - now.getTime()) / 1e3);
        n <= 0 && (traderLoadTime = 0);
        $("#trader-next-cycle").html(formatDuration(n));
        $("#defenceTime").html(formatRemainingTime(arrAdjTime[2], upgrades.bi.hvu, 0, $("#defenceTime").data("r")));
        $("#builderDefenceTime").html(formatRemainingTime(arrAdjTime[2], upgrades.bi.bbu, 1));
        $("#builderGearupTime").html(formatRemainingTime(arrAdjTime[6], upgrades.bi.bbu, 1));
        $("#trapTime").html(formatRemainingTime(arrAdjTime[4], upgrades.bi.hvu, 0, $("#trapTime").data("r")));
        $("#builderTrapTime").html(formatRemainingTime(arrAdjTime[4], upgrades.bi.bbu, 1));
        $("#armyTime").html(formatRemainingTime(arrAdjTime[1], upgrades.bi.hvu, 0, $("#armyTime").data("r")));
        $("#builderArmyTime").html(formatRemainingTime(arrAdjTime[1], upgrades.bi.bbu, 1));
        $("#resourceTime").html(formatRemainingTime(arrAdjTime[3], upgrades.bi.hvu, 0, $("#resourceTime").data("r")));
        $("#builderResourceTime").html(formatRemainingTime(arrAdjTime[3], upgrades.bi.bbu, 1));
        $("#troopTime").html(formatRemainingTime(arrAdjTime[5], upgrades.bi.hvu, 1));
        $("#spellTime").html(formatRemainingTime(arrAdjTime[6], upgrades.bi.hvu, 1));
        $("#darkTroopTime").html(formatRemainingTime(arrAdjTime[7], upgrades.bi.hvu, 1));
        $("#heroTime").html(formatRemainingTime(arrAdjTime[9], upgrades.bi.hvu, 2));
        $("#petTime").html(formatRemainingTime(arrAdjTime[10], upgrades.bi.hvu, 2));
        totalStructureTime = parseInt($("#totalStructureTime").data("time"));
        $("#totalStructureTime").data("time") == undefined && (totalStructureTime = parseInt($("#builderTotalStructureTime").data("time")));
        isNaN(totalStructureTime) && (totalStructureTime = 0);
        switch (baseType) {
        case "home":
            $.each(upgrades.hb.b, function(n, t) {
                [1, 2, 3, 4].indexOf(t.etid) > -1 && (totalStructureTime += parseInt((t.cd - now.valueOf()) / 1e3))
            });
            break;
        case "builder":
            $.each(upgrades.bb.b, function(n, t) {
                [12, 13, 14, 15].indexOf(t.etid) > -1 && (totalStructureTime += parseInt((t.cd - now.valueOf()) / 1e3))
            })
        }
        $("#totalStructureTime").html(formatRemainingTime(totalStructureTime, upgrades.bi.hvu, 0));
        $("#builderTotalStructureTime").html(formatRemainingTime(totalStructureTime, upgrades.bi.bbu, 0));
        totalLabTime = parseInt($("#totalLabTime").data("time"));
        isNaN(totalLabTime) && (totalLabTime = 0);
        switch (baseType) {
        case "home":
            upgrades.hb.l != null && (totalLabTime += parseInt((upgrades.hb.l.cd - now.valueOf()) / 1e3));
            break;
        case "builder":
            upgrades.bb.l != null && (totalLabTime += parseInt((upgrades.bb.l.cd - now.valueOf()) / 1e3))
        }
        $("#totalLabTime").html(formatRemainingTime(totalLabTime, upgrades.bi.hvu, 2));
        totalHeroTime = parseInt($("#totalHeroTime").data("time"));
        isNaN(totalHeroTime) && (totalHeroTime = 0);
        switch (baseType) {
        case "home":
            $.each(upgrades.hb.b, function(n, t) {
                t.etid == 9 && (totalHeroTime += parseInt((t.cd - now.valueOf()) / 1e3))
            });
            break;
        case "builder":
            $.each(upgrades.bb.b, function(n, t) {
                t.etid == 17 && (totalHeroTime += parseInt((t.cd - now.valueOf()) / 1e3))
            })
        }
        $("#totalHeroTime").html(formatRemainingTime(totalHeroTime, upgrades.bi.hvu, 2));
        totalPetTime = parseInt($("#totalPetTime").data("time"));
        isNaN(totalPetTime) && (totalPetTime = 0);
        switch (baseType) {
        case "home":
            upgrades.hb.p !== null && (totalPetTime += parseInt((upgrades.hb.p.cd - now.valueOf()) / 1e3))
        }
        $("#totalPetTime").html(formatRemainingTime(totalPetTime, upgrades.bi.hvu, 2));
        $("#grandTotalHBuilderTime").html(formatRemainingTime(totalStructureTime + totalHeroTime, upgrades.bi.hvu, 3));
        $("#grandTotalBBuilderTime").html(formatRemainingTime(totalStructureTime + totalHeroTime, upgrades.bi.bbu, 2));
        $("#grandTotalLabTime").html(formatRemainingTime(totalLabTime, upgrades.bi.hvu, 1));
        $("#grandTotalPetTime").html(formatRemainingTime(totalPetTime, upgrades.bi.hvu, 1))
    }
}
function updateProgressBar(n, t, i) {
    var o = parseInt(n.cd), h = parseInt(n.ud), c = parseInt(n.lu), u = parseInt((o - t.valueOf()) / 1e3), r = 100 - u / h * 100, e, f, s;
    r = r > 100 ? 100 : r <= 0 ? 0 : Math.floor(r);
    arrAdjTime[n.etid] += u;
    e = "Complete: " + $.format.date(o, "E D MMM yyyy @ HH:mm");
    f = "";
    switch (n.eid) {
    case 1:
    case 65:
        f = 'Complete: TIME <br><span id="gems-' + n.eid + "-" + n.i + '" class="gem-amount"><\/span>';
        break;
    default:
        f = c + 1 + ' <span class="show-for-medium">Upgrade Complete:<\/span><span class="show-for-small-only"> - <\/span> TIME <span id="gems-' + n.eid + "-" + n.i + '" class="gem-amount"><\/span>'
    }
    var l = '<div class="progress" role="progressbar" tabindex="0" aria-valuenow="' + r + '" aria-valuemin="0" aria-valuetext="' + r + ' percent" aria-valuemax="100" title="' + e + '"><span class="progress-meter" style="width: ' + r + '%"><p class="progress-meter-text">' + r + "%<\/p><\/span><\/div>"
      , a = '<div class="upgrade-timer text-center" title="' + e + '"><i class="fas fa-arrow-up"><\/i> ' + f + "<\/div>"
      , v = l + a.replace("TIME", formatTime(u));
    $("#pnlUpgrades-" + n.eid + "-" + n.i).html(v);
    $(".builderplanner-" + n.eid + "-" + n.i).html(formatTime(u));
    s = [115, 116, 117].includes(n.eid) ? timeToGems(u, "home") : timeToGems(u, i);
    $("#gems-" + n.eid + "-" + n.i).html('<img src="/images/gem.png" /> ' + s);
    u <= 0 && (loads.reload == 0 || Math.floor((Date.now() - loads.reload) / 1e3) > 30) && (loads.reload = Date.now(),
    [1, 65].includes(n.eid) ? location.reload() : (loadUpgrades(playertag),
    reloadCurrentTab()))
}
function traderPanel(n) {
    $("#trader-items-panel-main").slideToggle("fast", function() {
        $("#trader-items-panel-main").is(":visible") ? ($("#trader-items-panel-compact").hide(),
        $("#trader-items-panel-button").html("Hide Trader Cycle Panel"),
        $("#trader-items-panel-link").html('<i class="fas fa-minus"><\/i> Collapse Trader Items')) : ($("#trader-items-panel-compact").show(),
        $("#trader-items-panel-button").html("Show Trader Cycle Panel"),
        $("#trader-items-panel-link").html('<i class="fas fa-plus"><\/i> Expand Trader Items'));
        localStorage.setItem(n, $(this).is(":visible"))
    })
}
function updateTrader(n) {
    var u;
    if (parseInt(n.thl) >= 8) {
        $("#btnTraderShowFullCycle").hide();
        $("#btnTraderShowNextOccurance").hide();
        $("#btnTraderReset").hide();
        var i = n.tr
          , t = ""
          , r = "";
        switch (i.s) {
        case "s":
            t = '<div class="cell small-12 medium-6"> <fieldset class="fieldset trader-items-offers"> <legend>Current<\/legend> <div class="grid-x grid-margin-x"> ';
            r = '<div class="cell small-12"> <div class="grid-x grid-margin-x"> ';
            $.each(i.c, function(n, i) {
                t += renderTraderOffer(i, !1);
                r += renderTraderOffer(i, !0)
            });
            t += '<\/div> <\/fieldset> <\/div> <div class="cell small-12 medium-6"> <fieldset class="fieldset trader-items-offers"> <legend>Next<\/legend> <div class="grid-x grid-margin-x">   ';
            $.each(i.n, function(n, i) {
                t += renderTraderOffer(i, !1)
            });
            t += "<\/div> <\/fieldset> <\/div>";
            r += "<\/div> <\/div>";
            t += '<div class="cell small-12 medium-6 medium-offset-6"><strong>Next Items:<\/strong> <span id="trader-next-cycle"><\/span><\/div>';
            $("#btnTraderShowFullCycle").show();
            $("#btnTraderShowNextOccurance").show();
            $("#btnTraderReset").show();
            break;
        case "d1":
        case "d2":
            t = '<div class="cell small-12 text-center"><p>In order to track what your next trader offers will be, you need to select your current offers.<\/p><\/div>';
            r = '<div class="cell small-12 text-center show-for-medium"><a href="https://www.youtube.com/watch?v=2KmhU4KKD5o&t=85s" class="button radius tiny alert" target="_blank" style="margin: -5px 0 0 0; float: right;"><i class="fab fa-youtube fa-fw"><\/i> Video Guide<\/a> Expand this panel to set your offers.<\/div><div class="cell small-12 text-center show-for-small-only">Show the Trader Cycle Panel to set your offers.<\/div>';
            switch (i.s) {
            case "d1":
                t += '<div class="cell small-12 medium-6 large-4 large-offset-2 text-center"><div class="button radius" onclick="loadTraderWindow(\'set\', \'' + n.tws + '\');"><i class="fas fa-tasks"><\/i> Set Day 1<\/div><\/div><div class="cell small-12 medium-6 large-4 text-center"><div class="button radius disabled" title="Day 1 must be set first"><i class="far fa-clock"><\/i> Day 2<\/div><br /><a href="https://www.youtube.com/watch?v=2KmhU4KKD5o&t=85s" class="button radius tiny alert hide-for-medium" target="_blank"><i class="fab fa-youtube fa-fw"><\/i> Video Guide<\/a><\/div>';
                break;
            case "d2":
                u = "";
                u = now.valueOf() - parseInt(i.td1) < 864e5 ? '<div class="button radius disabled" title="The cycle updates at 00:00 UTC each day"><i class="far fa-clock"><\/i> Waiting for next trader cycle<\/div>' : "<div class=\"button radius\" onclick=\"loadTraderWindow('set', '" + n.tws + '\');"><i class="fas fa-tasks"><\/i> Set Day 2<\/div>';
                t += '<div class="cell small-12 medium-6 large-4 large-offset-2 text-center"><p><strong><i class="fas fa-check"><\/i> Day 1 Set<\/strong><\/p><\/div><div class="cell small-12 medium-6 large-4 text-center">' + u + "<\/div>";
                $("#btnTraderReset").show()
            }
        }
        $("#pnlTraderOffers").html(t);
        $("#pnlTraderOffersCompact").html(r)
    }
}
function renderTraderOffer(n, t) {
    var i = "", r;
    return i = parseInt(n.q) > 1 ? n.n + " x " + n.q : n.n,
    r = '<div class="cell small-4 text-center trader-item-offer">',
    r += t ? '<strong style="color: #4078C0;">' + i + '<\/strong><br class="hide-for-medium" /> ' : "<h3>" + i + '<\/h3><img src="/images/magic-items/' + n.id + '.png" title="' + i + '" class="item" /> <br />',
    r += parseInt(n.c) > 0 ? '<img src="/images/gem.png" class="gem" /> ' + n.c : "Free",
    r + "<\/div>"
}
function toggleHideWalls() {
    var n = $("#btnWallHideComplete");
    n.hasClass("disabled") && (n.removeClass("disabled"),
    n.attr("onClick", "setHideWallsSetting();"))
}
function setHideWallsSetting() {
    var n = $("#btnWallHideComplete"), t;
    n.addClass("disabled");
    n.removeAttr("onclick");
    t = {
        a: "hidewalls",
        t: playertag,
        b: baseType,
        s: $("#chkWallHideComplete").prop("checked")
    };
    $.ajax({
        url: "/upgrade-tracker/modify-upgrade/",
        method: "POST",
        data: t,
        timeout: 1e4,
        success: function() {
            reloadCurrentTab()
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    })
}
function saveTabSettings(n, t, i) {
    if (!processing) {
        processing = !0;
        setTriggerLoading(i);
        var r = {
            a: "tab-settings",
            t: n,
            b: t,
            s: $("#chkHideCompletedStructures").prop("checked"),
            r: $("#chkHideCompletedResearch").prop("checked"),
            w: $("#chkHideCompletedWalls").prop("checked")
        };
        $.ajax({
            url: "/upgrade-tracker/modify-upgrade/",
            method: "POST",
            data: r,
            timeout: 1e4,
            success: function() {
                resetTabCache();
                reloadCurrentTab();
                $("#modify-modal").foundation("close")
            },
            statusCode: {
                403: function() {
                    location.reload()
                }
            }
        });
        resetProcessingFlag()
    }
}
function formatRemainingTime(n, t, r, u) {
    u = typeof u != "undefined" ? u : 99;
    var f;
    if (n == 0)
        f = "<strong>Complete<\/strong>";
    else
        switch (r) {
        case 1:
            f = "Total:<br /><strong>" + formatTime(n) + "<\/strong>";
            break;
        case 2:
            f = "Total:<br /><strong>" + formatTime(n) + "<\/strong>";
            break;
        case 3:
            f = '<table border="0" id="grand-total-table"><tr><td><strong>Total:<\/strong><\/td><td><strong>' + formatTime(n) + "<\/strong><\/td><\/tr>";
            let r = 6;
            for (currentTHLevel < 10 && (r = 5),
            i = t; i <= r; i++)
                f += "<tr><td>With " + i + " builders:<\/td><td><strong>" + formatTime(n / i) + "<\/strong><\/td><\/tr>";
            f += "<\/table>";
            break;
        default:
            f = "Total:<br /><strong>" + formatTime(n) + "<\/strong>";
            u >= t && (f += "<br />With " + t + " builders: <br /> <strong>" + formatTime(n / t) + "<\/strong>")
        }
    return f
}
function updateAPIButton(n, t) {
    var i = 60 - parseInt((n.valueOf() - parseInt(t)) / 1e3);
    i <= 0 ? ($(".apiUpdate").html('<i class="fas fa-sync-alt"><\/i> API Update'),
    $(".apiUpdate").prop("title", "API Update"),
    $(".apiUpdate").removeClass("disabled"),
    $(".apiUpdate").unbind("click").click(function() {
        updateAPI(upgrades.t)
    })) : ($(".apiUpdate").html('<i class="fas fa-sync-alt"><\/i> API Update - Available in ' + formatTime(i)),
    $(".apiUpdate").prop("title", "API Update available in " + formatTime(i)),
    $(".apiUpdate").addClass("disabled"),
    $(".apiUpdate").unbind("click"))
}
function updateClockButton(n, t) {
    var i = parseInt((parseInt(t + 792e5) - n.valueOf()) / 1e3)
      , r = "";
    r = i <= 0 ? "Boost Ready" : "Next Boost in: " + formatTime(i);
    $("#ClockTowerBoostStatus").html(r)
}
function updateAPI(n) {
    var t = {
        a: "api",
        t: n
    };
    processing || (processing = !0,
    $(".apiUpdate").css("cursor", "progress"),
    $(".apiUpdate").html('<i class="fas fa-spinner fa-pulse"><\/i> &nbsp; Updating...'),
    $.ajax({
        url: "/upgrade-tracker/modify-upgrade/",
        method: "POST",
        data: t,
        timeout: 1e4,
        success: function(n) {
            n == "OK" ? ($(".apiUpdate").css("cursor", ""),
            $(".apiUpdate").html("Updated!"),
            location.reload(),
            processing = !1) : ($(".api-error").html("Error Updating: Please try again later"),
            $(".api-error").fadeIn().delay(5e3).fadeOut(),
            $(".apiUpdate").css("cursor", ""),
            $(".apiUpdate").html('<i class="fas fa-sync-alt"><\/i> API Update'),
            processing = !1)
        },
        fail: function() {
            $(".api-error").html("Error Updating: Please try again later");
            $(".api-error").fadeIn().delay(5e3).fadeOut();
            $(".apiUpdate").css("cursor", "");
            $(".apiUpdate").html('<i class="fas fa-sync-alt"><\/i> API Update');
            processing = !1
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    }))
}
function updateLeagueFromAPI(n, t) {
    var i = {
        a: "api-league",
        t: n
    };
    processing || (processing = !0,
    $(".btnLeagueRefresh").css("cursor", "progress"),
    $(".btnLeagueRefresh").html('<i class="fas fa-spinner fa-pulse"><\/i> &nbsp; Updating...'),
    $.ajax({
        url: "/upgrade-tracker/modify-upgrade/",
        method: "POST",
        data: i,
        timeout: 1e4,
        success: function(i) {
            i == "OK" ? ($.ajax("/upgrade-tracker/loot-planner/" + n + "/" + t).done(function(n) {
                $("#loot-planner-modal").html(n)
            }),
            processing = !1) : ($(".btnLeagueRefresh").html("Failed").delay(5e3).html('<i class="fas fa-sync-alt"><\/i> Refresh'),
            $(".btnLeagueRefresh").css("cursor", ""),
            processing = !1)
        },
        fail: function() {
            $(".btnLeagueRefresh").html("Failed").delay(5e3).html('<i class="fas fa-sync-alt"><\/i> Refresh');
            $(".btnLeagueRefresh").css("cursor", "");
            processing = !1
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    }))
}
function clockTowerBoost(n) {
    var t = {
        a: "ctb",
        t: n
    };
    $.ajax({
        url: "/upgrade-tracker/modify-upgrade/",
        method: "POST",
        data: t,
        timeout: 1e4,
        success: function(t) {
            t == "OK" && (loadUpgrades(n.replace("#", "").toLowerCase()),
            reloadCurrentTab(function() {
                showFooterStatusBar("<strong>Clock Tower Boost applied.<\/strong>", 1, !0, 3e3)
            }))
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    })
}
function clockTowerPotion(n) {
    var t = {
        a: "ctp",
        t: n
    };
    $.ajax({
        url: "/upgrade-tracker/modify-upgrade/",
        method: "POST",
        data: t,
        timeout: 1e4,
        success: function(t) {
            t == "OK" && (loadUpgrades(n.replace("#", "").toLowerCase()),
            reloadCurrentTab(function() {
                showFooterStatusBar("<strong>Clock Tower Potion applied.<\/strong>", 1, !0, 3e3)
            }))
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    })
}
function builderPotion(n) {
    var t = {
        a: "bp",
        t: n
    };
    $.ajax({
        url: "/upgrade-tracker/modify-upgrade/",
        method: "POST",
        data: t,
        timeout: 1e4,
        success: function(t) {
            t == "OK" && (loadUpgrades(n.replace("#", "").toLowerCase()),
            reloadCurrentTab(function() {
                showFooterStatusBar("<strong>Builder Potion applied.<\/strong>", 1, !0, 3e3)
            }))
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    })
}
function researchPotion(n) {
    var t = {
        a: "rp",
        t: n
    };
    $.ajax({
        url: "/upgrade-tracker/modify-upgrade/",
        method: "POST",
        data: t,
        timeout: 1e4,
        success: function(t) {
            t == "OK" && (loadUpgrades(n.replace("#", "").toLowerCase()),
            reloadCurrentTab(function() {
                showFooterStatusBar("<strong>Research Potion applied.<\/strong>", 1, !0, 3e3)
            }))
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    })
}
function actionModal(n, t, i, r, u, f, e, o) {
    if (f = typeof f != "undefined" ? f : 0,
    e = typeof e != "undefined" ? e : 0,
    o = typeof o != "undefined" ? o : null,
    !processing) {
        var s;
        processing = !0;
        setTriggerLoading(o);
        switch (n) {
        case "build":
            s = {
                a: "build",
                t: r,
                e: t,
                i: i,
                c: u,
                bt: e
            };
            $.ajax({
                url: "/upgrade-tracker/modify-upgrade/",
                method: "POST",
                data: s,
                timeout: 1e4,
                success: function(n) {
                    switch (n) {
                    case "OK":
                        [1, 65].includes(t) ? location.reload() : (reloadCurrentTab(),
                        loadUpgrades(r),
                        resetProcessingFlag(),
                        $("#modify-modal").foundation("close"));
                        break;
                    case "Too Many":
                        $.ajax("/upgrade-tracker/modify-upgrade/builders/?e=" + t + "&i=" + i + "&t=" + r + "&l=" + u).done(function(n) {
                            $("#modify-modal").html(n).foundation("open");
                            brokenImg();
                            resetTriggerValue(o)
                        });
                        break;
                    case "Level Skip":
                        showFooterStatusBar("<strong>Error:<\/strong> This isn't a valid upgrade, try refreshing the page.", 4);
                        resetTriggerValue(o);
                        break;
                    case "Magic Book":
                        $.ajax("/upgrade-tracker/modify-upgrade/magicbook/?e=" + t + "&i=" + i + "&t=" + r + "&l=" + u).done(function(n) {
                            $("#modify-modal").html(n).foundation("open");
                            brokenImg();
                            resetTriggerValue(o)
                        });
                        break;
                    case "Hammer":
                        $.ajax("/upgrade-tracker/modify-upgrade/hammer/?e=" + t + "&i=" + i + "&t=" + r + "&l=" + u).done(function(n) {
                            $("#modify-modal").html(n).foundation("open");
                            brokenImg();
                            resetTriggerValue(o)
                        })
                    }
                },
                statusCode: {
                    403: function() {
                        location.reload()
                    }
                }
            });
            break;
        case "lab":
        case "pet":
            s = {
                a: "lab",
                t: r,
                e: t,
                c: u,
                bt: e
            };
            $.ajax({
                url: "/upgrade-tracker/modify-upgrade/",
                method: "POST",
                data: s,
                timeout: 1e4,
                success: function(n) {
                    switch (n) {
                    case "OK":
                        reloadCurrentTab();
                        loadUpgrades(r);
                        resetProcessingFlag();
                        $("#modify-modal").foundation("close");
                        break;
                    case "Too Many":
                        $.ajax("/upgrade-tracker/modify-upgrade/lab/?e=" + t + "&t=" + r + "&l=" + u).done(function(n) {
                            $("#modify-modal").html(n).foundation("open");
                            brokenImg();
                            resetTriggerValue(o)
                        });
                        break;
                    case "Magic Book":
                        $.ajax("/upgrade-tracker/modify-upgrade/magicbook/?e=" + t + "&i=" + i + "&t=" + r + "&l=" + u).done(function(n) {
                            $("#modify-modal").html(n).foundation("open");
                            brokenImg();
                            resetTriggerValue(o)
                        });
                        break;
                    case "Hammer":
                        $.ajax("/upgrade-tracker/modify-upgrade/hammer/?e=" + t + "&i=" + i + "&t=" + r + "&l=" + u).done(function(n) {
                            $("#modify-modal").html(n).foundation("open");
                            brokenImg();
                            resetTriggerValue(o)
                        })
                    }
                },
                statusCode: {
                    403: function() {
                        location.reload()
                    }
                }
            });
            break;
        case "singleWall":
            s = {
                a: "walls",
                t: r,
                e: t,
                c: u,
                cnt: f
            };
            $.ajax({
                url: "/upgrade-tracker/modify-upgrade/",
                method: "POST",
                data: s,
                timeout: 1e4,
                success: function(n) {
                    n == "OK" ? (reloadCurrentTab(),
                    loadUpgrades(r),
                    resetProcessingFlag()) : ($("#modify-modal").html('<div class="grid-x grid-padding-x modify-modal"><div class="cell small-12 text-center"><h1>Error Updating<\/h1><p>' + n + '<\/p><\/div><button class="close-button" data-close aria-label="Close modal" type="button"><span aria-hidden="true">&times;<\/span><\/button><\/div>').foundation("open"),
                    resetTriggerValue(o))
                },
                statusCode: {
                    403: function() {
                        location.reload()
                    }
                }
            });
            break;
        case "multiWall":
            s = {
                a: "walls",
                t: r,
                e: t,
                c: u,
                cnt: f
            };
            $.ajax("/upgrade-tracker/modify-upgrade/walls/?e=" + t + "&t=" + r + "&l=" + u).done(function(n) {
                $("#modify-modal").html(n).foundation("open");
                brokenImg();
                resetTriggerValue(o)
            });
            break;
        default:
            $.ajax("/upgrade-tracker/modify-upgrade/" + n + "/?e=" + t + "&i=" + i + "&t=" + r + "&l=" + u).done(function(n) {
                $("#modify-modal").html(n).foundation("open");
                brokenImg();
                resetTriggerValue(o)
            })
        }
    }
}
function postUpgrade(n, t, i, r, u, f, e) {
    var o, h, s;
    if (f = typeof f != "undefined" ? f : !0,
    e = typeof e != "undefined" ? e : null,
    !processing) {
        processing = !0;
        setTriggerLoading(e);
        $("#error").fadeOut();
        switch (n) {
        case "update":
            h = $("#ddlDays").val() + "-" + $("#ddlHours").val() + "-" + $("#ddlMinutes").val();
            o = {
                a: n,
                e: t,
                i: i,
                c: r,
                t: u,
                time: h
            };
            break;
        case "cancel":
        case "complete":
            o = {
                a: n,
                e: t,
                i: i,
                c: r,
                t: u
            };
            break;
        case "walls":
            s = $("#txtMultiWall").val();
            isNaN(s) && (s = 0);
            o = {
                a: n,
                e: t,
                c: r,
                t: u,
                cnt: s
            }
        }
        $.ajax({
            url: "/upgrade-tracker/modify-upgrade/",
            method: "POST",
            data: o,
            timeout: 1e4,
            success: function(i) {
                if (i == "OK") {
                    if (f)
                        if ([1, 65].includes(t))
                            location.reload();
                        else {
                            if (resetTabCache(),
                            n != "update")
                                loadTab($(".tabs-title.is-active")[0].id);
                            else
                                switch ($(".tabs-title.is-active")[0].id) {
                                case "cphBody_tabBuilders":
                                case "cphBody_tabLab":
                                    loadTab($(".tabs-title.is-active")[0].id)
                                }
                            loadUpgrades(playertag);
                            $("#modify-modal").foundation("close");
                            resetTriggerValue(e)
                        }
                    resetProcessingFlag()
                } else
                    $("#error").html("Error: " + i),
                    $("#error").fadeIn(),
                    resetTriggerValue(e)
            },
            fail: function() {
                $("#error").html("Error Updating: Please try again later");
                $("#error").fadeIn();
                resetTriggerValue(e)
            },
            statusCode: {
                403: function() {
                    location.reload()
                }
            }
        });
        f || (processing = !1)
    }
}
function setTriggerLoading(n) {
    n != null && (triggerPrevContent = $(n).html(),
    $(n).css("cursor", "progress"),
    $(n).html('<i class="fas fa-spinner fa-pulse"><\/i> ' + $(n).text()))
}
function resetTriggerValue(n) {
    processing = !1;
    n != null && ($(n).css("cursor", ""),
    $(n).html(triggerPrevContent),
    triggerPrevContent = "")
}
function resetProcessingFlag() {
    processing = !1;
    triggerPrevContent = ""
}
function loadBoostModal(n, t, i) {
    switch (n) {
    case "season":
        $.ajax("/upgrade-tracker/boosts/" + n + "?t=" + t).done(function(n) {
            $("#modify-modal").html(n).foundation("open")
        });
        break;
    case "otto":
        $.ajax("/upgrade-tracker/boosts/" + n + "?t=" + t).done(function(n) {
            $("#modify-modal").html(n).foundation("open")
        });
        break;
    case "loot-planner":
        $.ajax("/upgrade-tracker/loot-planner/" + t + "/" + i).done(function(n) {
            $("#loot-planner-modal").html(n).foundation("open")
        });
        break;
    case "tab-settings":
        $.ajax("/upgrade-tracker/boosts/" + n + "/" + t + "/" + i).done(function(n) {
            $("#modify-modal").html(n).foundation("open")
        })
    }
}
function updateSeasonBoosts(n, t) {
    var i, r, u;
    if (!processing) {
        if (processing = !0,
        setTriggerLoading(t),
        $("#season-boost-error").html("").hide(),
        i = $("#ddlSeasonBoostBuilder").val(),
        r = $("#ddlSeasonBoostResearch").val(),
        $.isNumeric(i)) {
            i = parseFloat(i);
            switch (i) {
            case 0:
            case .1:
            case .15:
            case .2:
                break;
            default:
                $("#season-boost-error").html("Invalid builder boost value").fadeIn("fast");
                resetTriggerValue(t);
                return
            }
        } else {
            $("#season-boost-error").html("Invalid builder boost value").fadeIn("fast");
            resetTriggerValue(t);
            return
        }
        if ($.isNumeric(r)) {
            r = parseFloat(r);
            switch (r) {
            case 0:
            case .1:
            case .15:
            case .2:
            case .3:
                break;
            default:
                $("#season-boost-error").html("Invalid research boost value").fadeIn("fast");
                resetTriggerValue(t);
                return
            }
        } else {
            $("#season-boost-error").html("Invalid research boost value").fadeIn("fast");
            resetTriggerValue(t);
            return
        }
        u = {
            a: "set-season-boosts",
            t: n,
            bb: i,
            rb: r,
            u: !0
        };
        $.ajax({
            url: "/upgrade-tracker/boost-actions",
            method: "POST",
            data: u,
            timeout: 1e4,
            success: function(n) {
                n == "OK" ? (reloadCurrentTab(function() {
                    showFooterStatusBar("<strong>Season Boosts updated.<\/strong>", 1, !0, 3e3);
                    loadUpgrades(playertag)
                }),
                $("#season-boost-values").html("<strong>Season Boosts:<\/strong> Builder: " + i * 100 + "% Research: " + r * 100 + "%"),
                $("#modify-modal").foundation("close"),
                resetProcessingFlag()) : ($("#season-boost-error").html("Error: " + n),
                $("#season-boost-error").fadeIn(),
                resetTriggerValue(t))
            },
            fail: function() {
                $("#season-boost-error").html("Error Updating: Please try again later");
                $("#season-boost-error").fadeIn();
                resetTriggerValue(t)
            },
            statusCode: {
                403: function() {
                    location.reload()
                }
            }
        })
    }
}
function moveMasterBuilder(n, t) {
    var i, r;
    $("#master-builder-travel-error").html("").hide();
    processing || (processing = !0,
    i = $("#master-builder-travel-text").html(),
    $("#master-builder-travel-text").html("Travelling..."),
    r = {
        a: "master-builder-travel",
        t: n,
        v: t
    },
    $.ajax({
        url: "/upgrade-tracker/boost-actions",
        method: "POST",
        data: r,
        timeout: 1e4,
        success: function(n) {
            n == "OK" ? location.reload() : ($("#master-builder-travel-error").html("Error: " + n),
            $("#master-builder-travel-error").fadeIn(),
            $("#master-builder-travel-text").html(i),
            processing = !1)
        },
        fail: function() {
            $("#master-builder-travel-error").html("Error Updating: Please try again later");
            $("#master-builder-travel-error").fadeIn();
            $("#master-builder-travel-text").html(i);
            processing = !1
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    }))
}
function loadTraderWindow(n, t) {
    switch (n) {
    case "set":
    case "reset":
    case "full-cycle":
    case "next-occurance":
        $.ajax("/upgrade-tracker/trader/" + n + "?t=" + t).done(function(n) {
            $("#trader-modal").html(n).foundation("open")
        })
    }
}
function getTraderSlotOptions(n) {
    var t, i, r, u;
    t = $("#ddlSlot1").data("ddslick").selectedData.value;
    i = $("#ddlSlot2").data("ddslick").selectedData.value;
    r = $("#ddlSlot3").data("ddslick").selectedData.value;
    $.isNumeric(t) ? $.isNumeric(i) ? $.isNumeric(r) ? ($("#trader-error").fadeOut(),
    u = {
        a: "set",
        t: n,
        s1: t,
        s2: i,
        s3: r
    },
    $.ajax({
        url: "/upgrade-tracker/trader-action/",
        method: "POST",
        data: u,
        timeout: 1e4,
        success: function(t) {
            t == "OK" ? ($("#trader-modal").foundation("close"),
            loadUpgrades(n)) : ($("#trader-error").html("Error: " + t),
            $("#trader-error").fadeIn())
        },
        fail: function() {
            $("#trader-error").html("Error Updating: Please try again later");
            $("#trader-error").fadeIn()
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    })) : ($("#trader-error").html("Error: Slot 3 must be set"),
    $("#trader-error").fadeIn()) : ($("#trader-error").html("Error: Slot 2 must be set"),
    $("#trader-error").fadeIn()) : ($("#trader-error").html("Error: Slot 1 must be set"),
    $("#trader-error").fadeIn())
}
function resetTraderCycle(n) {
    var t = {
        a: "reset",
        t: n
    };
    $.ajax({
        url: "/upgrade-tracker/trader-action/",
        method: "POST",
        data: t,
        timeout: 1e4,
        success: function(t) {
            t == "OK" ? ($("#trader-modal").foundation("close"),
            loadUpgrades(n)) : ($("#trader-error").html("Error: " + t),
            $("#trader-error").fadeIn())
        },
        fail: function() {
            $("#trader-error").html("Error Resetting: Please try again later");
            $("#trader-error").fadeIn()
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    })
}
function setTraderNotification(n, t, i) {
    var u = "#trader-notification-" + t + " .fa-stack", r = '<span class="fa-stack" title="{1}"> <i class="fas fa-circle {2} fa-stack-2x"><\/i> <i class="fas {3} fa-stack-1x fa-inverse"><\/i> <\/span>', f;
    $(u).prop("onclick", null).off("click");
    f = {
        a: "track-trader-item",
        t: n,
        toid: t,
        s: i
    };
    $.ajax({
        url: "/notification-action",
        method: "POST",
        data: f,
        timeout: 1e4,
        success: function(f) {
            var e = JSON.parse(f);
            e.dc != 0 && e.tn || !i || warningDisplayed || ($.ajax("/upgrade-tracker/trader/notification-warning").done(function(n) {
                $("#trader-warning-modal").html(n);
                var t = new Foundation.Reveal($("#trader-warning-modal"));
                t.open()
            }),
            warningDisplayed = !0);
            i ? (r = r.replace("{1}", "Click to disable notifications for this offer"),
            r = r.replace("{2}", "enabled"),
            r = r.replace("{3}", "fa-bell")) : (r = r.replace("{1}", "Click to enable notifications for this offer"),
            r = r.replace("{2}", "disabled"),
            r = r.replace("{3}", "fa-bell-slash"));
            $(u).html(r);
            $(u).on("click", function() {
                setTraderNotification(n, t, !i)
            })
        },
        fail: function() {
            $(u).on("click", function() {
                setTraderNotification(n, t, i)
            })
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    })
}
function styleTab(n, t, i, r, u) {
    var e = " <i class='fas fa-arrow-up'><\/i> (" + u + ")"
      , o = " (" + u + ")"
      , f = "";
    switch (r) {
    case "complete":
        $("#cphBody_tab" + t).removeClass("yellow");
        $("#cphBody_tab" + t).addClass("green");
        f = i + " <i class='fas fa-check'><\/i>";
        $('#ddlTabs option[value="' + n.toLowerCase() + '"]').text(i + " ✔");
        break;
    case "active":
        $("#cphBody_tab" + t).removeClass("green");
        $("#cphBody_tab" + t).addClass("yellow");
        f = i + e;
        $('#ddlTabs option[value="' + n.toLowerCase() + '"]').text(i + o);
        break;
    default:
        $("#cphBody_tab" + t).removeClass("green");
        $("#cphBody_tab" + t).removeClass("yellow");
        f = i;
        $('#ddlTabs option[value="' + n.toLowerCase() + '"]').text(i)
    }
    $("#tablink" + n).html(f)
}
function setProgressBar(n, t) {
    let i = $(n);
    i.length != 0 && (t > 100 ? t = 100 : t < 0 && (t = 0),
    $(n + " .progress-meter").css("width", Math.floor(t) + "%"),
    $(n + " .progress-meter .progress-meter-text").text(t + "%"),
    t == 100 ? i.addClass("success") : i.removeClass("success"))
}
function updateTimers() {
    if ($("#boost-time-remaining").length) {
        var n = parseInt($("#boost-time-remaining").data("remaining"));
        $("#boost-time-remaining").html(formatDuration(n - lpDiff, !1, "Ending..."))
    }
    $(".countdown-timer").each(function(n, t) {
        if ($(t).data("remaining") != undefined) {
            let n = parseInt($(t).data("remaining"))
              , i = !1
              , r = !1;
            if ($(t).data("twosigfig") == !0 && (i = !0),
            $(t).data("nextseason") == !0 && (r = !0),
            n > 0) {
                let u = formatDuration(n - lpDiff, i, "Now");
                r && (u = u + "*");
                $(t).html(u)
            } else
                $(t).html() == "" && $(t).html("Now")
        }
    })
}
function setResourceAmounts() {
    $(type).each(function(n, t) {
        var i = "#pnl" + t + "Rates"
          , r = parseFloat($(i).data("hourly"));
        $(i).length && ($(i + " .hourly").html(formatNumber(r * resourceMultiplier, 1)),
        $(i + " .daily").html(formatNumber(r * resourceMultiplier * 24, 1)),
        $(i + " .weekly").html(formatNumber(r * resourceMultiplier * 168, 2)))
    });
    setBoostButtonText()
}
function toggleResourceBoosts() {
    var n = parseFloat($("#btnResourceBoost").data("multiplier"));
    resourceMultiplier = resourceMultiplier == 1 ? n : 1;
    setResourceAmounts()
}
function setBoostButtonText() {
    switch (baseType) {
    case "home":
        resourceMultiplier != 1 ? $("#btnResourceBoost").html('<img src="/images/magic-items/3.png" /> Show Regular Values') : $("#btnResourceBoost").html('<img src="/images/magic-items/3.png" /> Show Boosted Values')
    }
}
function validateGemTimeValue(n, t, i) {
    isNaN(n) && ($("#gem-update-message").text("Must enter a number"),
    $("#gem-update-message").show());
    var r = timeToGems(t, i);
    n > r ? ($("#gem-update-message").text("Gem value must be less than " + r),
    $("#gem-update-message").show()) : (n < r && (n = parseInt(n) + 1),
    $("#gem-update-message").text(""),
    $("#gem-update-message").hide(),
    updateTimerDropdowns(n, i))
}
function updateTimerDropdowns(n, t) {
    var i = 0;
    isNaN(n) && (i = 0);
    i = n < 0 ? 0 : gemsToTime(n, t);
    var r = Math.floor(i / 86400)
      , u = Math.floor((i - r * 86400) / 3600)
      , f = Math.floor((i - r * 86400 - u * 3600) / 60);
    $("#ddlDays").val(r);
    $("#ddlHours").val(u);
    $("#ddlMinutes").val(f)
}
function loadPlanner(n, t) {
    if ($("#" + t).is(":visible")) {
        switch (t) {
        case "builders":
            if (builderPlanner)
                return;
            builderPlanner = !0;
            break;
        case "lab":
            if (labplanner)
                return;
            labplanner = !0;
            break;
        case "petplanner":
            if (petplanner)
                return;
            petplanner = !0
        }
        $("#" + t + "-loading-text").delay(8e3).fadeIn();
        $.ajax({
            url: "/feed/planner/" + n + "/" + t + "/" + playertag + ".json",
            method: "GET",
            timeout: 1e4,
            success: function(i) {
                var f, o, r, e, s, u;
                eventsHolder = i.ev;
                switch (t) {
                case "builders":
                    builderCount = i.bc;
                    buildersGroups.add({
                        id: 0,
                        content: "Events"
                    });
                    f = builderCount;
                    switch (n) {
                    case "home":
                        $("#chkShowNextTHUpgradesBuilders").prop("checked", i.nth);
                        break;
                    case "builder":
                        $("#chkShowNextTHUpgradesBuilders").prop("checked", i.nbh)
                    }
                    break;
                case "lab":
                    labGroups.add({
                        id: 0,
                        content: "Events"
                    });
                    f = labCount;
                    switch (n) {
                    case "home":
                        $("#chkShowNextTHUpgradesLab").prop("checked", i.nth);
                        break;
                    case "builder":
                        $("#chkShowNextTHUpgradesLab").prop("checked", i.nbh)
                    }
                    break;
                case "petplanner":
                    petGroups.add({
                        id: 0,
                        content: "Events"
                    });
                    f = petCount
                }
                for (o = 1,
                r = 0; r <= f; r++)
                    if (e = 0,
                    s = jQuery.grep(i.e, function(n) {
                        return n.b === r
                    }),
                    $.each(s, function(n, i) {
                        var u = 0, a = i.eid + "-" + i.i + "-" + i.l, c = Math.round(i.c / i.ud * 100) / 100, f, h, s, l;
                        if (c == Infinity && (c = 0),
                        f = '<li id="' + a + '" data-duration="' + i.ud + '" data-entityid="' + i.eid + '" data-typeid="' + i.etid + '" data-level="' + i.l + '"  data-identity="' + i.i + '" data-name="' + i.n + '" data-rt="' + i.rt + '" data-c="' + i.c + '" data-cpd="' + c + '" data-currentlevel="' + i.cl + '" data-mth="' + i.mth + '" data-ub="' + i.ub + '" data-uh="' + i.uh + '"',
                        r == 0 && (f += ' data-reset="' + o + '"'),
                        i.cd !== 0 ? u = i.cd : (u = e === 0 ? (new Date).getTime() : e,
                        u = i.ub || i.uh ? u : u + i.ud * 1e3),
                        h = "",
                        i.in == undefined)
                            switch (parseInt(i.etid)) {
                            case 6:
                            case 21:
                                h = "/images/entities/" + i.eid + ".png";
                                break;
                            default:
                                h = "/images/entities/" + i.eid + "_" + i.l + ".png"
                            }
                        else
                            h = "/images/entities/" + i.in + ".png";
                        s = "th" + i.mth + " e-" + i.eid;
                        l = "auto";
                        i.a ? (s += " item-disabled",
                        l = "auto") : i.ub ? s += " item-usebook" : i.uh && (s += " item-usehammer");
                        f += 'data-end="' + u + '" class="' + s + '" class="' + s + '"' + (i.a ? '> <div class="grid-x">' : '><div class="grid-x"><div class="cell shrink"><div class="handle"><\/div><\/div> ') + ' <div class="cell shrink"><div class="planner-list-icon" style="background-image: url(' + h + ');"><\/div><\/div> <div class="cell ' + l + '" style="position: relative;"><h3>' + formatEntityName(i.eid, i.n, i.i) + " Level " + i.l + "<\/h3>";
                        f += i.a ? '<div class="builderplanner-upgradetimer"><i class="fas fa-arrow-up"><\/i> <span class="builderplanner-' + i.eid + "-" + i.i + '"><\/span><\/div>' : '<div class="resource-cost-time"><div class="resource-cost-' + i.rt + '" style="line-height: 26px; float: left;"><img src = "' + getResourceIcon(i.rt) + '" /> <strong>' + formatNumber(i.c, 2) + '<\/strong><\/div> <div class="text-center upgrade-duration" style="margin-left: 15px; line-height: 26px; float: left;"> ' + formatDuration(i.ub || i.uh ? 0 : i.ud, !0) + "<\/div><\/div>";
                        f += '<div class="builder-ddug-holder"><div class="builder-dd-button-holder"><\/div><div class="builder-ug-button-holder"><\/div><\/div><\/div><\/li>';
                        $("#" + t + "-" + r).append(f);
                        setMoveToBuilderMenu(a, t);
                        e = u;
                        r == 0 && o++
                    }),
                    r > 0) {
                        u = "";
                        switch (t) {
                        case "builders":
                            u = "Builder " + r;
                            buildersGroups.add({
                                id: r,
                                content: u
                            });
                            break;
                        case "lab":
                            u = "Lab";
                            labGroups.add({
                                id: r,
                                content: u
                            });
                            break;
                        case "petplanner":
                            u = "Pets";
                            petGroups.add({
                                id: r,
                                content: u
                            })
                        }
                    }
                $("." + t + "-list").sortable({
                    connectWith: "." + t + "-list",
                    handle: ".handle",
                    opacity: .9,
                    items: "li:not(.item-disabled)",
                    change: function(n, i) {
                        var r = i.item[0], f = parseInt($(r).data("currentlevel")), u = parseInt($(r).data("level")), e = parseInt($(r).data("entityid")), o = parseInt($(r).data("identity")), s;
                        u - f > 1 && (s = parseInt($("." + t + '-list li[data-entityid="' + e + '"][data-identity="' + o + '"][data-level="' + (u - 1) + '"]').data("end")),
                        itemChange(i, t))
                    },
                    over: function(n, i) {
                        i.item.data("hoverlist", $(this).attr("id"));
                        itemChange(i, t)
                    }
                }).disableSelection();
                $("." + t + "-list").on("sortstop", function() {
                    eventsHolder = i.ev;
                    processData(!0, t, eventsHolder);
                    recalcBuilderButtons(t)
                });
                switch (t) {
                case "builders":
                    buildersTimeline = new vis.Timeline(document.getElementById("builders-chart"));
                    buildersTimeline.setOptions(options);
                    buildersTimeline.setGroups(buildersGroups);
                    buildersTimeline.on("rangechanged", function() {
                        builderInitialLoad && setTimeout(function() {
                            fitTimeline("builders");
                            builderInitialLoad = !1;
                            $("#builders-chart").css("left", 0)
                        }, 300)
                    });
                    buildersTimeline.addCustomTime(i.sb.e, "season-bank");
                    buildersTimeline.setCustomTimeMarker("Next Season Bank Payout", "season-bank");
                    break;
                case "lab":
                    labTimeline = new vis.Timeline(document.getElementById("lab-chart"));
                    labTimeline.setOptions(options);
                    labTimeline.setGroups(labGroups);
                    labTimeline.on("rangechanged", function() {
                        labInitialLoad && setTimeout(function() {
                            fitTimeline("lab");
                            labInitialLoad = !1;
                            $("#lab-chart").css("left", 0)
                        }, 300)
                    });
                    labTimeline.addCustomTime(i.sb.e, "season-bank");
                    labTimeline.setCustomTimeMarker("Next Season Bank Payout", "season-bank");
                    break;
                case "petplanner":
                    petTimeline = new vis.Timeline(document.getElementById("petplanner-chart"));
                    petTimeline.setOptions(options);
                    petTimeline.setGroups(petGroups);
                    petTimeline.on("rangechanged", function() {
                        petInitialLoad && setTimeout(function() {
                            fitTimeline("petplanner");
                            petInitialLoad = !1;
                            $("#petplanner-chart").css("left", 0)
                        }, 300)
                    });
                    petTimeline.addCustomTime(i.sb.e, "season-bank");
                    petTimeline.setCustomTimeMarker("Next Season Bank Payout", "season-bank")
                }
                processData(!1, t, i.ev);
                updateUpgrades();
                $("#" + t + "-items-loading").hide();
                $("#" + t + "-items").show()
            }
        })
    }
}
function processData(n, t, i) {
    var f, o, r, s;
    n && recalculateEndTimes(t);
    $("." + t + "-list li").removeClass("group");
    f = new vis.DataSet;
    switch (t) {
    case "builders":
        o = builderCount;
        break;
    case "lab":
        o = labCount;
        break;
    case "petplanner":
        o = petCount
    }
    for (r = 0; r <= o; r++) {
        var u = 0
          , e = 0
          , h = 0;
        $("#" + t + "-" + r + " > li:not(.placeholder)").each(function(n, t) {
            var i, s, o;
            if (!$(t).data("ub") && !$(t).data("uh")) {
                if (i = parseInt($(t).data("duration")),
                s = $(t).hasClass("item-disabled"),
                r > 0) {
                    u = typeof $(t).data("end") != "undefined" ? $(t).data("end") - i * 1e3 : u === 0 ? (new Date).getTime() : e;
                    e = u + i * 1e3;
                    o = "";
                    switch (parseInt($(t).data("typeid"))) {
                    case 6:
                    case 21:
                        o = "/images/entities/" + $(t).data("entityid") + ".png";
                        break;
                    default:
                        o = "/images/entities/" + $(t).data("entityid") + "_" + $(t).data("level") + ".png"
                    }
                    var c = ""
                      , l = ""
                      , a = ""
                      , v = "";
                    s ? (c = "<strong>Started:<\/strong> " + $.format.date(u, "E D MMM yyyy @ HH:mm"),
                    l = '<span class="builderplanner-' + $(t).data("entityid") + "-" + +$(t).data("identity") + '">' + formatDuration((e - (new Date).getTime()) / 1e3) + "<\/span>",
                    a = "item-active") : (c = "<strong>Starts:<\/strong> " + $.format.date(u, "E D MMM yyyy @ HH:mm"),
                    l = formatDuration(i));
                    v = '<div class="planner-entity-icon" style="background-image: url(' + o + ');"><\/div> <strong>' + formatEntityName($(t).data("entityid"), $(t).data("name"), $(t).data("identity")) + " Level " + $(t).data("level") + '<\/strong><br><div style="margin-right: 5px; line-height: 26px; float: left;">' + l + "<\/div>";
                    s || (v += '<div class="resource-cost-' + $(t).data("rt") + '" style="line-height: 26px; float: left;"><img src = "' + getResourceIcon($(t).data("rt")) + '" style = "margin: 5px; height: 16px; float: left;" /> <strong>' + formatNumber($(t).data("c"), 2) + "<\/strong><\/div>");
                    a += " e-" + $(t).data("entityid");
                    f.add({
                        id: t.id,
                        start: u,
                        end: e,
                        content: v,
                        title: "<strong>" + formatEntityName($(t).data("entityid"), $(t).data("name"), $(t).data("identity")) + " Level " + $(t).data("level") + '<\/strong><br><span style="font-size: 12px;">' + c + "<br><strong>Finishes:<\/strong> " + $.format.date(e, "E D MMM yyyy @ HH:mm") + "<\/span>",
                        group: r,
                        className: a
                    })
                }
                h += i
            }
        });
        $("#" + t + "-" + r + " li").length === 0 ? (s = "",
        s = r === 0 ? "None" : "Drop items here",
        $("#" + t + "-" + r).append('<li class="placeholder item-disabled">' + s + "<\/li>")) : $("#" + t + "-" + r + " li:not(.placeholder)").length > 0 && $("#" + t + "-" + r + " .placeholder").remove()
    }
    $.each(i, function(n, t) {
        f.add({
            id: "E" + t.id,
            content: t.n,
            start: t.sd,
            end: t.ed,
            type: "background",
            className: "event-" + t.css
        })
    });
    switch (t) {
    case "builders":
        buildersTimeline.setItems(f);
        break;
    case "lab":
        labTimeline.setItems(f);
        break;
    case "petplanner":
        petTimeline.setItems(f)
    }
    validateAllItems(t);
    fitTimeline(t);
    $(".builder-dropdown-button").click(function(n) {
        n.stopPropagation()
    })
}
function itemChange(n, t) {
    var r = $("#" + n.item.data("hoverlist") + " li"), u = n.placeholder.index(), i = n.item[0], a = parseInt($(i).data("currentlevel")), f = parseInt($(i).data("level")), e = parseInt($(i).data("entityid")), o = parseInt($(i).data("identity")), c = 0, s = u - 1, l, h;
    $("." + t + '-list li[data-entityid="' + e + '"][data-identity="' + o + '"]').addClass("group");
    f - a > 1 && ($(r.eq(u - 1)[0]).attr("id") === n.item[0].id && (s = u - 2),
    c = typeof $(r.eq(s)[0]).attr("id") == "undefined" ? (new Date).getTime() : $(r.eq(s)[0]).data("end"),
    l = parseInt($("." + t + '-list li[data-entityid="' + e + '"][data-identity="' + o + '"][data-level="' + (f - 1) + '"]').data("duration")),
    h = parseInt($("." + t + '-list li[data-entityid="' + e + '"][data-identity="' + o + '"][data-level="' + (f - 1) + '"]').data("end")),
    h <= c || n.item.data("hoverlist") === "builders-0" || n.item.data("hoverlist") === "lab-0" ? removeItemWarning(i) : h - l * 1e3 == 3786912e6 ? displayItemWarning(i, "Previous level isn't assigned") : displayItemWarning(i, "Previous level isn't complete"));
    $(".builder-dropdown-holder").html("")
}
function recalculateEndTimes(n) {
    var i, t, r;
    switch (n) {
    case "builders":
        i = builderCount;
        break;
    case "lab":
        i = labCount;
        break;
    case "petplanner":
        i = petCount
    }
    for (t = 0; t <= i; t++)
        r = 0,
        $.each($("#" + n + "-" + t + " > li:not(.placeholder)"), function(n, i) {
            var u = 0
              , f = parseInt($(i).data("duration"));
            ($(i).data("ub") || $(i).data("uh")) && (f = 0);
            t === 0 ? (u = 3786912e6 + f * 1e3,
            $(i).data("end", u)) : (u = n === 0 ? $(i).hasClass("item-disabled") ? $(i).data("end") : (new Date).getTime() + f * 1e3 : r + f * 1e3,
            $(i).data("end", u),
            r = u)
        })
}
function validateAllItems(n) {
    var t = !0
      , i = [];
    $("." + n + "-list li[data-entityid][data-identity]").map(function() {
        i.push($(this).data("entityid") + "-" + $(this).data("identity"))
    });
    $.each($.unique(i), function() {
        var f = this.split("-"), i = $("." + n + '-list li[data-entityid="' + f[0] + '"][data-identity="' + f[1] + '"]'), r, u, e;
        i.length > 1 ? (i = $(i).sort(function(n, t) {
            return $(n).data("level") - $(t).data("level")
        }),
        r = -1,
        u = 0,
        $.each(i, function() {
            var i;
            i = $(this).data("ub") || $(this).data("uh") ? parseInt($(this).data("end")) : parseInt($(this).data("end")) - parseInt($(this).data("duration") * 1e3);
            validateTHLevel(this, n, i) ? r !== -1 ? r <= i ? $(this).hasClass("invalid-soft") || removeItemWarning(this) : $(this).closest("ul").attr("id") !== n + "-0" && (r - u * 1e3 == 3786912e6 ? (displayItemWarning(this, "Previous level isn't assigned"),
            t = !1) : (displayItemWarning(this, "Previous level isn't complete"),
            t = !1)) : $(this).hasClass("invalid-soft") || removeItemWarning(this) : t = !1;
            r = parseInt($(this).data("end"));
            u = parseInt($(this).data("duration"))
        })) : (e = $(i).data("ub") || $(i).data("uh") ? parseInt($(i).data("end")) : parseInt($(i).data("end")) - parseInt($(i).data("duration") * 1e3),
        validateTHLevel(i, n, e) || (t = !1))
    });
    $("." + n + "-output-message").html("");
    switch (n) {
    case "builders":
        builderInitialLoad && (t = !1);
        break;
    case "lab":
        labInitialLoad && (t = !1);
        break;
    case "petplanner":
        petInitialLoad && (t = !1)
    }
    if (t) {
        $("." + n + "-update").removeClass("disabled");
        $("." + n + "-update").off("click").on("click", function() {
            postUpdate($("." + n + "-update").data("qt"))
        });
        unsavedChange = !0
    } else
        $("." + n + "-update").addClass("disabled"),
        $("." + n + "-update").off("click"),
        unsavedChange = !1;
    $.fn.matchHeight._maintainScroll = !0;
    $(".builder").matchHeight();
    fitTimeline(n)
}
function validateTHLevel(n, t, i) {
    var u = parseInt($(n).data("mth")), f, r, e;
    if (currentTHLevel < u && $(n).closest("ul").attr("id") !== t + "-0") {
        f = 0;
        r = "";
        switch (baseType) {
        case "home":
            f = 1;
            r = "Town";
            break;
        case "builder":
            f = 65;
            r = "Builder"
        }
        return e = $("." + t + '-list li[data-entityid="' + f + '"][data-level="' + u + '"]'),
        e.length == 1 ? $(e).closest("ul").attr("id") == t + "-0" ? (r += " Hall " + u + " unassigned",
        displayItemWarning(n, r),
        !1) : i < parseInt(e.data("end")) ? (r += " Hall " + u + " isn't complete",
        displayItemWarning(n, r),
        !1) : (removeItemWarning(n),
        !0) : (displayItemWarning(n, "Requires " + r + " Hall " + u, 1),
        !0)
    }
    return !0
}
function displayItemWarning(n, t, i) {
    i = typeof i != "undefined" ? i : 2;
    var r = "";
    switch (i) {
    case 1:
        r = "invalid-soft";
        break;
    case 2:
        r = "invalid"
    }
    $(n).addClass(r);
    $(n).prop("title", t)
}
function removeItemWarning(n) {
    $(n).removeClass("invalid");
    $(n).removeClass("invalid-soft");
    $(n).prop("title", "")
}
function setTimelineVisible(n, t) {
    if ($.isNumeric(t) && parseInt(t) > 0)
        switch (n) {
        case "builders":
            buildersTimeline.setWindow(new Date, addDays(new Date, parseInt(t)));
            break;
        case "lab":
            labTimeline.setWindow(new Date, addDays(new Date, parseInt(t)));
            break;
        case "petplanner":
            petTimeline.setWindow(new Date, addDays(new Date, parseInt(t)))
        }
}
function fitTimeline(n) {
    var t = $("." + n + "-active-list li[data-entityid][data-identity]").map(function() {
        return $(this).data("end")
    }).get()
      , i = Math.max.apply(Math, t)
      , r = (i - (new Date).getTime()) / 864e5;
    setTimelineVisible(n, Math.ceil(r * 1.05))
}
function toggleShowNextUpgrades(n, t) {
    var i = $("#" + t.id.replace("chk", "btn"));
    i.hasClass("disabled") && (i.removeClass("disabled"),
    i.attr("onClick", "setNextUpgradeSetting('" + n + "');"))
}
function setNextUpgradeSetting(n) {
    var t = $("#btnShowNextTHUpgrades" + n), i;
    t.addClass("disabled");
    t.removeAttr("onclick");
    i = {
        a: "planner-sn",
        t: playertag,
        b: baseType,
        s: $("#chkShowNextTHUpgrades" + n).prop("checked")
    };
    $.ajax({
        url: "/upgrade-tracker/modify-upgrade/",
        method: "POST",
        data: i,
        timeout: 1e4,
        success: function() {
            builderPlanner = !1;
            labplanner = !1;
            switch (n) {
            case "Builders":
                tabLoad.Lab = !1;
                tabLoad.PetPlanner = !1;
                $("#lab").html("");
                break;
            case "Lab":
                tabLoad.Builders = !1;
                tabLoad.PetPlanner = !1;
                $("#builders").html("");
                break;
            case "Pet":
                tabLoad.Builders = !1;
                tabLoad.Lab = !1;
                $("#petplanner").html("")
            }
            buildersItems = new vis.DataSet;
            labItems = new vis.DataSet;
            petItems = new vis.DataSet;
            buildersGroups = new vis.DataSet;
            labGroups = new vis.DataSet;
            petGroups = new vis.DataSet;
            loadTab(n.toLowerCase(), !0)
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    })
}
function toggleUseMagicItemStatus(n, t) {
    var i = $(t).attr("id")
      , o = parseInt($("#" + i).data("end"))
      , h = parseInt($("#" + i).data("duration"))
      , e = 0
      , s = i.substring(0, 2)
      , r = ""
      , u = ""
      , f = "";
    switch (s) {
    case "ub":
        r = "uh";
        i = i.replace("ub-", "");
        u = "item-usebook";
        f = "item-usehammer";
        break;
    case "uh":
        r = "ub";
        i = i.replace("uh-", "");
        u = "item-usehammer";
        f = "item-usebook"
    }
    $(t).prop("checked") ? ($("#" + i).addClass(u),
    $("#" + i).removeClass(f),
    $("#" + r + "-" + i).prop("checked", !1),
    e = o) : ($("#" + i).removeClass(u),
    $("#" + i).removeClass(f),
    e = o + h * 1e3);
    $("#" + i + " .upgrade-duration").html(formatDuration($(t).prop("checked") ? 0 : $("#" + i).data("duration"), !0));
    $("#" + i).data(s, $(t).prop("checked"));
    $("#" + i).data(r, !1);
    $("#" + i).data("end", e);
    processData(!0, n, eventsHolder)
}
function postUpdate(n) {
    var i = serialiseQueues(n), t = "", r;
    switch (n) {
    case 1:
    case 3:
        t = "builders";
        break;
    case 2:
    case 4:
        t = "lab";
        break;
    case 5:
        t = "petplanner"
    }
    i != "[]" && (r = {
        a: "planner",
        t: playertag,
        qt: n,
        q: i
    },
    $.ajax({
        url: "/upgrade-tracker/modify-upgrade/",
        method: "POST",
        data: r,
        timeout: 1e4,
        success: function(n) {
            n == "OK" ? showFooterStatusBar("<strong>Queues successfully saved.<\/strong>", 2, !0, 5e3) : showFooterStatusBar("<strong>Error:<\/strong> " + n, 4, !0, 5e3);
            $("." + t + "-update").addClass("disabled");
            $("." + t + "-update").off("click");
            unsavedChange = !1
        },
        statusCode: {
            403: function() {
                location.reload()
            }
        }
    }))
}
function serialiseQueues(n) {
    var i = "", u = [], r, t;
    switch (n) {
    case 1:
    case 3:
        i = "builders";
        r = builderCount;
        break;
    case 2:
    case 4:
        i = "lab";
        r = labCount;
        break;
    case 5:
        i = "petplanner";
        r = petCount
    }
    for (t = 0; t <= r; t++)
        $("#" + i + "-" + t + " li:not(.placeholder):not(.item-disabled)").each(function() {
            u.push({
                eid: $(this).data("entityid"),
                i: $(this).data("identity"),
                l: $(this).data("level"),
                b: t,
                ub: $(this).data("ub"),
                uh: $(this).data("uh")
            })
        });
    return JSON.stringify(u)
}
function setMoveToBuilderMenu(n, t) {
    var o = $("#" + n).closest("ul").attr("id"), v = $("#" + o + " li").index($("#" + n)), s = "", h = "", c = "", i;
    if (!$("#" + n).hasClass("invalid")) {
        if (s = '<span class="fa-stack builder-dropdown-button" style="color: #666666; float: right; cursor: pointer;" title="Move to Builder" onclick="showMoveToBuilderMenu(\'' + n + "', '" + t + '\');"><i class="fas fa-circle fa-stack-2x"><\/i><i class="fas fa-arrow-right fa-stack-1x fa-inverse"><\/i><\/span><div class="builder-dropdown-holder"><\/div>',
        v == 0 && parseInt(o.replace(/\D/g, "")) != 0) {
            var l = $("#" + n).data("entityid")
              , a = $("#" + n).data("identity")
              , r = $("#" + n).data("level")
              , u = "builder-upgrade-button"
              , f = "fa-arrow-up"
              , e = "Start Upgrade to Level " + r;
            if (r == 1 && (u = "builder-build-button",
            f = "fa-hammer",
            e = "Start Building"),
            i = "",
            $("#" + n).hasClass("item-disabled"))
                i = "modify",
                u = "builder-build-button",
                f = "fa-wrench",
                e = "Modify Upgrade",
                c = '<div class="builder-complete-button" title="Complete Upgrade" onclick="actionModal(\'complete\', ' + l + ", " + a + ", '" + playertag + "', " + r + ', 0, 0, this);"><i class="fas fa-check"><\/i><\/div>';
            else
                switch (t) {
                case "builders":
                    i = "build";
                    break;
                case "lab":
                    i = "lab";
                    break;
                case "petplanner":
                    i = "pet"
                }
            h = c + '<div class="' + u + '" title="' + e + '" onclick="actionModal(\'' + i + "', " + l + ", " + a + ", '" + playertag + "', " + r + ', 0, 0, this);"><i class="fas ' + f + '"><\/i><\/div>'
        }
        $("#" + n + " .builder-ug-button-holder").html(h);
        $("#" + n).hasClass("item-disabled") || $("#" + n + " .builder-dd-button-holder").html(s)
    }
}
function showMoveToBuilderMenu(n, t) {
    var s, i, r;
    if ($("#" + n + " .builder-dropdown-holder").html() != "")
        $(".builder-dropdown-holder").html("");
    else {
        s = parseInt($("#" + n).closest("ul").attr("id").replace(/\D/g, ""));
        $(".builder-dropdown-holder").html("");
        i = "<ul>";
        switch (t) {
        case "lab":
            i += '<li><img src="/images/entities/' + lab + '.png" style="height: 30px;" /><\/li>';
            break;
        case "petplanner":
            i += '<li><img src="/images/entities/128_4.png" style="height: 30px;" /><\/li>';
            break;
        default:
            i += '<li><img src="/images/entities/Builder_Hut.png" style="height: 30px;" /><\/li>'
        }
        if (t == "lab" || t == "petplanner" || builderCount == 1)
            i += s == 0 ? "<li onclick=\"moveItemToBuilder('" + n + "', 1, '" + t + '\');" title="Move to Queue">Queue<\/li>' : "<li onclick=\"moveItemToBuilder('" + n + "', 0, '" + t + '\');" title="Move to Unassigned">UAS<\/li>';
        else {
            for (r = 1; r <= builderCount; r++)
                r != s && (i += "<li onclick=\"moveItemToBuilder('" + n + "', " + r + ", '" + t + '\');" title="Move to Builder ' + r + '">' + r + "<\/li>");
            s != 0 && (i += "<li onclick=\"moveItemToBuilder('" + n + "', 0, '" + t + '\');" title="Move to Unassigned">UAS<\/li>')
        }
        i += "<\/ul>";
        var h = parseInt($("#" + n).data("typeid"))
          , e = 0
          , o = 0
          , u = ""
          , f = ""
          , c = $("#" + n).data("ub")
          , l = $("#" + n).data("uh");
        switch (h) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 20:
            e = 9;
            u = "Book of Building";
            o = 19;
            f = "Hammer of Building";
            break;
        case 5:
        case 7:
        case 16:
            e = 8;
            u = "Book of Fighting";
            o = 18;
            f = "Hammer of Fighting";
            break;
        case 6:
            e = 10;
            u = "Book of Spells";
            o = 20;
            f = "Hammer of Spells";
            break;
        case 9:
        case 17:
        case 21:
            e = 11;
            u = "Book of Heroes";
            o = 21;
            f = "Hammer of Heroes"
        }
        var a = '<div class="builder-dropdown-menu-usebook" title="Use ' + u + ' for this upgrade"><input type="checkbox" id="ub-' + n + '" ' + (c ? "checked" : "") + " onchange=\"toggleUseMagicItemStatus('" + t + '\', this);" /> <img src="/images/magic-items/' + e + '.png" title="Use ' + u + ' for this upgrade" /><\/div>'
          , v = '<div class="builder-dropdown-menu-usehammer" title="Use ' + f + ' for this upgrade"><input type="checkbox" id="uh-' + n + '" ' + (l ? "checked" : "") + " onchange=\"toggleUseMagicItemStatus('" + t + '\', this);" /> <img src="/images/magic-items/' + o + '.png" title="Use ' + f + ' for this upgrade" /><\/div>'
          , y = '<div class="builder-dropdown-menu">' + i + a + v + "<\/div>";
        $("#" + n + " .builder-dropdown-holder").html(y)
    }
}
function moveItemToBuilder(n, t, i) {
    $(".builder-dropdown-holder").html("");
    $("#" + n).appendTo("#" + i + "-" + t);
    $("#" + i + "-" + t).trigger("sortstop")
}
function recalcBuilderButtons(n) {
    var i, t;
    switch (n) {
    case "builders":
        i = builderCount;
        break;
    case "lab":
    case "petplanner":
        i = 1
    }
    for (t = 0; t <= i; t++)
        $("#" + n + "-" + t + " .builder-ug-button-holder").html(""),
        setMoveToBuilderMenu($("#" + n + "-" + t + " li").first().attr("id"), n);
    $(".builder-dropdown-button").click(function(n) {
        n.stopPropagation()
    })
}
function sortUnassigned(n, t) {
    switch (t) {
    case "name":
        $("#" + n + "-0 li").sort(function(n, t) {
            return $(t).data("name") < $(n).data("name") ? 1 : -1
        }).appendTo("#" + n + "-0");
        break;
    case "time-asc":
        $("#" + n + "-0 li").sort(function(n, t) {
            return $(t).data("duration") < $(n).data("duration") ? 1 : -1
        }).appendTo("#" + n + "-0");
        break;
    case "time-desc":
        $("#" + n + "-0 li").sort(function(n, t) {
            return $(t).data("duration") > $(n).data("duration") ? 1 : -1
        }).appendTo("#" + n + "-0");
        break;
    case "cost-asc":
        $("#" + n + "-0 li").sort(function(n, t) {
            return $(t).data("c") < $(n).data("c") ? 1 : -1
        }).appendTo("#" + n + "-0");
        break;
    case "cost-desc":
        $("#" + n + "-0 li").sort(function(n, t) {
            return $(t).data("c") > $(n).data("c") ? 1 : -1
        }).appendTo("#" + n + "-0");
        break;
    case "costperday":
        $("#" + n + "-0 li").sort(function(n, t) {
            return $(t).data("cpd") < $(n).data("cpd") ? 1 : -1
        }).appendTo("#" + n + "-0");
        break;
    case "resource-type":
        $("#" + n + "-0 li").sort(function(n, t) {
            var i = $(n).data("rt") - $(t).data("rt");
            return i == 0 ? $(n).data("c") - $(t).data("c") : i
        }).appendTo("#" + n + "-0");
        break;
    case "townhall":
        $("#" + n + "-0 li").sort(function(n, t) {
            var i = $(n).data("mth") - $(t).data("mth");
            return i == 0 ? $(n).data("c") - $(t).data("c") : i
        }).appendTo("#" + n + "-0");
        break;
    case "reset":
    default:
        $("#" + n + "-0 li").sort(function(n, t) {
            return $(t).data("reset") < $(n).data("reset") ? 1 : -1
        }).appendTo("#" + n + "-0");
        $("#" + n + "-sort-dd").val("")
    }
}
function resetPlanner() {
    confirm("Are you sure you want to reload the last saved planner order?") && location.reload()
}
function clearPlanner(n) {
    confirm("Are you sure you want to move all planned upgrades back to Unassigned?") && ($("." + n + "-list li:not(.placeholder):not(.item-disabled)").appendTo("#" + n + "-0"),
    $("#" + n + "-0").trigger("sortstop"))
}
function formatEntityName(n, t, i) {
    return i == 0 ? t : [1, 7, 11, 12, 13, 19, 20, 65, 70, 71, 73, 74, 81, 82, 83, 84, 85, 102, 104, 107, 108, 112, 114, 115, 116, 117, 118, 126, 128].includes(n) ? t : t + " #" + i
}
var totalStructureTime, totalLabTime, totalHeroTime, totalPetTime, arrAdjTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], now = new Date, traderLoadTime = 0, tabLoad = {
    defences: !1,
    traps: !1,
    army: !1,
    resources: !1,
    spells: !1,
    darkTroops: !1,
    heroes: !1,
    pets: !1,
    walls: !1,
    builders: !1,
    lab: !1,
    petplanner: !1,
    stats: !1
}, processing = !1, triggerPrevContent = "", loads = {
    page: 0,
    feed: 0,
    reload: 0
}, timer = {
    diff: 0,
    cycle: 30
}, tabcall = null, chartMax, options;
$(function() {
    $("#next-th-panel-button").on("draglessClick", function() {
        $("#next-th-panel").slideToggle("fast", function() {
            $("#next-th-panel").is(":visible") ? $("#next-th-panel-button").html("Hide Next Town Hall Panel") : $("#next-th-panel-button").html("Show Next Town Hall Panel")
        })
    });
    $("#mass-update-panel-button").on("draglessClick", function() {
        $("#mass-update-panel").slideToggle("fast", function() {
            $("#mass-update-panel").is(":visible") ? $("#mass-update-panel-button").html("Hide Mass Update/Boosts Panel") : $("#mass-update-panel-button").html("Show Mass Update/Boosts Panel")
        })
    });
    $("#trader-items-panel-button").on("draglessClick", function() {
        traderPanel()
    });
    $("#trader-items-panel-link").on("touchstart click", function(n) {
        n.stopPropagation();
        n.preventDefault();
        traderPanel($(this).data("element"))
    });
    localStorage.getItem($("#trader-items-panel-link").data("element")) == "true" && traderPanel($("#trader-items-panel-link").data("element"))
});
var builderCount, labCount = 1, petCount = 1, buildersItems = new vis.DataSet, labItems = new vis.DataSet, petItems = new vis.DataSet, buildersGroups = new vis.DataSet, labGroups = new vis.DataSet, petGroups = new vis.DataSet, buildersTimeline, labTimeline, petTimeline, builderPlanner = !1, labplanner = !1, petplanner = !1, builderInitialLoad = !0, labInitialLoad = !0, petInitialLoad = !0, eventsHolder, unsavedChange = !1, chartMin = new Date;
chartMin.setHours(chartMin.getHours() - 2);
chartMax = new Date;
chartMax.setFullYear(chartMin.getFullYear() + 2);
options = {
    selectable: !1,
    min: chartMin,
    max: chartMax,
    zoomMin: 36e5,
    zoomMax: 80352e5,
    stack: !1
};
$(document).click(function(n) {
    $(n.target).closest(".builder-dropdown-holder").length || $(".builder-dropdown-holder").html("")
})