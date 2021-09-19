$.ajax({
    method: "POST",
    url: "/upgrade-tracker/maxAmountAndLevel",
    data: {
        village: "builder",
        //@ts-ignore
        hallLevel: JSON.parse(document.getElementById("player").value).builderHallLevel
    },
    success: function (builderHalls) {
        for (let level = 0; level < builderHalls.length; level++) {
            for (const element of Object.keys(builderHalls[level])) {
                const name = replaceAllUpperCase((element[0].toUpperCase() + element.slice(1)).replace(/([A-Z])/g, ' $1').trim().replace(/[^0-9](?=[0-9])/g, "$& "));
                if (name == "Wall") {
                    const wallElement = document.getElementById("Wall" + (level + 1));
                    wallElement.setAttribute(`max-${level + 1}`, builderHalls[level].wall);
                }
                else {
                    for (let i = 0; i < (builderHalls[level][element].amount || builderHalls[level][element]); i++) {
                        const slider = document.getElementById(`${name.replace(/ /g, "").replace(/-/g, "")}${i + 1}`);
                        if (!slider)
                            continue;
                        slider.setAttribute(`max-${level + 1}`, builderHalls[level][element].maxLevel || (name == "Army Camp" ? 1 : level + 1));
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
                editPhotoElement(this.id, document.getElementById(this.id).value);
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
                if (id.includes("Wall"))
                    updateWallCount();
                //@ts-ignore
                else
                    editPhotoElement(sliderElement.id, sliderElement.value);
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
                    editPhotoElement(element.id, globalElement.value);
                }
                ;
            }
            ;
        });
        //@ts-ignore
        function editPhotoElement(id, value) {
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
            if (number == 0 || builderHalls.length < number)
                return;
            for (const element of $(".slider").toArray()) {
                if (element.getAttribute(`max-${number}`))
                    setLevel(element, parseInt(element.getAttribute(`max-${number}`)));
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
                editPhotoElement(element.id, value);
        }
        ;
        //@ts-ignore
        function updateWallCount() {
            let wallCount = 0;
            for (let i = 0; i < builderHalls.length; i++) {
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
            if (wallCount > parseInt(builderHalls[builderHalls.length - 1].wall)) {
                display.setAttribute("style", "color: red;");
                errorDisplay.textContent = "The amount of wall compartments exceeds the maxmimum number of wall compartments available!";
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
    },
    error: function () {
        setErrorPage(503);
    }
});
//# sourceMappingURL=editBuilderStructures.js.map