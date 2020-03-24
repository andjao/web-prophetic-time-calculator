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
        language = "pt-BR.json";
    } else if (navigator.language.indexOf('es') > -1) {
        language = "es-ES.json";
    } else {
        language = "en-US.json";
    }

    fetchJSONFile(language, function (data) {
        texts = data;
    });

    document.getElementById("value").innerHTML = texts.tSingular.tInputValue;
    document.getElementById("calc").innerHTML = texts.tSingular.tBtnCalc;
    document.getElementById("tSeconds").innerHTML = texts.tSingular.tSecond;
    document.getElementById("tMinutes").innerHTML = texts.tSingular.tMinute;
    document.getElementById("tHours").innerHTML = texts.tSingular.tHour;
    document.getElementById("tDays").innerHTML = texts.tSingular.tDay;
    document.getElementById("tWeeks").innerHTML = texts.tSingular.tWeek;
    document.getElementById("tMonths").innerHTML = texts.tSingular.tMonth;
    document.getElementById("tYears").innerHTML = texts.tSingular.tYear;
}
