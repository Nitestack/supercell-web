//@ts-ignore
const village = document.getElementById("village").value;
/*turns the music on, when the user first clicks on the body*/
let alreadyClicked = false;

(document.getElementById("backgroundMusic") as HTMLAudioElement).volume = 0.05;

document.getElementById("scrollBar").scrollTop = 0;
let lastScrollTop = 0;
document.getElementById("scrollBar").onscroll = function (ev) {
    //@ts-ignore
    if (lastScrollTop < this.scrollTop) lastScrollTop += 55;
    //@ts-ignore
    else if (lastScrollTop > this.scrollTop) lastScrollTop -= 55;
    //@ts-ignore
    this.scrollTop = lastScrollTop;
};

document.body.onclick = function () {
    if (alreadyClicked) return;
    alreadyClicked = true;
    (document.getElementById("backgroundMusic") as HTMLAudioElement).play();
};

function setBoostModal(title: string, description: string, imageSrc: string, additionalDescription?: string) {
    const applyBoostButton = document.getElementById("applyBoostButton") as HTMLButtonElement;
    if (additionalDescription) {
        applyBoostButton.setAttribute("class", "btn btn-success");
        applyBoostButton.innerHTML = "Boost";
        $("#boostModalAmountShow").hide();
        $("#boostModalAmountInput").hide();
    } else {
        applyBoostButton.setAttribute("class", "btn btn-primary")
        applyBoostButton.innerHTML = `
        <div class="flexible-inline" style="align-items: center;">
            <div style="padding-right: 40px;"></div>
            <div id="boostModalAmount"> 1 </div>
            <img id="boostModalImage" style="height: 50px;" align="right">
        </div>
        `;
        applyBoostButton.removeAttribute("style");
        $("#boostModalAmountShow").show();
        $("#boostModalAmountInput").show();
    };
    //@ts-ignore
    if (!additionalDescription) document.getElementById("boostModalAmountInput").value = "1";
    if (!additionalDescription) document.getElementById("boostModalAmount").textContent = (1).toString();
    document.getElementById("boostModalTitle").textContent = title;
    document.getElementById("boostModalDescription").textContent = description;
    document.getElementById("additionalBoostModalDescription").textContent = additionalDescription ? additionalDescription : "";
    if (!additionalDescription) (document.getElementById("boostModalImage") as HTMLImageElement).src = imageSrc;
};

function openClockTowerBoostModal(playerTag: string, freeBoost?: boolean) {
    $.ajax({
        method: "POST",
        url: "/upgrade-tracker/clashofclans/getBuilders",
        data: {
            village,
            playerTag,
            freeBoost: freeBoost ? freeBoost : false
        },
        success: function ({ builders, boostDuration }) {
            $.ajax({
                method: "POST",
                url: "/upgrade-tracker/clashofclans/getLab",
                data: {
                    village,
                    playerTag
                },
                success: function(lab) {
                    setBoostModal(freeBoost ? "Free Boost!" : "Boost Builder Base?", 
                    `Collect resources, research and build 10x faster for ${freeBoost ? shortener(convertTime(boostDuration)) : "30m"}!`, 
                    `/Images/Clash of Clans/Magic Items/Clock Tower ${freeBoost ? "Boost" : "Potion"}.png`, 
                    freeBoost ? "You can boost for free once per 22h!" : null);
                    setBoostTable([...builders, ...lab], 1, freeBoost ? boostDuration : 16200000, freeBoost ? true : false);
                    document.getElementById("boostModalButton").click();
                    if (!freeBoost) document.getElementById("boostModalAmountInput").oninput = function () {
                        //@ts-ignore
                        setBoostTable([...builders, ...lab], parseInt(this.value && this.value < 100 && this.value > 0 ? this.value : 0), 16200000);
                    };
                    document.getElementById("applyBoostButton").onclick = function () {
                        if (document.getElementById("boostModalAmount").textContent == "0" && !freeBoost) return;
                        $.ajax({
                            method: "POST",
                            url: "/upgrade-tracker/clashofclans/applyBoost",
                            data: {
                                playerTag: playerTag,
                                boost: freeBoost ? "Clock Tower" : "Clock Tower Potion",
                                //@ts-ignore
                                amount: freeBoost ? 1 : document.getElementById("boostModalAmount").textContent,
                                village
                            },
                            success: function (htmlCode) {
                                document.getElementById("closeBoostModal").click();
                                //@ts-ignore
                                showFooterBar(freeBoost ? "Clock Tower Boost applied!" : `${document.getElementById("boostModalAmount").textContent}x Clock Tower Potion${parseInt(document.getElementById("boostModalAmount").textContent) == 1 ? "" : "s"} applied!`);
                                const modules = document.getElementById("modules");
                                $(modules).fadeOut("fast", function () {
                                    modules.innerHTML = htmlCode;
                                    setModule(location.hash.replace(/#/g, ""));
                                    $(modules).fadeIn();
                                });
                            },
                            error: function () {
                                setErrorPage(503);
                            }
                        });
                    };
                },
                error: function () {
                    setErrorPage(503);
                }
            });
        },
        error: function () {
            setErrorPage(503);
        }
    });
};

function openBuilderPotionModal(playerTag: string) {
    $.ajax({
        method: "POST",
        url: "/upgrade-tracker/clashofclans/getBuilders",
        data: {
            village,
            playerTag: playerTag
        },
        success: function (builders) {
            setBoostModal("Speed Up Builders?", "Speed up all Builders by 10x for 1h?", "/Images/Clash of Clans/Magic Items/Builder Potion.png");
            setBoostTable(builders, 1, 32400000);
            document.getElementById("applyBoostButton").onclick = function () {
                if (document.getElementById("boostModalAmount").textContent == "0") return;
                $.ajax({
                    method: "POST",
                    url: "/upgrade-tracker/clashofclans/applyBoost",
                    data: {
                        playerTag: playerTag,
                        boost: "Builder Potion",
                        //@ts-ignore
                        amount: document.getElementById("boostModalAmount").textContent,
                        village
                    },
                    success: function (htmlCode) {
                        document.getElementById("closeBoostModal").click();
                        //@ts-ignore
                        const amount = document.getElementById("boostModalAmount").textContent;
                        showFooterBar(`${amount}x Builder Potion${parseInt(amount) == 1 ? "" : "s"} applied!`);
                        const modules = document.getElementById("modules");
                        $(modules).fadeOut("fast", function () {
                            modules.innerHTML = htmlCode;
                            setModule(location.hash.replace(/#/g, ""));
                            $(modules).fadeIn();
                        });
                    },
                    error: function () {
                        setErrorPage(503);
                    }
                });
            };
            document.getElementById("boostModalButton").click();
            document.getElementById("boostModalAmountInput").oninput = function () {
                //@ts-ignore
                setBoostTable(builders, parseInt(this.value && this.value < 100 && this.value > 0 ? this.value : 0), 32400000);
            };
        },
        error: function () {
            setErrorPage(503);
        }
    });
};

function openResearchPotionModal(playerTag: string) {
    $.ajax({
        method: "POST",
        url: "/upgrade-tracker/clashofclans/getLab",
        data: {
            village,
            playerTag: playerTag
        },
        success: function (lab) {
            setBoostModal("Speed Up Research?", "Speed up Laboratory by 24x for 1h?", "/Images/Clash of Clans/Magic Items/Research Potion.png");
            setBoostTable(lab, 1, 82800000);
            document.getElementById("applyBoostButton").onclick = function () {
                if (document.getElementById("boostModalAmount").textContent == "0") return;
                $.ajax({
                    method: "POST",
                    url: "/upgrade-tracker/clashofclans/applyBoost",
                    data: {
                        playerTag: playerTag,
                        boost: "Research Potion",
                        //@ts-ignore
                        amount: document.getElementById("boostModalAmount").textContent,
                        village
                    },
                    success: function (htmlCode) {
                        document.getElementById("closeBoostModal").click();
                        //@ts-ignore
                        const amount = document.getElementById("boostModalAmount").textContent;
                        showFooterBar(`${amount}x Research Potion${parseInt(amount) == 1 ? "" : "s"} applied!`);
                        const modules = document.getElementById("modules");
                        $(modules).fadeOut("fast", function () {
                            modules.innerHTML = htmlCode;
                            setModule(location.hash.replace(/#/g, ""));
                            $(modules).fadeIn();
                        });
                    },
                    error: function () {
                        setErrorPage(503);
                    }
                });
            };
            document.getElementById("boostModalButton").click();
            document.getElementById("boostModalAmountInput").oninput = function () {
                //@ts-ignore
                setBoostTable(lab, parseInt(this.value && this.value < 100 && this.value > 0 ? this.value : 0), 82800000);
            };
        },
        error: function () {
            setErrorPage(503);
        }
    });
};

function setBoostTable(builders: Array<any>, amount: number, boost: number, freeBoost?: boolean) {
    const tableBody = document.getElementById("boostModalTableBody");
    const title = document.getElementById("boostModalDescription");
    $(title).fadeOut("fast", function () {
        const titleArray = title.textContent.split(" ");
        const endTitle = titleArray[titleArray.length - 1];
        //Builder Potion, Research Potion
        if (endTitle.toLowerCase().includes("h")) titleArray.splice(titleArray.length - 1, 1, `${amount}h?`);
        //Clock Tower
        else if (endTitle.toLowerCase().includes("m") && !freeBoost) titleArray.splice(titleArray.length - 1, 1, `${amount * 30}m!`);
        title.textContent = titleArray.join(" ");
        $(title).fadeIn();
    });
    const buttonValue = document.getElementById("boostModalAmount");
    $(buttonValue).fadeOut("fast", function() {
        buttonValue.textContent = amount.toString();
        $(buttonValue).fadeIn();
    });
    $(tableBody).fadeOut("fast", function () {
        let innerHTML = "";
        for (const building of builders) {
            const finishDate = new Date(new Date(building.start).getTime() + building.durationInMilliseconds);
            innerHTML += `
                <tr>
                    <td class="align-middle">
                        <div class="price-item", align="left"> ${building.name} ${building.id ? `#${building.id}` : ""} </div>
                    </td>
                    <td class="align-middle">
                        <div class="price-item", align="right"> ${shortener(convertTime(finishDate.getTime() - Date.now()))} </div>
                    </td>
                    <td class="align-middle">
                        <div align="right" style="color: green;"> ${!(finishDate.getTime() - (boost * amount) - Date.now()).toString().includes("-") ? shortener(convertTime(finishDate.getTime() - (boost * amount) - Date.now())) : "Finished!"} </div>
                    </td>
                </tr>
            `;
        };
        document.getElementById("boostModalTableBody").innerHTML = innerHTML;
        $(tableBody).fadeIn();
    });
};

//@ts-ignore
if (document.getElementById("update").value == "true" ? true : false) {
    let updateInterval: NodeJS.Timer;
    setIntervalREQ();
    function setIntervalREQ() {
        $.ajax({
            method: "POST",
            url: "/upgrade-tracker/clashofclans/updateTimers",
            data: {
                village,
                //@ts-ignore
                playerTag: document.getElementById("playerTag").value
            },
            success: function ({ builder, lab, petHouse, htmlCode }) {
                if (htmlCode) {
                    const hash = location.hash.replace(/#/g, "");
                    (document.getElementById(`${["heroes", "troops", "darktroops", "spells", "siegemachines"].includes(hash.toLowerCase()) ? "heroAndTroop" : "builder"}UpgradeDone`) as HTMLAudioElement).play();
                    const modules = document.getElementById("modules");
                    $(modules).fadeOut("fast", function () {
                        modules.innerHTML = htmlCode;
                        setModule(location.hash.replace(/#/g, ""));
                        $(modules).fadeIn();
                    });
                };
                updateInterval = setInterval(async () => {
                    for (const element of [...builder, ...lab, ...petHouse]) {
                        const row = $(`#${element.name.replace(/ /g, "").replace(/-/g, "")}${element._id}`)[0];
                        const gemCount = $(`#gemCount${element.name.replace(/ /g, "").replace(/-/g, "")}${element._id}`)[0];
                        const finishDate = new Date(new Date(element.start).getTime() + element.durationInMilliseconds);
                        const remainingTime = finishDate.getTime() - Date.now();
                        if (remainingTime < 0) {
                            clearInterval(updateInterval);
                            return setIntervalREQ();
                        };
                        const convertedRemainingTime = convertTime(remainingTime);
                        const percentage = 100 - Math.ceil(remainingTime / element.durationInMilliseconds * 100);
                        row.setAttribute("style", `--width: ${percentage};`);
                        row.setAttribute("data-content", `${shortener(convertedRemainingTime)} (${percentage}%)`);
                        gemCount.textContent = `${timeToGems(remainingTime / 1000)}`;
                    };
                }, 60000);
            },
            error: function () {
                setErrorPage(503);
            }
        });
    };
};

$(".editUpgrade").on("click", function () {
    const element = this;
    const id = element.getAttribute("data-id");
    const remainingTime = document.getElementById(id).getAttribute("data-content");
    const gemCosts = parseInt(document.getElementById("gemCount" + id).textContent) || 0;
    console.log(id, remainingTime, gemCosts)
});

$(".finishUpgrade").on("click", function () {
});

const loadingScreen = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

function startBuilderUpgrade(buildingID: string, buildingName: string, id: number, currentLevel: number, playerTag: string) {
    const buttonParent = $(`button.builder-button[data-id=${buildingID.replace(/'/g, "\\'").replace(/ /g, "\\ ")}]`)[0].parentElement;
    const { innerHTML } = buttonParent;
    buttonParent.innerHTML = loadingScreen;
    $.ajax({
        method: "POST",
        url: "/upgrade-tracker/clashofclans/startBuilderUpgrade",
        data: {
            buildingName,
            id,
            currentLevel,
            village,
            playerTag,
            //@ts-ignore
            language: navigator.language || navigator.userLanguage
        },
        success: function (result) {
            buttonParent.innerHTML = innerHTML;
            if (result.errorMessage) {
                const { errorMessage } = result;
                displayErrorModal(errorMessage);
            } else if (result.htmlCode) {
                (document.getElementById("startBuilderUpgrade") as HTMLAudioElement).play();
                const modules = document.getElementById("modules");
                $(modules).fadeOut("fast", function () {
                    modules.innerHTML = result.htmlCode;
                    setModule(location.hash.replace(/#/g, ""));
                    $(modules).fadeIn();
                });
            };
        },
        error: function () {
            setErrorPage(503);
        }
    });
};

function startLaboratoryUpgrade(unitName: string, currentLevel: number, playerTag: string) {
    const buttonParent = $(`button.lab-button[data-id=${unitName.replace(/\./g, "\\.").replace(/ /g, "\\ ")}]`)[0].parentElement;
    const { innerHTML } = buttonParent;
    buttonParent.innerHTML = loadingScreen;
    $.ajax({
        method: "POST",
        url: "/upgrade-tracker/clashofclans/startLaboratoryUpgrade",
        data: {
            unitName,
            currentLevel,
            village,
            playerTag,
            //@ts-ignore
            language: navigator.language || navigator.userLanguage
        },
        success: function (result) {
            buttonParent.innerHTML = innerHTML;
            if (result.errorMessage) {
                const { errorMessage } = result;
                displayErrorModal(errorMessage);
            } else if (result.htmlCode) {
                (document.getElementById('startLaboratoryUpgrade') as HTMLAudioElement).play();
                const modules = document.getElementById("modules");
                $(modules).fadeOut("fast", function () {
                    modules.innerHTML = result.htmlCode;
                    setModule(location.hash.replace(/#/g, ""));
                    $(modules).fadeIn();
                });
            };
        },
        error: function () {
            setErrorPage(503);
        }
    });
};

function upgradeWall(currentLevel: number, village: "home" | "builder", playerTag: string) {
    const input = document.getElementById("inputWall" + currentLevel);
    //@ts-ignore
    const amount = parseInt(input.value);
    //@ts-ignore
    if (amount < 1 || amount > parseInt(input.max)) return;
    $.ajax({
        method: "POST",
        url: "/upgrade-tracker/clashofclans/upgradeWalls",
        data: {
            village,
            currentLevel,
            amount,
            playerTag
        },
        success: async function (result) {
            if (result.errorMessage) {
                const { errorMessage } = result;
                displayErrorModal(errorMessage);
            } else if (result.htmlCode) {
                (document.getElementById("builderUpgradeDone") as HTMLAudioElement).play();
                const modules = document.getElementById("modules");
                $(modules).fadeOut("fast", function () {
                    modules.innerHTML = result.htmlCode;
                    setModule(location.hash.replace(/#/g, ""));
                    $(modules).fadeIn();
                });
            };
        },
        error: function () {
            setErrorPage(503);
        }
    });
};

$('li.nav-item.categories a').on('click', function () {
    $('li.nav-item.categories a').removeClass('active');
    setModule($(this).attr('id'));
});

function setModule(name: string) {
    name = name.toLowerCase();
    $('.module').hide();
    $(`#${name}Module`).show();
    $(`#${name}`).addClass('active');
    location.hash = "#" + name;
};
const hash = location.hash?.replace(/#/g, "");
if (hash) setModule(hash);
else {
    setModule("overview");
    location.hash = "#overview";
};

$(function () {
    // don't cache ajax or content won't be fresh
    $.ajaxSetup({
        cache: false
    });
});

/*EDIT IN ../../Util/index.ts too*/
function shortener(text: string) {
    const textArray = text.split(" ");
    for (const textPiece of textArray) if (["0m", "0s", "0ms"].includes(textPiece)) textArray.splice(textArray.indexOf(textPiece), 1);
    if (!text.toLowerCase().includes("d") && !text.toLowerCase().includes("h") && !text.toLowerCase().includes("m")) return "1m";
    return textArray.slice(0, text.toLowerCase().includes("d") ? 3 : (!text.toLowerCase().includes("h") ? 1 : 2)).join(" ");
};
function timeToGems(timeInSeconds: number) {
    var r: Array<number>, u: Array<number>, i: number, f: number, gems: number;
    r = [60, 3600, 86400, 604800];
    switch (village) {
        case "builder":
            u = [1, 50, 500, 2e3];
            break;
        default:
            u = [1, 20, 260, 1e3]
    };
    if (isNaN(timeInSeconds) && (timeInSeconds = 0), timeInSeconds < 0) return 0;
    if (timeInSeconds == 0) gems = 0;
    else if (timeInSeconds <= 246) gems = u[0];
    else {
        for (i = 3,
            f = 1; f < r.length; f++)
            if (timeInSeconds <= r[f]) {
                i = f;
                break
            }
        gems = Math.floor((timeInSeconds - r[i - 1]) * (u[i] - u[i - 1]) / (r[i] - r[i - 1])) + u[i - 1];
        gems == 0 && timeInSeconds > 0 && (gems = 1)
    };
    return gems < 0 && (gems = 0), gems;
};

/**
 * @src variant of npm package [`ms`](https://www.npmjs.com/package/ms)
 * @param {string} timeInMilliseconds The time in milliseconds
 */
function convertTime(timeInMilliseconds: number) {
    let numberString = "";
    const s = 1000;
    const m = s * 60;
    const h = m * 60;
    const d = h * 24;
    const msAbs = Math.abs(timeInMilliseconds);
    if (msAbs >= d) {
        numberString += `${Math.floor(timeInMilliseconds / d)}d `;
        timeInMilliseconds -= Math.floor(timeInMilliseconds / d) * d;
    };
    if (msAbs >= h) {
        numberString += `${Math.floor(timeInMilliseconds / h)}h `;
        timeInMilliseconds -= Math.floor(timeInMilliseconds / h) * h;
    };
    if (msAbs >= m) {
        numberString += `${Math.floor(timeInMilliseconds / m)}m `;
        timeInMilliseconds -= Math.floor(timeInMilliseconds / m) * m;
    };
    if (msAbs >= s) {
        numberString += `${Math.floor(timeInMilliseconds / s)}s `;
        timeInMilliseconds -= Math.floor(timeInMilliseconds / s) * s;
    };
    if (msAbs < s && msAbs != 0) return `${timeInMilliseconds}ms`;
    else if (msAbs == 0) return "0s";
    if (numberString.charAt(numberString.length - 1) == " ") numberString = numberString.slice(0, -1);
    return numberString;
};