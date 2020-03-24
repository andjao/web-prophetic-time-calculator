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
    let language;
    if (navigator.language.indexOf('pt') > -1) {
        language = "../languages/pt-BR.json";
    } else if (navigator.language.indexOf('es') > -1) {
        language = "../languages/es-ES.json";
    } else {
        language = "../languages/en-US.json";
    }

    fetchJSONFile(language, function (data) {
        texts = data;
    });

    document.getElementById("value").innerHTML = texts.tSingular.tInputValue;
    document.getElementById("calc").innerHTML = texts.tSingular.tBtnCalc;
    document.getElementById("seconds").innerHTML = texts.tSingular.tSecond;
    document.getElementById("minutes").innerHTML = texts.tSingular.tMinute;
    document.getElementById("hours").innerHTML = texts.tSingular.tHour;
    document.getElementById("days").innerHTML = texts.tSingular.tDay;
    document.getElementById("weeks").innerHTML = texts.tSingular.tWeek;
    document.getElementById("months").innerHTML = texts.tSingular.tMonth;
    document.getElementById("years").innerHTML = texts.tSingular.tYear;
}
