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
        document.getElementById("value").innerHTML = data.tSingular.tInputValue;
        document.getElementById("calc").innerHTML = data.tSingular.tBtnCalc;
        document.getElementById("seconds").innerHTML = data.tSingular.tSecond;
        document.getElementById("minutes").innerHTML = data.tSingular.tMinute;
        document.getElementById("hours").innerHTML = data.tSingular.tHour;
        document.getElementById("days").innerHTML = data.tSingular.tDay;
        document.getElementById("weeks").innerHTML = data.tSingular.tWeek;
        document.getElementById("months").innerHTML = data.tSingular.tMonth;
        document.getElementById("years").innerHTML = data.tSingular.tYear;
    });

}
