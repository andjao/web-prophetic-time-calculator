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

    fetchJSONFile(lang, function (data) {
        texts = data;
        document.getElementById("value").innerHTML = texts.tSingular.tInputValue;
        document.getElementById("calc").innerHTML = texts.tSingular.tBtnCalc;
        document.getElementById("seconds").innerHTML = texts.tSingular.tSecond;
        document.getElementById("minutes").innerHTML = texts.tSingular.tMinute;
        document.getElementById("hours").innerHTML = texts.tSingular.tHour;
        document.getElementById("days").innerHTML = texts.tSingular.tDay;
        document.getElementById("weeks").innerHTML = texts.tSingular.tWeek;
        document.getElementById("months").innerHTML = texts.tSingular.tMonth;
        document.getElementById("years").innerHTML = texts.tSingular.tYear;
    });

}
