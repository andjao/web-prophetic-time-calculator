let versicles = 0;
let btnID = 'btnCalcSec';
document.addEventListener("click", function (e) {
    if (e.target.id == "nextV") {
        versicles = 1;
        wordsBold();
        document.getElementById("backV").className = "activatedB";
        document.getElementById("nextV").className = "disabledB";
    }
    if (e.target.id == "backV") {
        versicles = 0;
        wordsBold();
        document.getElementById("backV").className = "disabledB";
        document.getElementById("nextV").className = "activatedB";
    }
    if (e.target.id.indexOf('btnCalc') > -1) {
        document.getElementById(btnID).classList.remove("btnClicked");
        btnID = e.target.id;
        document.getElementById(e.target.id).classList.add("btnClicked");
        calcTime(e.target.value);
    }
});

function calcTime(type) {
    if (document.getElementById("time").value === '') {
        document.getElementById(btnID).classList.remove("btnClicked");
        document.getElementById("result").innerHTML = null;
        alert(texts.tAlerts.tTimeEmpty);
        return;
    }

    const value = document.getElementById("time").value;

    switch (type) {
        case 'seconds':
            type = value < 2 ? texts.tSingular.tSecond : texts.tPlural.tSeconds;
            tYears = value / 24 / 60 / 60;
            break;
        case 'minutes':
            type = value < 2 ? texts.tSingular.tMinute : texts.tPlural.tMinutes;
            tYears = value / 24 / 60;
            break;
        case 'hours':
            type = value < 2 ? texts.tSingular.tHour : texts.tPlural.tHours;
            tYears = value / 24;
            break;
        case 'days':
            type = value < 2 ? texts.tSingular.tDay : texts.tPlural.tDays;
            tYears = value;
            break;
        case 'weeks':
            type = value < 2 ? texts.tSingular.tWeek : texts.tPlural.tWeeks;
            tYears = value * 7;
            break;
        case 'months':
            type = value < 2 ? texts.tSingular.tMonth : texts.tPlural.tMonths;
            tYears = value * 30;
            break;
        case 'years':
            type = value < 2 ? texts.tSingular.tYear : texts.tPlural.tYears;
            tYears = value * 365;
    }

    const tMonths = Math.floor(tYears * 12);
    const tWeeks = Math.floor(tYears * 52);
    const tDays = Math.floor(tYears * 365);
    const tHours = Math.floor(tDays * 24);
    const tMinutes = Math.floor(tHours * 60);
    const tSeconds = Math.floor(tMinutes * 60);

    const print = value + " "
        + type + " "
        + (value < 2 ? texts.tSingular.tLiteral : texts.tPlural.tLiterals)
        + " equivale à:<br><br>"
        + tSeconds + " " + (tSeconds < 2 ? texts.tSingular.tSecond : texts.tPlural.tSeconds) + " " + (tSeconds < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM) + ".<br>"
        + tMinutes + " " + (tMinutes < 2 ? texts.tSingular.tMinute : texts.tPlural.tMinutes) + " " + (tMinutes < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM) + ".<br>"
        + tHours + " " + (tHours < 2 ? texts.tSingular.tHour : texts.tPlural.tHours) + " " + (tHours < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM) + ".<br>"
        + tDays + " " + (tDays < 2 ? texts.tSingular.tDay : texts.tPlural.tDays) + " " + (tDays < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM) + ".<br>"
        + tWeeks + " " + (tWeeks < 2 ? texts.tSingular.tWeek : texts.tPlural.tWeeks) + " " + (tWeeks < 2 ? texts.tSingular.tPropheticF : texts.tPlural.tPropheticsF) + ".<br>"
        + tMonths + " " + (tMonths < 2 ? texts.tSingular.tMonth : texts.tPlural.tMonths) + " " + (tMonths < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM) + ".<br>"
        + Math.floor(tYears) + " " + (tYears < 2 ? texts.tSingular.tYear : texts.tPlural.tYears) + " " + (tYears < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM);

    document.getElementById("result").innerHTML = print;
}
