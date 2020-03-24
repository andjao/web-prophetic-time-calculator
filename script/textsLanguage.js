window.onload = function () {
    const pathLanguage = "./languages/"
    const navLang = navigator.language.substring(0,2);
    console.log(navLang.indexOf('pt'));
    console.log(navLang + " " + navLang.indexOf('pt') + " " + navLang.indexOf('en') + " " + navLang.indexOf('es'));
    if (navLang.indexOf('pt') > -1 || navLang.indexOf('en') > -1 || navLang.indexOf('es') > -1) {
        setLang(pathLanguage + navLang + ".json");
    } else {
        setLang(pathLanguage + "en.json");
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setLang(path) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var data = JSON.parse(httpRequest.responseText);
            texts = data;
            document.getElementById("value").innerHTML = texts.tSingular.tInputValue;
            document.getElementById("calc").innerHTML = texts.tSingular.tBtnCalc;
            document.getElementById("seconds").innerHTML = capitalize(texts.tSingular.tSecond);
            document.getElementById("minutes").innerHTML = capitalize(texts.tSingular.tMinute);
            document.getElementById("hours").innerHTML = capitalize(texts.tSingular.tHour);
            document.getElementById("days").innerHTML = capitalize(texts.tSingular.tDay);
            document.getElementById("weeks").innerHTML = capitalize(texts.tSingular.tWeek);
            document.getElementById("months").innerHTML = capitalize(texts.tSingular.tMonth);
            document.getElementById("years").innerHTML = capitalize(texts.tSingular.tYear);

            if (document.getElementById("result").innerHTML !== "") {
                calcTime();
            };
        }
    };
    httpRequest.open('GET', path, false);
    httpRequest.send();

}