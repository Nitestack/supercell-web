$.ajax({
    method: "POST",
    url: "/upgrade-tracker/clashofclans/maxAmountAndLevel",
    data: {
        village: "home",
        //@ts-ignore
        hallLevel: JSON.parse(document.getElementById("player").value).townHallLevel
    },
    success: function (townHalls) {
        if (document.getElementById("BuildersHut1slideGroup"))
            for (let i = 3; i <= 5; i++)
                $(`#BuildersHut${i}slideGroup`).hide();
        for (let level = 0; level < townHalls.length; level++) {
            for (const element of Object.keys(townHalls[level])) {
                const name = element == "x_Bow" ? "X-Bow" : replaceAllUpperCase((element[0].toUpperCase() + element.slice(1)).replace(/([A-Z])/g, ' $1').trim().replace(/[^0-9](?=[0-9])/g, "$& "));
                if (name == "Wall") {
                    const wallElement = document.getElementById("Wall" + townHalls[level].wall.maxLevel);
                    wallElement.setAttribute(`max-${level + 1}`, townHalls[level][element].amount);
                }
                else {
                    for (let i = 0; i < townHalls[level][element].amount; i++) {
                        const slider = document.getElementById(`${name.replace(/ /g, "").replace(/-/g, "")}${i + 1}`);
                        if (!slider)
                            continue;
                        slider.setAttribute(`max-${level + 1}`, townHalls[level][element].maxLevel);
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
        //@ts-ignore
        function replaceAllUpperCase(text) {
            const arrayOfText = text.split(" ");
            let allUpperCase = true;
            for (const letter of arrayOfText)
                if (letter != letter.toUpperCase())
                    allUpperCase = false;
            if (allUpperCase) {
                return text.replace(/ /g, ".");
            }
            else
                return text;
        }
        ;
        $(".slider").on("input", function () {
            //@ts-ignore
            document.getElementById("number" + this.id).value = document.getElementById(this.id).value;
            if (this.id.includes("Wall"))
                updateWallCount();
            //@ts-ignore
            else
                editImageElement(this.id, document.getElementById(this.id).value);
        });
        $(".form-control").on("input", function () {
            const { id } = this;
            const sliderElement = document.getElementById(id.replace(/number/g, ""));
            if (id.startsWith("number")) {
                const numberElement = document.getElementById(id);
                //@ts-ignore
                if (numberElement.value == "")
                    return;
                //@ts-ignore
                else if (parseInt(numberElement.value.toString()) > sliderElement.max)
                    return;
                //@ts-ignore
                else if (parseInt(numberElement.value.toString()) < sliderElement.min)
                    return;
                //@ts-ignore
                sliderElement.value = numberElement.value;
                if (id.toLowerCase().includes("builder")) {
                    //@ts-ignore
                    showBuilderHuts(numberElement.value);
                }
                else {
                    if (id.includes("Wall"))
                        updateWallCount();
                    //@ts-ignore
                    else
                        editImageElement(sliderElement.id, sliderElement.value);
                }
                ;
            }
            else if (id.startsWith("global")) {
                const globalElement = document.getElementById(id);
                //@ts-ignore
                if (globalElement.value == "")
                    return;
                for (let i = 1; i; i++) {
                    const element = document.getElementById(id.replace(/global/g, "") + i);
                    const numberElement = document.getElementById(id.replace(/global/g, "number") + i);
                    if (!element)
                        return;
                    if (!numberElement)
                        return;
                    //@ts-ignore
                    if (parseInt(globalElement.value.toString()) > element.max)
                        continue;
                    //@ts-ignore
                    else if (parseInt(globalElement.value.toString()) < element.min)
                        continue;
                    //@ts-ignore
                    element.value = globalElement.value;
                    //@ts-ignore
                    numberElement.value = globalElement.value;
                    //@ts-ignore
                    editImageElement(element.id, globalElement.value);
                }
                ;
            }
            ;
        });
        //@ts-ignore
        function editImageElement(id, value) {
            if (id.toLowerCase() == "builder")
                return;
            const photoElement = document.getElementById("photo" + id);
            const src = photoElement.getAttribute("src");
            photoElement.setAttribute("src", convertName(src, typeof value == "number" ? value : parseInt(value)));
        }
        ;
        //@ts-ignore
        function convertName(name, counter) {
            const oldNumber = name.match(/\d+/)[0];
            return name.replace(oldNumber, `${counter}`);
        }
        ;
        document.getElementById("resetButton").onclick = function (ev) {
            for (const element of $(".slider").toArray()) {
                if (element.id.toLowerCase() == "builder")
                    continue;
                //@ts-ignore
                setLevel(element, element.min);
            }
            ;
        };
        document.getElementById("maxButton").onclick = function (ev) {
            //@ts-ignore
            let number = document.getElementById("maxSlider").value;
            if (!number)
                number = 0;
            else
                number = parseInt(number);
            if (number == 0 || townHalls.length < number)
                return;
            for (const element of $(".slider").toArray()) {
                if (element.id.toLowerCase() == "builder")
                    continue;
                if (element.getAttribute(`max-${number}`))
                    setLevel(element, parseInt(element.getAttribute(`max-${number}`)));
                else if (element.id.includes("BuildersHut") && number != 14)
                    setLevel(element, 1);
                else
                    setLevel(element, 0);
            }
            ;
            updateWallCount();
        };
        //@ts-ignore
        function setLevel(element, value) {
            //@ts-ignore
            element.value = value;
            //@ts-ignore
            document.getElementById("number" + element.id).value = value;
            if (!element.id.includes("Wall"))
                editImageElement(element.id, value);
        }
        ;
        //@ts-ignore
        function updateWallCount() {
            let wallCount = 0;
            for (let i = 0; i < townHalls[townHalls.length - 1].wall.maxLevel; i++) {
                const wallSlider = document.getElementById("Wall" + (i + 1));
                //@ts-ignore
                wallCount += parseInt(wallSlider.value);
            }
            ;
            const display = document.getElementById("wallDisplay");
            const errorDisplay = document.getElementById("wallError");
            const arrayOfTextContent = display.textContent.split(" ");
            arrayOfTextContent[0] = `${wallCount}`;
            display.textContent = arrayOfTextContent.join(" ");
            if (wallCount > parseInt(townHalls[townHalls.length - 1].wall.amount)) {
                display.setAttribute("style", "color: red;");
                errorDisplay.textContent = "The amount of walls exceeds the maxmimum number of wall pieces available!";
                document.getElementById("player").setAttribute("disabled", "disabled");
            }
            else {
                display.setAttribute("style", "color: white;");
                errorDisplay.textContent = "";
                document.getElementById("player").removeAttribute("disabled");
            }
            ;
        }
        ;
        $("#Builder").on("input", function () {
            const { id } = this;
            const element = document.getElementById(id);
            //@ts-ignore
            const amount = parseInt(element.value);
            showBuilderHuts(amount);
        });
        function showBuilderHuts(amount) {
            if (document.getElementById("BuildersHut1slideGroup")) {
                for (let i = 1; i <= 5; i++)
                    $(`#BuildersHut${i}slideGroup`).hide();
                for (let i = 1; i <= amount; i++)
                    $(`#BuildersHut${i}slideGroup`).show();
            }
            ;
        }
        ;
    },
    error: function () {
        setErrorPage(503);
    }
});
//# sourceMappingURL=editHomeStructures.js.map