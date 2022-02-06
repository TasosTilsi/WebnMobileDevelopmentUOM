'use strict';

const filterRow = (inputElement) => {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue, column;
    input = inputElement; //document.getElementById("countryFilter");
    filter = input.value.toUpperCase();
    console.log(filter);
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    console.log(tr);

    if(input.parentNode.classList.contains("col")){
        column = input.parentNode.classList[0].charAt(input.parentNode.classList[0].length-1) -1 ;
    }
    // Loop through all table rows, and hide those who don't match the search query
    for (i = tr.length -1 ; i > 0; i--) {
        td = tr[i].getElementsByTagName("td")[column];
        console.log(td);
        if (td) {
            txtValue = td.innerText || td.firstElementChild.value; //td.textContent ||
            console.log(txtValue);
            console.log(txtValue.toUpperCase().indexOf(filter));
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const saveAllEditedRows = () => {
    // let column6List = document.getElementsByClassName('column6').getElementsByClassName('bi-check-lg');
    let saveIcons = document.querySelectorAll('i.bi-check-lg');
    for (let i = 0; i < saveIcons.length; i++) {

        // let saveIcon = column6List[i].getElementsByClassName('bi-check-lg')[0];
        let saveIcon = saveIcons[i];
        if (saveIcon.style.display != "none") {
            let row = saveIcon.parentNode.parentNode.rowIndex;
            let targetRow = saveIcon.parentNode.parentNode;
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
                console.log(saveIcon);
            }
        }
    }
}


document.getElementById("countryFilter").addEventListener('keyup', () => {
    filterRow(document.getElementById("countryFilter"));
});

document.getElementById("surnameFilter").addEventListener('keyup', () => {
    filterRow(document.getElementById("surnameFilter"));
});

document.getElementById("nameFilter").addEventListener('keyup', () => {
    filterRow(document.getElementById("nameFilter"));
});

document.getElementById("personalBestFilter").addEventListener('keyup', () => {
    filterRow(document.getElementById("personalBestFilter"));
});

document.getElementById("dateFilter").addEventListener('keyup', () => {
    filterRow(document.getElementById("dateFilter"));
});

document.getElementById("saveAllEditedRows").addEventListener('click', () => {
    saveAllEditedRows();
});
