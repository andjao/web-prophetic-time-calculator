window.onload = function () {
    const navLang = navigator.language.substring(0, 2);

    if (localStorage.getItem("lang")) {
        setLang(localStorage.getItem("lang") + ".json")
    } else {
        if (navLang.indexOf('pt') > -1 || navLang.indexOf('en') > -1 || navLang.indexOf('es') > -1) {
            setLang(navLang + ".json");
        } else {
            setLang("en.json");
        }
    }

    document.querySelector("footer").innerHTML += new Date().getFullYear() + '©';
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setLang(lang) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var data = JSON.parse(httpRequest.responseText);
            texts = data;

            document.title = texts.tTitle;

            document.getElementById("title").innerHTML = texts.tTitle;

            document.getElementById("value").innerHTML = texts.tSingular.tInputValue;

            document.getElementById("seconds").innerHTML = capitalize(texts.tSingular.tSecond);
            document.getElementById("minutes").innerHTML = capitalize(texts.tSingular.tMinute);
            document.getElementById("hours").innerHTML = capitalize(texts.tSingular.tHour);
            document.getElementById("days").innerHTML = capitalize(texts.tSingular.tDay);
            document.getElementById("weeks").innerHTML = capitalize(texts.tSingular.tWeek);
            document.getElementById("months").innerHTML = capitalize(texts.tSingular.tMonth);
            document.getElementById("years").innerHTML = capitalize(texts.tSingular.tYear);

            document.getElementById("btnCalc").innerHTML = texts.tSingular.tBtnCalc;
            
            wordsBold();

            if (document.getElementById("result").innerHTML !== "") {
                calcTime();
            };
        }
    };
    httpRequest.open('GET', "./languages/" + lang, false);
    httpRequest.send();
}

function wordsBold() {
    document.getElementById("versicleP").innerHTML = stringBold(texts.tVersicles[versicles], texts.tPlural.tDays);
    document.getElementById("versicleP").innerHTML = stringBold(document.getElementById("versicleP").innerHTML, texts.tSingular.tDay);
    document.getElementById("versicleP").innerHTML = stringBold(document.getElementById("versicleP").innerHTML, texts.tPlural.tYears);
    document.getElementById("versicleP").innerHTML = stringBold(document.getElementById("versicleP").innerHTML, texts.tSingular.tYear);
}

function stringBold(string, word) {
    return string = string.replace(
        new RegExp(
            string.match(
                word
            )[0], 'g'
        ), `<b>${string.match(word)[0]}</b>`
    )
}

function changeLang(lang) {
    localStorage.setItem("lang", lang);
    setLang(lang + ".json");
}