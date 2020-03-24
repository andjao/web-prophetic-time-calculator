function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var data = JSON.parse(httpRequest.responseText);
            if (callback) callback(data);
        }
    };
    httpRequest.open('GET', path, false);
    httpRequest.send();
}

window.onload = function () {
    const navLang = navigator.language;
    let lang;
    const hashLang = window.location.hash

    if (hashLang === "") {
        if (navLang.indexOf('pt') > -1) {
            lang = "./languages/pt-BR.json";
        } else if (navLang.indexOf('es') > -1) {
            lang = "./languages/es-ES.json";
        } else if (navLang.indexOf('en') > -1) {
            lang = "./languages/en-US.json";
        }
    } else {
        switch (hashLang) {
            case "#PT":
                lang = "./languages/pt-BR.json";
                break;
            case "#EN":
                lang = "./languages/en-US.json";
                break;
            case "#ES":
                lang = "./languages/es-ES.json";
                break;
        }
    }

    function toTitle(string, separator = ' ') {
        return string
            .split(separator)
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(separator)
    }

    fetchJSONFile(lang, function (data) {
        texts = data;
        document.getElementById("value").innerHTML = texts.tSingular.tInputValue;
        document.getElementById("calc").innerHTML = texts.tSingular.tBtnCalc;
        document.getElementById("seconds").innerHTML = toTitle(texts.tSingular.tSecond);
        document.getElementById("minutes").innerHTML = toTitle(texts.tSingular.tMinute);
        document.getElementById("hours").innerHTML = toTitle(texts.tSingular.tHour);
        document.getElementById("days").innerHTML = toTitle(texts.tSingular.tDay);
        document.getElementById("weeks").innerHTML = toTitle(texts.tSingular.tWeek);
        document.getElementById("months").innerHTML = toTitle(texts.tSingular.tMonth);
        document.getElementById("years").innerHTML = toTitle(texts.tSingular.tYear);
    });

}
