window.versicles = 0;
let btnID = 'btnCalcSec';
let value;
let typeSave;
let result;
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
        if (document.getElementById("time").value === '') {
            document.getElementById("time").focus();
            document.getElementById("result").innerHTML = "";
            toast('alert', texts.tAlerts.tTimeEmpty, 'red', 5);
            return;
        }
        document.getElementById(e.target.id).classList.add("btnClicked");
        calcTime(e.target.value);
    }
    if (e.target.id.indexOf('copy') > -1) {
        let copy = document.getElementById('result2').innerHTML.replace(/<br>/g, "");
        copy = copy.replace(/        /g, "");
        copy = copy.replace(/:/g, ":\n");
        copyToClipboard(copy);
        toast(e.target.id, texts.words.copied, '#0071de', 5);
    }
    if (e.target.id.indexOf('share') > -1) {
        let copy = document.getElementById('result2').innerHTML.replace(/<br>/g, "");
        copy = copy.replace(/        /g, "");
        copy = copy.replace(/:/g, ":\n");
        share(texts.tTitle, copy, window.location.href);
    }
});

function calcTime(type, changeLang) {
    typeSave = type;
    let tYears;

    value = document.getElementById("time").value === '' || changeLang !== undefined ? value : document.getElementById("time").value;

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

    const tMonths = (tYears * 12);
    const tWeeks = (tYears * 52);
    const tDays = (tYears * 365);
    const tHours = (tDays * 24);
    const tMinutes = (tHours * 60);
    const tSeconds = (tMinutes * 60);

    result = `<img src='./img/copy.svg' class='copy' id='copy' alt='${texts.words.copy}' title='${texts.words.copy}'>
        <img src='./img/share.svg' class='share' id='share' alt='${texts.words.share}' title='${texts.words.share}'>
        <p id='result2'>${value} ${type} ${(value < 2 ? texts.tSingular.tLiteral : texts.tPlural.tLiterals)} ${texts.phrases.equivalentTo}:<br>
        ${Math.floor(tSeconds)} ${(tSeconds < 2 ? texts.tSingular.tSecond : texts.tPlural.tSeconds)} ${(tSeconds < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM)}.<br>
        ${Math.floor(tMinutes)} ${(tMinutes < 2 ? texts.tSingular.tMinute : texts.tPlural.tMinutes)} ${(tMinutes < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM)}.<br>
        ${Math.floor(tHours)} ${(tHours < 2 ? texts.tSingular.tHour : texts.tPlural.tHours)} ${(tHours < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM)}.<br>
        ${Math.floor(tDays)} ${(tDays < 2 ? texts.tSingular.tDay : texts.tPlural.tDays)} ${(tDays < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM)}.<br>
        ${Math.floor(tWeeks)} ${(tWeeks < 2 ? texts.tSingular.tWeek : texts.tPlural.tWeeks)} ${(tWeeks < 2 ? texts.tSingular.tPropheticF : texts.tPlural.tPropheticsF)}.<br>
        ${Math.floor(tMonths)} ${(tMonths < 2 ? texts.tSingular.tMonth : texts.tPlural.tMonths)} ${(tMonths < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM)}.<br>
        ${Math.floor(tYears)} ${(tYears < 2 ? texts.tSingular.tYear : texts.tPlural.tYears)} ${(tYears < 2 ? texts.tSingular.tPropheticM : texts.tPlural.tPropheticsM)}.</p>`;

    document.getElementById("result").innerHTML = result;
}