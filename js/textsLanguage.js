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
    document.getElementById("resultT").innerHTML = texts.words.result + ":";
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

            document.getElementById("pt").alt = `${texts.words.portuguese} ${texts.words.brazil}`;
            document.getElementById("pt").title = `${texts.words.portuguese} ${texts.words.brazil}`;
            document.getElementById("en").alt = `${texts.words.english} ${texts.words.usa}`;
            document.getElementById("en").title = `${texts.words.english} ${texts.words.usa}`;
            document.getElementById("es").alt = `${texts.words.spanish} ${texts.words.spain}`;
            document.getElementById("es").title = `${texts.words.spanish} ${texts.words.spain}`;

            document.getElementById("backV").title = `${texts.words.back}`;
            document.getElementById("backV").alt = `${texts.words.back}`;
            document.getElementById("nextV").title = `${texts.words.next}`;
            document.getElementById("nextV").alt = `${texts.words.next}`;

            document.getElementById("value").innerHTML = texts.tSingular.tInputValue;

            document.getElementById("btnCalcSec").innerHTML = capitalize(texts.tPlural.tSeconds);
            document.getElementById("btnCalcMin").innerHTML = capitalize(texts.tPlural.tMinutes);
            document.getElementById("btnCalcHour").innerHTML = capitalize(texts.tPlural.tHours);
            document.getElementById("btnCalcDay").innerHTML = capitalize(texts.tPlural.tDays);
            document.getElementById("btnCalcWeek").innerHTML = capitalize(texts.tPlural.tWeeks);
            document.getElementById("btnCalcMth").innerHTML = capitalize(texts.tPlural.tMonths);
            document.getElementById("btnCalcYear").innerHTML = capitalize(texts.tPlural.tYears);
            wordsBold();
            document.getElementById("resultT").innerHTML = texts.words.result + ":";

            if (document.getElementById("result").innerHTML !== "") {
                calcTime(typeSave, true);
            };
        }
    };
    httpRequest.open('GET', "./lang/" + lang, false);
    httpRequest.send();
}

function wordsBold() {
    document.getElementById("versicleP").innerHTML = addStrongEl(texts.tVersicles[versicles], [
        texts.tPlural.tDays,
        texts.tSingular.tDay,
        texts.tPlural.tYears,
        texts.tSingular.tYear
    ]);
}

function addStrongEl(string, words) {
    if (typeof (words) === 'object') {
        for (let i in words) {
            string = string.replace(
                new RegExp(
                    string.match(
                        words[i]
                    ), 'g'
                ), `<b>${string.match(words[i])}</b>`
            )
        }
        return string;
    } else {
        return string = string.replace(
            new RegExp(
                string.match(
                    words
                )[0], 'g'
            ), `<b>${string.match(words)[0]}</b>`
        )
    }
}

function changeLang(lang) {
    localStorage.setItem("lang", lang);
    setLang(lang + ".json");
}