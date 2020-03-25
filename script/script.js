let versicles = 0;
document.addEventListener("click", function (e) {
    if (e.target.id == "nextV") {
        versicles = 1;
        document.getElementById("versicle").innerHTML = texts.tVersicles[1];
        document.getElementById("backV").className = "activatedB";
        document.getElementById("nextV").className = "disabledB";
    }
    if (e.target.id == "backV") {
        versicles = 0;
        document.getElementById("versicle").innerHTML = texts.tVersicles[0];
        document.getElementById("backV").className = "disabledB";
        document.getElementById("nextV").className = "activatedB";
    }
});

function calcTime() {
    if (document.getElementById("time").value === '') {
        alert(texts.tAlerts.tTimeEmpty);
        return;
    } else if (!document.querySelector("input[name='time']:checked")) {
        alert(texts.tAlerts.tNotSelected);
        return;
    }

    const value = document.getElementById("time").value;
    let type = document.querySelector("input[name='time']:checked").value;

    if (type === 'seconds') {
        type = value < 2 ? texts.tSingular.tSecond : texts.tPlural.tSeconds;
        tYears = value / 24 / 60 / 60;
    } else if (type === "minutes") {
        type = value < 2 ? texts.tSingular.tMinute : texts.tPlural.tSeconds;
        tYears = value / 24 / 60;
    } else if (type === "hours") {
        type = value < 2 ? texts.tSingular.tHour : texts.tPlural.tHour;
        tYears = value / 24;
    } else if (type === "days") {
        type = value < 2 ? texts.tSingular.tDay : texts.tPlural.tDays;
        tYears = value;
    } else if (type === "weeks") {
        type = value < 2 ? texts.tSingular.tWeek : texts.tPlural.tWeeks;
        tYears = value * 7;
    } else if (type === "months") {
        type = value < 2 ? texts.tSingular.tMonth : texts.tPlural.tMonths;
        tYears = value * 30;
    } else {
        type = value < 2 ? texts.tSingular.tYear : texts.tPlural.tYears;
        tYears = value * 365;
    }

    const tMonths = tYears * 12;
    const tWeeks = tYears * 52;
    const tDays = tYears * 365;
    const tHours = tDays * 24;
    const tMinutes = tHours * 60;
    const tSeconds = tMinutes * 60;

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
        + tYears + " " + (tYears < 2 ? texts.tSingular.tYear : texts.tPlural.tYears) + " " + (tYears < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM);

    document.getElementById("result").innerHTML = print;
}
