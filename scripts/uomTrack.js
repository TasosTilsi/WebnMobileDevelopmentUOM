'use strict';

import { calendar, dropdown, input, newRow } from './dynamicHtmlElements.js';
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
    deleteEventListener();
    saveEventListener();
}

const displayEditColumn = () => {
    let columnsList = document.getElementsByClassName('column6');
    let myFloat = document.getElementById('myFloat');
    if (hasOurTableClassUomTrack(uomTrackTable)) {

        for (let i = 0; i < columnsList.length; i++) {
            columnsList[i].style.display = 'table-cell';
        }

        myFloat.style.display = 'flex';

    } else {

        for (let i = 0; i < columnsList.length; i++) {
            columnsList[i].style.display = 'none';
        }

        myFloat.style.display = 'none';
    }
}

const changeColumn1IntoDropdown = () => {

    let column1List = document.getElementsByClassName('column1');
    for (let i = 1; i < column1List.length; i++) {
        column1List[i].innerHTML = dropdown();
    }
}

const changeColumnsIntoInputs = () => {

    let column2List = document.getElementsByClassName('column2');
    let column3List = document.getElementsByClassName('column3');
    let column4List = document.getElementsByClassName('column4');
    for (let i = 1; i < column2List.length; i++) {
        column2List[i].innerHTML = input();
        column3List[i].innerHTML = input();
        column4List[i].innerHTML = input();
    }
}

const changeColumnIntoCalendar = () => {

    let column5List = document.getElementsByClassName('column5');
    for (let i = 1; i < column5List.length; i++) {
        column5List[i].innerHTML = calendar();
    }
}

const addNewRow = () => {

    let tableBody = document.querySelector('tbody');
    tableBody.insertAdjacentHTML('beforeend', newRow());

    let latestAddedRow = document.querySelectorAll('tr i.bi-trash')[document.querySelectorAll('tr i.bi-trash').length-1];
    latestAddedRow.addEventListener('click', (element) => {
        element = element || window.event;
        let target = element.target;
        console.log(target.parentNode.parentNode);
        deleteRow(target);
    });

    latestAddedRow = document.querySelectorAll('tr i.bi-check-lg')[document.querySelectorAll('tr i.bi-trash').length-1];
    latestAddedRow.addEventListener('click', (element) => {
        element = element || window.event;
        let target = element.target;
        console.log(target.parentNode.parentNode);
        saveEditedRow(target);
    });
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
    console.log(`${countryFlag} ${surname} ${firstname} ${perBest} ${date}`);
    targetRow.querySelector('.column1').innerHTML = countryFlag;
    targetRow.querySelector('.column2').innerHTML = surname;
    targetRow.querySelector('.column3').innerHTML = firstname;
    targetRow.querySelector('.column4').innerHTML = perBest;
    targetRow.querySelector('.column5').innerHTML = date;

}

document.body.addEventListener('animationend', () => {
    checkForClassAddedOrRemoved();
});

document.getElementById('myFloat').addEventListener('click', () => {
    addNewRow();
});

const deleteEventListener = () => {
    document.querySelectorAll('tr i.bi-trash').forEach(element => {

        element.addEventListener('click', (element) => {
            element = element || window.event;
            let target = element.target;
            console.log(target.parentNode.parentNode);
            deleteRow(target);
        });

    });
}

const saveEventListener = () => {
    document.querySelectorAll('tr i.bi-check-lg').forEach(element => {

        element.addEventListener('click', (element) => {
            element = element || window.event;
            let target = element.target;
            console.log(target.parentNode.parentNode);
            saveEditedRow(target);
        });

    });
}





// window.onclick = e => {
//     console.log(e);
//     console.log(e.target.parentNode.parentNode);
//     console.log(e.path);
//     console.log(e.target);  // to get the element
//     console.log(e.target.tagName);  // to get the element tag name alone
// }