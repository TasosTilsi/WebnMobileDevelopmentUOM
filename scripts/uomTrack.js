'use strict';

import { calendar, dropdown, input, inputNumber, newRow } from './dynamicHtmlElements.js';
// console.log(calendar());

let uomTrackTable = document.getElementsByTagName('table')[0];
// console.log(uomTrackTable);

const hasOurTableClassUomTrack = (table) => {
    if (table.classList.contains('uomTrack')) {
        console.log('Hey there true');
        return true;
    }
    console.log('Hey there false');
    return false;
}

const checkForClassAddedOrRemoved = () => {
    displayEditColumn();
    changeColumn1IntoDropdown();
    changeColumnsIntoInputs();
    changeColumnIntoCalendar();
    // deleteEventListener();
    // saveEventListener();
    // editEventListener();
    findWorstTime();
    findBestTime();
    findAverageTime();
}

const displayEditColumn = () => {

    let columnsList = document.getElementsByClassName('column6');
    let myFloat = document.getElementById('myFloat');
    let mySettings = document.getElementById('mySettings');
    if (hasOurTableClassUomTrack(uomTrackTable)) {

        for (let i = 0; i < columnsList.length; i++) {
            columnsList[i].style.display = 'flex';
        }

        myFloat.style.display = 'flex';
        mySettings.style.display = 'flex';

    } else {

        for (let i = 0; i < columnsList.length; i++) {
            columnsList[i].style.display = 'none';
        }

        myFloat.style.display = 'none';
        mySettings.style.display = 'none';
    }
}

const changeColumn1IntoDropdown = () => {

    let column1List = document.getElementsByClassName('column1');
    for (let i = 1; i < column1List.length - 1; i++) {
        let countryFlag = column1List[i].innerText;
        column1List[i].innerHTML = dropdown();
        column1List[i].firstElementChild.value = countryFlag;
    }
}

const changeColumnsIntoInputs = () => {

    let column2List = document.getElementsByClassName('column2');
    let column3List = document.getElementsByClassName('column3');
    let column4List = document.getElementsByClassName('column4');
    for (let i = 1; i < column2List.length - 1; i++) {

        let surname = column2List[i].innerText;
        let firstname = column3List[i].innerText;
        let perbest = column4List[i].innerText;

        column2List[i].innerHTML = input();
        column3List[i].innerHTML = input();
        column4List[i].innerHTML = inputNumber();

        column2List[i].firstElementChild.value = surname;
        column3List[i].firstElementChild.value = firstname;
        column4List[i].firstElementChild.value = perbest;
    }
}

const changeColumnIntoCalendar = () => {

    let column5List = document.getElementsByClassName('column5');
    for (let i = 1; i < column5List.length - 1; i++) {
        let date = column5List[i].innerText;
        column5List[i].innerHTML = calendar();
        column5List[i].firstElementChild.value = date;
    }
}

const addNewRow = () => {

    let tableBody = document.querySelector('tbody');
    tableBody.insertAdjacentHTML('beforeend', newRow());
}

const deleteRow = (element) => {

    let row = element.parentNode.parentNode.rowIndex;
    let targetRow = element.parentNode.parentNode;
    console.log(row - 1);
    document.querySelector("tbody").removeChild(targetRow);
}

const saveEditedRow = (element) => {

    let row = element.parentNode.parentNode.rowIndex;
    let targetRow = element.parentNode.parentNode;
    console.log(row - 1);
    let countryFlag = targetRow.querySelector('.column1').firstElementChild.value;
    let surname = targetRow.querySelector('.column2').firstElementChild.value;
    let firstname = targetRow.querySelector('.column3').firstElementChild.value;
    let perBest = targetRow.querySelector('.column4').firstElementChild.value;
    let date = targetRow.querySelector('.column5').firstElementChild.value;

    if (countryFlag == '' || surname == '' || firstname == '' || perBest == '' || date == '') {
        alert(`Please Fill All the columns from the row you Clicked to save!!\n
        country = ${countryFlag} | surname = ${surname} | firstname = ${firstname} | perBest = ${perBest} | date = ${date}`);
    } else {
        console.log(`${countryFlag} ${surname} ${firstname} ${perBest} ${date}`);

        targetRow.querySelector('.column1').innerHTML = countryFlag;
        targetRow.querySelector('.column2').innerHTML = surname;
        targetRow.querySelector('.column3').innerHTML = firstname;
        targetRow.querySelector('.column4').innerHTML = perBest;
        targetRow.querySelector('.column5').innerHTML = date;
        targetRow.querySelector('.bi-check-lg').style.display = 'none';
        targetRow.querySelector('.bi-pencil').style.display = 'unset';
    }
}

const editRow = (element) => {

    let row = element.parentNode.parentNode.rowIndex;
    let targetRow = element.parentNode.parentNode;
    console.log(row - 1);

    let countryFlag = targetRow.querySelector('.column1').innerText;
    let surname = targetRow.querySelector('.column2').innerText;
    let firstname = targetRow.querySelector('.column3').innerText;
    let perBest = targetRow.querySelector('.column4').innerText;
    let stringDate = targetRow.querySelector('.column5').innerText;

    console.log(`${countryFlag} ${surname} ${firstname} ${perBest} ${stringDate}`);

    targetRow.querySelector('.column1').innerHTML = dropdown();
    targetRow.querySelector('.column1').firstElementChild.value = countryFlag;
    targetRow.querySelector('.column2').innerHTML = input();
    targetRow.querySelector('.column2').firstElementChild.value = surname;
    targetRow.querySelector('.column3').innerHTML = input();
    targetRow.querySelector('.column3').firstElementChild.value = firstname;
    targetRow.querySelector('.column4').innerHTML = inputNumber();
    targetRow.querySelector('.column4').firstElementChild.value = perBest;
    targetRow.querySelector('.column5').innerHTML = calendar();
    targetRow.querySelector('.column5').firstElementChild.value = stringDate;
    targetRow.querySelector('.bi-check-lg').style.display = 'unset';
    targetRow.querySelector('.bi-pencil').style.display = 'none';
}

const findWorstTime = () => {

    let timeColumns = document.querySelectorAll('.column4');
    let max = -1;
    for (let i = 1; i < timeColumns.length; i++) {
        let time;
        if (timeColumns[i].childElementCount > 0) {
            time = parseFloat(timeColumns[i].firstElementChild.value);
        } else {
            time = parseFloat(timeColumns[i].innerHTML);
        }
        if (time > max) {
            max = time;
        }
    }
    if (max === -1) {
        document.getElementById('worstTime').innerHTML = "-";
    } else {
        document.getElementById('worstTime').innerHTML = parseFloat(max).toFixed(2);
    }
}

const findBestTime = () => {

    let timeColumns = document.querySelectorAll('.column4');
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < timeColumns.length; i++) {
        let time;
        if (timeColumns[i].childElementCount > 0) {
            time = parseFloat(timeColumns[i].firstElementChild.value);
        } else {
            time = parseFloat(timeColumns[i].innerHTML);
        }
        if (time < min) {
            min = time;
        }
    }
    if (min === Number.MAX_SAFE_INTEGER) {
        document.getElementById('bestTime').innerHTML = "-";
    } else {
        document.getElementById('bestTime').innerHTML = parseFloat(min).toFixed(2);
    }
}

const findAverageTime = () => {

    let timeColumns = document.querySelectorAll('.column4');
    let sum = 0;
    for (let i = 1; i < timeColumns.length -1; i++) {
        let time;
        if (timeColumns[i].childElementCount > 0) {
            time = parseFloat(timeColumns[i].firstElementChild.value);
        } else {
            time = parseFloat(timeColumns[i].innerHTML);
        }
        sum += time;
    }
    if (sum === 0) {
        document.getElementById('averageTime').innerHTML = "-";
    } else {
        document.getElementById('averageTime').innerHTML = parseFloat(sum / (timeColumns.length - 2)).toFixed(2);
    }
}

const hideColumn = () => {

    let hideColumnCountry = document.getElementById("hideColumnCountry");
    let hideColumnSurname = document.getElementById("hideColumnSurname");
    let hideColumnFirstname = document.getElementById("hideColumnFirstname");
    let hideColumnPersBest = document.getElementById("hideColumnPersBest");
    let hideColumnDate = document.getElementById("hideColumnDate");

    function hide(hideColumn) {
        if (hideColumn.checked) {
            for (const element of document.getElementsByClassName(hideColumn.getAttribute('column'))) {
                // console.log(element)
                if (element.style.display != "none") {
                    element.style.display = "none";
                }
            }
        }
    };

    hide(hideColumnCountry);
    hide(hideColumnSurname);
    hide(hideColumnFirstname);
    hide(hideColumnPersBest);
    hide(hideColumnDate);
}

const unhideColumn = () => {

    let hideColumnCountry = document.getElementById("hideColumnCountry");
    let hideColumnSurname = document.getElementById("hideColumnSurname");
    let hideColumnFirstname = document.getElementById("hideColumnFirstname");
    let hideColumnPersBest = document.getElementById("hideColumnPersBest");
    let hideColumnDate = document.getElementById("hideColumnDate");

    function unhide(hideColumn) {
        if (!hideColumn.checked) {
            for (const element of document.getElementsByClassName(hideColumn.getAttribute('column'))) {
                // console.log(element)
                if (element.style.display == "none") {
                    element.style.display = "unset";
                }
            }
        }
    };

    unhide(hideColumnCountry);
    unhide(hideColumnSurname);
    unhide(hideColumnFirstname);
    unhide(hideColumnPersBest);
    unhide(hideColumnDate);
}

const changeMainTitleTrackRace = () => {

    let trackRaceOption = document.getElementById('trackRaceOptions').value;
    document.getElementById('trackRaceTitle').innerHTML = trackRaceOption;
}

const addFilters = () => {

    let hideColumnCountry = document.getElementById("filterRow");
    let addFiltersButton = document.getElementById("addFilters");

    if (addFiltersButton.innerText === "Add Filters") {
        hideColumnCountry.style.display = "flex";
        addFiltersButton.innerText = "Remove Filters"
    } else {
        hideColumnCountry.style.display = "none";
        addFiltersButton.innerText = "Add Filters"
    }
}

const saveData = ()=>{
    // Check browser support
    if (typeof (Storage) !== 'undefined') {
        // Store
        let json, countries, surnames, firstnames, times, dates;

        // let countries = document.getElementsByClassName('column1').getElementsByClassName('bi-check-lg');
        
        json = {
            'countries':countries,
            'surnames':surnames,
            'firstnames':firstnames,
            'times':times,
            'dates':dates,
        }

        localStorage.setItem('json', JSON.stringify(json));
    } else {
        console.log('Sorry, your browser does not support Web Storage...');
    }
}


//----------------------------------listeners-----------------------------------------------------//

document.body.addEventListener('animationend', () => {
    checkForClassAddedOrRemoved();
});

document.getElementById('myFloat').addEventListener('click', () => {
    addNewRow();
    hideColumn();
    unhideColumn();
});

document.getElementById('addFilters').addEventListener('click', () => {
    addFilters();
    let countryFilter = document.getElementById("countryFilter");
    let surnameFilter = document.getElementById("surnameFilter");
    let nameFilter = document.getElementById("nameFilter");
    let personalBestFilter = document.getElementById("personalBestFilter");
    let dateFilter = document.getElementById("dateFilter");

    countryFilter.innerText = "";
    surnameFilter.innerText = "";
    nameFilter.innerText = "";
    personalBestFilter.innerText = "";
    dateFilter.innerText = "";
});

document.getElementById('saveSettings').addEventListener('click', () => {
    changeMainTitleTrackRace();
    hideColumn();
    unhideColumn();
});

document.getElementById('saveInStorage').addEventListener('click', () => {
    saveData();
});

document.querySelector('table').addEventListener('click', function (evt) {
    const target = evt.target;

    if (target.classList.contains('bi-pencil')) {
        console.log(target.parentNode.parentNode);
        editRow(target);
    }

    if (target.classList.contains('bi-check-lg')) {
        console.log(target.parentNode.parentNode);
        saveEditedRow(target);
    }

    if (target.classList.contains('bi-trash')) {
        console.log(target.parentNode.parentNode);
        deleteRow(target);
    }

    findWorstTime();
    findBestTime();
    findAverageTime();
    console.log(evt.target);
}, false);


//----------------------------------AD2HS-----------------------------------------------------//

function addToHomeScreen() {
    let a2hsBtn = document.querySelector(".ad2hs-prompt");  // hide our user interface that shows our A2HS button
    a2hsBtn.style.display = 'none';  // Show the prompt
    deferredPrompt.prompt();  // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then(function (choiceResult) {

            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
                document.getElementById("installAssAppLabel").innerText = "App Installed"
            } else {
                console.log('User dismissed the A2HS prompt');
            }

            deferredPrompt = null;

        });
}

function showAddToHomeScreen() {

    let a2hsBtn = document.querySelector(".ad2hs-prompt");
    a2hsBtn.style.display = "block";
    a2hsBtn.addEventListener("click", addToHomeScreen);

}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    showAddToHomeScreen();
});