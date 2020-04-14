let versicles = 0;
let btnID = 'btnCalcSec';
let value;
let typeSave;
let result;
let time0, time1, time2;
let tooltipType;
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
            tooltip('alert', texts.tAlerts.tTimeEmpty, 'red');
            return;
        }

        document.getElementById(e.target.id).classList.add("btnClicked");
        calcTime(e.target.value);
    }
    if (e.target.id.indexOf('copy') > -1) {
        let copy = document.getElementById('result2').innerHTML.replace(/<br>/g, "");
        copy = copy.replace(/        /g, "");
        copy = copy.replace(/:/g, ":\n");
        copyStringToClipboard(copy);
        tooltip(e.target.id, texts.words.copied, '#0071de');
    }
});

function calcTime(type, changeLang) {
    typeSave = type;

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

function copyStringToClipboard(string) {
    let el = document.createElement('textarea');
    el.value = string;
    el.setAttribute('readonly', '');
    el.style = {
        display: 'none'
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function tooltip(type, text, color) {
    tooltipType = type;
    if (document.getElementById('tooltipStyle') && document.getElementById('tooltip')) {
        document.getElementById('tooltipStyle').remove();
        document.getElementById('tooltip').remove();
    }
    let el = document.createElement('p');
    el.id = 'tooltip';
    el.innerHTML = text;
    let style = document.createElement('style');
    style.id = 'tooltipStyle';
    style.innerHTML = `
        #tooltip {
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            width: -webkit-max-content;
            width: -moz-max-content;
            width: max-content;
            left: 50%;
            bottom: -3vw;
            border-radius: 50px;
            padding: 2vw;
            background-color: ${color};
            text-align: center;
            font-size: 5vw;
            color: #fff;
            font-weight: bold;
            position: fixed;
            z-index: 1000;
        }.show {
            -webkit-animation: fadein 0.5s;
            animation: fadein 0.5s;
        }.hidden {
            -webkit-animation: fadeout 0.5s;
            animation: fadeout 0.5s;
        }@-webkit-keyframes fadein {
            from {
                opacity: 0;
            }to {
                opacity: 1;
            }
        }@keyframes fadein {
            from {
                opacity: 0;
            }to {
                opacity: 1;
            }
        }@-webkit-keyframes fadeout {
            from {
                opacity: 1;
            }to {
                opacity: 0;
            }
        }@keyframes fadeout {
            from {
                opacity: 1;
            }to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    clearTimeout(time0);
    clearTimeout(time1);
    clearTimeout(time2);
    const time = 200;
    time0 = setTimeout(function () {
        el.className = 'show'
        document.body.appendChild(el);
    }, time);
    time1 = setTimeout(function () {
        el.className = 'hidden'
    }, time + 3000);
    time2 = setTimeout(function () {
        document.head.removeChild(style);
        document.body.removeChild(el);
    }, time + 3500);
}