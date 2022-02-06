'use strict';

const filterRow = (inputElement) => {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue, column;
    input = inputElement; //document.getElementById("countryFilter");
    filter = input.value.toUpperCase();
    console.log(filter);
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    // console.log(tr);

    if (input.parentNode.classList.contains("col")) {
        column = input.parentNode.classList[0].charAt(input.parentNode.classList[0].length - 1) - 1;
    }
    // Loop through all table rows, and hide those who don't match the search query
    for (i = tr.length - 1; i > 0; i--) {
        td = tr[i].getElementsByTagName("td")[column];
        // console.log(td);
        if (td) {
            txtValue = td.innerText || td.firstElementChild.value; //td.textContent ||
            // console.log(txtValue);
            // console.log(txtValue.toUpperCase().indexOf(filter));
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                // console.log(tr[i].style.display);
            } else {
                // tr[i].style.display = "none!important";
                tr[i].style.setProperty("display", "none", "important");
                // console.log(tr[i].style.display);
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
            saveIcon.click();
        }
    }
}

const clearAllRows = () => {
    // let column6List = document.getElementsByClassName('column6').getElementsByClassName('bi-check-lg');
    let deleteIcons = document.querySelectorAll('i.bi-trash');
    for (let i = 0; i < deleteIcons.length; i++) {
        deleteIcons[i].click();
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

document.getElementById("clearAllRows").addEventListener('click', () => {
    clearAllRows();
});
