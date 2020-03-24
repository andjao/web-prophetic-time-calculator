let texts;
window.onload = function () {
    if (navigator.language.indexOf('pt') > -1) {
        getJSON('pt-BR.json', function (err, data) {
            if (err !== null) {
                console.log('Ocorreu um erro' + err);
            } else {
                texts = data;
            }
        });
    } else if (navigator.language.indexOf('es') > -1) {
        getJSON('es-ES.json', function (err, data) {
            if (err !== null) {
                console.log('Ocurrio un error' + err);
            } else {
                texts = data;
            }
        });
    } else {
        getJSON('en-US.json', function (err, data) {
            if (err !== null) {
                console.log('An error has occurred' + err);
            } else {
                texts = data;
            }
        });
    }
}

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function calcTime() {
    if (document.getElementById("time").value === '') {
        alert(texts.alerts.timeEmpty);
        return;
    } else if (!document.querySelector("input[name='time']:checked")) {
        alert(texts.alerts.notSelected);
        return;
    }

    const value = document.getElementById("time").value;
    let type = document.querySelector("input[name='time']:checked").value;

    if (type === 'seconds') {
        type = value < 2 ? texts.singular.second : texts.plural.seconds;
        years = value / 24 / 60 / 60;

    } else if (type === "minutes") {
        type = value < 2 ? texts.singular.minute : texts.plural.seconds;
        years = value / 24 / 60;
    } else if (type === "hours") {
        type = value < 2 ? texts.singular.hour : texts.plural.hour;
        years = value / 24;
    } else if (type === "days") {
        type = value < 2 ? texts.singular.day : texts.plural.days;
        years = value;
    } else if (type === "weeks") {
        type = value < 2 ? texts.singular.week : texts.plural.weeks;
        years = value * 7;
    } else if (type === "months") {
        type = value < 2 ? texts.singular.month : texts.plural.months;
        years = value * 30;
    } else {
        type = value < 2 ? texts.singular.year : texts.plural.years;
        years = value * 365;
    }

    const months = years * 12;
    const weeks = years * 52;
    const days = years * 365;
    const hours = days * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;

    const print = value + " "
        + type + " "
        + (value < 2 ? texts.singular.literal : texts.plural.literal)
        + " equivale à:<br><br>"
        + seconds + " " + (seconds < 2 ? texts.singular.second : texts.plural.seconds) + " " + (seconds < 2 ? texts.singular.propheticM : texts.plural.propheticsM) + ".<br>"
        + minutes + " " + (minutes < 2 ? texts.singular.minute : texts.plural.minutes) + " " + (minutes < 2 ? texts.singular.propheticM : texts.plural.propheticsM) + ".<br>"
        + hours + " " + (hours < 2 ? texts.singular.hour : texts.plural.hours) + " " + (hours < 2 ? texts.singular.propheticM : texts.plural.propheticsM) + ".<br>"
        + days + " " + (days < 2 ? texts.singular.day : texts.plural.days) + " " + (days < 2 ? texts.singular.propheticM : texts.plural.propheticsM) + ".<br>"
        + weeks + " " + (weeks < 2 ? texts.singular.week : texts.plural.weeks) + " " + (weeks < 2 ? texts.singular.propheticF : texts.plural.propheticsF) + ".<br>"
        + months + " " + (months < 2 ? texts.singular.month : texts.plural.months) + " " + (months < 2 ? texts.singular.propheticM : texts.plural.propheticsM) + ".<br>"
        + years + " " + (years < 2 ? texts.singular.year : texts.plural.years) + " " + (years < 2 ? texts.singular.propheticM : texts.plural.propheticsM);

    document.getElementById("result").innerHTML = print;
}
