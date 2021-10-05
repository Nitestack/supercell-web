if (getCookie('sound') == 'false') $('#sound').css('display', 'none');
else $('#noSound').css('display', 'none');

const loadingScreen = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

function setCookie(name: string, value: any, durationInDays: number, path?: string) {
    const date = new Date();
    date.setTime(date.getTime() + (durationInDays * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()};${path ? ` path=${path}` : ""}`;
    if (name.toLowerCase() == "sound") setAudioByCookie();
};
function getCookie(name: string) {
    name += "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        let content = cookieArray[i];
        while (content.charAt(0) == " ") content = content.substring(1);
        if (content.indexOf(name) == 0) return content.substring(name.length, content.length);
    };
    return "";
};

$(".cookie-button").on("click", function () {
    setCookie("sound", this.getAttribute("data-sound"), 730, "/");
    $(this).hide();
    if (this.getAttribute("data-sound") == "true") $('#sound').show();
    else $("#noSound").show();
});

$("img").on("mousedown", function (event) {
    if (event.button == 2) return;
});

function setAudioByCookie() {
    const mute = getCookie("sound") == "true" ? false : true;
    const videoAndAudioElements = document.querySelectorAll("audio, video");
    for (let i = 0; i < videoAndAudioElements.length; i++) {
        (videoAndAudioElements[i] as HTMLAudioElement | HTMLVideoElement).muted = mute;
    };
};

setAudioByCookie();

if (getCookie("sound") == "") setCookie("sound", "false", 730, "/");
$(document).on("click", function (event) {
    //@ts-ignore
    if (isButton(event.target)) (document.getElementById("clickAudio") as HTMLAudioElement).play();
});

function isButton(element: HTMLElement) {
    return (element.getAttribute("class") || "").toLowerCase().includes("btn")
        || (element.getAttribute("class") || "").toLowerCase().includes("cursor-pointer")
        || (element.getAttribute("class") || "").toLowerCase().includes("nav-link")
        || element.tagName.toLowerCase() == "button"
        || ["button", "submit", "reset"].includes((element.getAttribute("type") || "").toLowerCase());
};

function createProgressBar(row: HTMLElement, percentage: string, convertedRemainingTime: string) {
    //PROGRESS COL
    const progressCol = document.createElement("div");
    progressCol.classList.add("col");
    row.appendChild(progressCol);
    const progressDivContainer = document.createElement("div");
    progressCol.appendChild(progressDivContainer);
    if (percentage == "0%") progressDivContainer.classList.add("prg-bar-null");
    else progressDivContainer.classList.add("prg-bar");
    progressDivContainer.setAttribute("style", "--width: " + percentage.replace(/%/g, "") + ";");
    progressDivContainer.setAttribute("data-content", `${convertedRemainingTime.includes("d") ? convertedRemainingTime.split(" ").slice(0, convertedRemainingTime.split(" ").length - 1).join(" ") : convertedRemainingTime} (${percentage})`);
};

function setErrorPage(errorCode?: 400 | 401 | 404 | 503) {
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
};

function displayErrorModal(errorText: string, errorTitle?: string) {
    document.getElementById("errorModalTitle").textContent = errorTitle || "Error";
    document.getElementById("errorModalText").textContent = errorText;
    document.getElementById("errorModalButton").click();
};

function showFooterBar(text: string, timeInSeconds?: number) {
    const footerBar = document.getElementById("footerBar");
    footerBar.textContent = text;
    $(footerBar).slideDown();
    setTimeout(() => {
        $(footerBar).slideUp();
    }, timeInSeconds ? timeInSeconds * 1000 : 3000);
};

window.onscroll = function () {
    if ($(document).scrollTop() > 0) {
        document.getElementById("navbar").style.height = "70px";
        document.getElementById("logo").style.fontSize = "25px";
        document.getElementById("logo").style.padding = "22px";
    } else {
        document.getElementById("navbar").style.height = "130px";
        document.getElementById("logo").style.fontSize = "35px";
        document.getElementById("logo").style.padding = "50px";
    };
};

function isMobileOrTablet() {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        //@ts-ignore
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function isMobile() {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        //@ts-ignore
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function addModuleEventListener() {
    $('li.nav-item.categories a').on('click', function () {
        $('li.nav-item.categories a').removeClass('active');
        setModule($(this).attr('id'));
    });
};

function setModule(name: string) {
    name = name.toLowerCase();
    $('.module').hide();
    $(`#${name}Module`).show();
    $(`#${name}`).addClass('active');
    location.hash = "#" + name;
};

function openLink(link: string) {
    return window.open(link);
};

function createCountdown(element: HTMLElement, countDownDate: Date, active: boolean, noTitle?: boolean) {
    document.getElementById(element.id + (noTitle ? "" : "Date")).textContent = `${countDownDate.toLocaleDateString(undefined, { month: "long", weekday: "long", day: "numeric", year: "numeric" })} ${countDownDate.getHours()}:00`;
    const title = !noTitle ? document.getElementById(element.id + "Title").textContent : null;
    displayCountdown();
    // Update the count down every 1 second
    const interval = setInterval(displayCountdown, 1000);
    function displayCountdown() {
        // Find the distance between now and the count down date
        const distance = countDownDate.getTime() - Date.now();
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        // Display the result in the element with
        element.innerHTML = `${days != 0 ? `${days}d ` : ""}${hours != 0 ? `${hours}h ` : ""}${minutes != 0 ? `${minutes}m` : ""}`;
        //Active
        if (!noTitle) {
            if (active) document.getElementById(element.id + "Title").innerHTML = `${title} <span style="color: green;"> (Active) </span>`;
            else document.getElementById(element.id + "Title").textContent = title;
        };
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(interval);
            location.reload();
        };
    };
};

function getClashRoyaleSeasonEnd() {
    let date = new Date();
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    const thisMonthLastMonday = getFirstMonday(date.getUTCMonth(), date.getUTCFullYear());
    if (Date.now() > thisMonthLastMonday.getTime()) {
        date.setUTCDate(getFirstMonday(date.getUTCMonth() == 11 ? 0 : date.getUTCMonth() + 1, date.getUTCFullYear() + (date.getUTCMonth() == 11 ? 1 : 0)).getUTCDate());
        date.setUTCMonth(date.getUTCMonth() == 11 ? 0 : date.getUTCMonth() + 1);
        if (date.getUTCMonth() == 11) date.setUTCFullYear(date.getUTCFullYear() + 1);
    } else date.setUTCDate(thisMonthLastMonday.getUTCDate());
    date.setUTCHours(8);
    return date;
};

function getFirstMonday(month: number, year: number) {
    const date = new Date();
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    //Clash Royale League Reset
    date.setUTCHours(8);
    date.setUTCDate(1); // Roll to the first day of ...
    date.setUTCMonth(month == 11 ? 0 : month); // ... the next month.
    do { // Roll the days forwards until Monday.
        date.setUTCDate(date.getUTCDate() + 1);
    } while (date.getUTCDay() !== 1);
    return date;
};

function findGETParameterValue(parameterName: string) {
    let result: string;
    let tmp: Array<string> = [];
    location.search.substr(1).split("&").forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    console.log(result);
    return result;
};