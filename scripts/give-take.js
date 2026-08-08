/* =====================================================
   SpendSpectrum - Give & Take
===================================================== */


/* =====================================================
   CURRENT TYPE
===================================================== */

let currentType = "borrow";


/* =====================================================
   STORAGE KEY
===================================================== */

const STORAGE_KEY = "giveTakeData";


/* =====================================================
   GET DATA
===================================================== */

function getData() {

    const stored =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

    if (stored) {
        return stored;
    }


    return {

        borrow: [],

        lend: []

    };

}


/* =====================================================
   SAVE DATA
===================================================== */

function saveData(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


/* =====================================================
   MENU
===================================================== */

function toggleMenu() {

    const menu =
        document.querySelector(".nav-links");

    if (menu) {

        menu.classList.toggle("active");

    }

}


/* =====================================================
   SWITCH BORROW / LEND
===================================================== */

function switchMoneyType(type) {

    currentType = type;


    /* Remove active class */

    document
        .querySelectorAll(".tab-button")
        .forEach(button => {

            button.classList.remove("active");

        });


    /* Activate selected tab */

    if (type === "borrow") {

        const borrowTab =
            document.getElementById("borrowTab");

        if (borrowTab) {

            borrowTab.classList.add("active");

        }

    } else {

        const lendTab =
            document.getElementById("lendTab");

        if (lendTab) {

            lendTab.classList.add("active");

        }

    }


    updatePage();

}


/* =====================================================
   UPDATE PAGE
===================================================== */

function updatePage() {

    const trackerBox =
        document.querySelector(".tracker-box");


    const formTitle =
        document.getElementById("formTitle");

    const formSubtitle =
        document.getElementById("formSubtitle");

    const totalLabel =
        document.getElementById("totalLabel");

    const addButton =
        document.getElementById("addButton");

    const historyTitle =
        document.getElementById("historyTitle");

    const historySubtitle =
        document.getElementById("historySubtitle");

    const dateHeader =
        document.getElementById("dateHeader");

    const downloadType =
        document.getElementById("downloadType");

    const clearType =
        document.getElementById("clearType");


    if (currentType === "borrow") {


        if (trackerBox) {

            trackerBox.classList.remove(
                "lend-mode"
            );

        }


        if (formTitle) {

            formTitle.textContent =
                "Add Borrow";

        }


        if (formSubtitle) {

            formSubtitle.textContent =
                "Money you received from someone";

        }


        if (totalLabel) {

            totalLabel.textContent =
                "Currently Borrowed";

        }


        if (addButton) {

            addButton.textContent =
                "Add Borrow";

        }


        if (historyTitle) {

            historyTitle.textContent =
                "Borrow History";

        }


        if (historySubtitle) {

            historySubtitle.textContent =
                "Your borrowed money records";

        }


        if (dateHeader) {

            dateHeader.textContent =
                "Borrowed Date";

        }


        if (downloadType) {

            downloadType.textContent =
                "Borrow";

        }


        if (clearType) {

            clearType.textContent =
                "Borrow";

        }


    } else {


        if (trackerBox) {

            trackerBox.classList.add(
                "lend-mode"
            );

        }


        if (formTitle) {

            formTitle.textContent =
                "Add Lend";

        }


        if (formSubtitle) {

            formSubtitle.textContent =
                "Money you gave to someone";

        }


        if (totalLabel) {

            totalLabel.textContent =
                "Currently Lent";

        }


        if (addButton) {

            addButton.textContent =
                "Add Lend";

        }


        if (historyTitle) {

            historyTitle.textContent =
                "Lend History";

        }


        if (historySubtitle) {

            historySubtitle.textContent =
                "Your lent money records";

        }


        if (dateHeader) {

            dateHeader.textContent =
                "Lent Date";

        }


        if (downloadType) {

            downloadType.textContent =
                "Lend";

        }


        if (clearType) {

            clearType.textContent =
                "Lend";

        }

    }


    const filter =
        document.getElementById(
            "recordFilter"
        );

    if (filter) {

        filter.value = "all";

    }


    renderRecords();

}


/* =====================================================
   ADD RECORD
===================================================== */

function addRecord() {

    const person =
        document
            .getElementById("person")
            .value
            .trim();


    const amount =
        parseFloat(
            document
                .getElementById("amount")
                .value
        );


    const category =
        document
            .getElementById("category")
            .value
            .trim();


    /* Validation */

    if (!person) {

        alert(
            "Please enter the person's name."
        );

        return;

    }


    if (
        isNaN(amount) ||
        amount <= 0
    ) {

        alert(
            "Please enter a valid amount."
        );

        return;

    }


    if (!category) {

        alert(
            "Please enter a category or reason."
        );

        return;

    }


    /* Current date */

    const date =
        new Date()
            .toLocaleDateString(
                "en-GB"
            );


    /* Create record */

    const record = {

        id:
            Date.now().toString(),

        person:
            person,

        amount:
            amount,

        category:
            category,

        date:
            date,

        status:
            "open",

        closeDate:
            null

    };


    /* Get existing data */

    const data = getData();


    data[currentType].push(record);


    /* Save */

    saveData(data);


    /* Clear form */

    document
        .getElementById("person")
        .value = "";


    document
        .getElementById("amount")
        .value = "";


    document
        .getElementById("category")
        .value = "";


    /* Refresh */

    renderRecords();

}


/* =====================================================
   RENDER RECORDS
===================================================== */

function renderRecords() {

    const data = getData();


    const records =
        data[currentType];


    const filterElement =
        document.getElementById(
            "recordFilter"
        );


    const filter =
        filterElement
            ? filterElement.value
            : "all";


    const list =
        document.getElementById(
            "recordList"
        );


    const emptyMessage =
        document.getElementById(
            "emptyMessage"
        );


    if (!list) {

        return;

    }


    list.innerHTML = "";


    /* Apply filter */

    let filteredRecords =
        records.filter(record => {

            if (filter === "open") {

                return record.status === "open";

            }


            if (filter === "closed") {

                return record.status === "closed";

            }


            return true;

        });


    /* Newest first */

    filteredRecords =
        filteredRecords
            .slice()
            .reverse();


    /* Empty */

    if (
        emptyMessage
    ) {

        if (
            filteredRecords.length === 0
        ) {

            emptyMessage.style.display =
                "block";

        } else {

            emptyMessage.style.display =
                "none";

        }

    }


    /* Create rows */

    filteredRecords.forEach(record => {


        const row =
            document.createElement("tr");


        let statusHTML;


        if (
            record.status === "open"
        ) {

            statusHTML = `
                <span class="status status-open">
                    Open
                </span>
            `;

        } else {

            statusHTML = `
                <span class="status status-closed">
                    Closed
                </span>
            `;

        }


        let actionHTML;


        if (
            record.status === "open"
        ) {

            actionHTML = `
                <button
                    class="close-button"
                    onclick="closeRecord('${record.id}')">

                    Close

                </button>
            `;

        } else {

            actionHTML = `
                <span class="closed-check">
                    ✓ Closed
                </span>
            `;

        }


        row.innerHTML = `

            <td>
                ${escapeHTML(record.person)}
            </td>

            <td>
                ₹${Number(record.amount).toFixed(2)}
            </td>

            <td>
                ${escapeHTML(record.category)}
            </td>

            <td>
                ${escapeHTML(record.date)}
            </td>

            <td>
                ${statusHTML}
            </td>

            <td>
                ${
                    record.closeDate
                        ? escapeHTML(record.closeDate)
                        : "-"
                }
            </td>

            <td>
                ${actionHTML}
            </td>

        `;


        list.appendChild(row);

    });


    updateTotals();

}


/* =====================================================
   CLOSE RECORD
===================================================== */

function closeRecord(id) {

    const data = getData();


    const record =
        data[currentType]
            .find(
                item =>
                    item.id === id
            );


    if (!record) {

        return;

    }


    const confirmed =
        confirm(
            `Close this ${currentType} record?`
        );


    if (!confirmed) {

        return;

    }


    /* Change status */

    record.status =
        "closed";


    /* Store close date */

    record.closeDate =
        new Date()
            .toLocaleDateString(
                "en-GB"
            );


    /* Save */

    saveData(data);


    /* Refresh */

    renderRecords();

}


/* =====================================================
   UPDATE TOTALS
===================================================== */

function updateTotals() {

    const data = getData();


    const records =
        data[currentType];


    /* Current open total */

    const openTotal =
        records
            .filter(
                record =>
                    record.status === "open"
            )
            .reduce(
                (total, record) =>
                    total +
                    Number(record.amount),
                0
            );


    /* All record total */

    const allTotal =
        records
            .reduce(
                (total, record) =>
                    total +
                    Number(record.amount),
                0
            );


    const currentTotal =
        document.getElementById(
            "currentTotal"
        );


    const historyTotal =
        document.getElementById(
            "historyTotal"
        );


    if (currentTotal) {

        currentTotal.textContent =
            `₹${openTotal.toFixed(2)}`;

    }


    if (historyTotal) {

        historyTotal.textContent =
            `₹${allTotal.toFixed(2)}`;

    }

}


/* =====================================================
   DOWNLOAD EXCEL
===================================================== */

function downloadExcel() {

    const data = getData();


    const records =
        data[currentType];


    const typeName =
        currentType === "borrow"
            ? "Borrow"
            : "Lend";


    /* No records */

    if (
        records.length === 0
    ) {

        alert(
            `No ${typeName.toLowerCase()} records available to download.`
        );

        return;

    }


    /*
        Make sure SheetJS is loaded
    */

    if (
        typeof XLSX === "undefined"
    ) {

        alert(
            "Excel library could not be loaded. Please check your internet connection and try again."
        );

        return;

    }


    /* =================================================
       PREPARE EXCEL DATA
    ================================================= */

    const excelData =
        records.map(record => {

            return {

                "Person":
                    record.person,

                "Amount (₹)":
                    Number(record.amount),

                "Reason":
                    record.category,

                [currentType === "borrow"
                    ? "Borrowed Date"
                    : "Lent Date"]:
                    record.date,

                "Status":
                    record.status === "closed"
                        ? "Closed"
                        : "Open",

                "Close Date":
                    record.closeDate || ""

            };

        });


    /* =================================================
       CREATE WORKSHEET
    ================================================= */

    const worksheet =
        XLSX.utils.json_to_sheet(
            excelData
        );


    /* =================================================
       SET COLUMN WIDTHS
    ================================================= */

    worksheet["!cols"] = [

        {
            wch: 22
        },

        {
            wch: 15
        },

        {
            wch: 28
        },

        {
            wch: 18
        },

        {
            wch: 15
        },

        {
            wch: 18
        }

    ];


    /* =================================================
       CREATE WORKBOOK
    ================================================= */

    const workbook =
        XLSX.utils.book_new();


    /* =================================================
       ADD SHEET
    ================================================= */

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        typeName
    );


    /* =================================================
       GENERATE FILE NAME
    ================================================= */

    const today =
        getTodayForFile();


    const fileName =
        `SpendSpectrum_${typeName}_${today}.xlsx`;


    /* =================================================
       DOWNLOAD
    ================================================= */

    XLSX.writeFile(
        workbook,
        fileName
    );

}


/* =====================================================
   GET TODAY FOR FILE NAME
===================================================== */

function getTodayForFile() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


/* =====================================================
   CLEAR CURRENT TYPE
===================================================== */

function clearCurrentData() {

    const typeName =
        currentType === "borrow"
            ? "Borrow"
            : "Lend";


    const confirmed =
        confirm(
            `Are you sure you want to delete all ${typeName.toLowerCase()} data?`
        );


    if (!confirmed) {

        return;

    }


    const data =
        getData();


    data[currentType] = [];


    saveData(data);


    renderRecords();


    alert(
        `${typeName} data cleared successfully.`
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   INITIAL LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        switchMoneyType("borrow");

    }
);