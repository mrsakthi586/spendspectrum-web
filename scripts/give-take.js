/* =========================================
   SpendSpectrum - Give & Take
   Borrow & Lend Management
========================================= */


/* =========================================
   LocalStorage Keys
========================================= */

const BORROW_STORAGE_KEY = "spendspectrum_borrow_records";
const LEND_STORAGE_KEY = "spendspectrum_lend_records";


/* =========================================
   Load Records
========================================= */

let borrowRecords =
    JSON.parse(localStorage.getItem(BORROW_STORAGE_KEY)) || [];

let lendRecords =
    JSON.parse(localStorage.getItem(LEND_STORAGE_KEY)) || [];


/* =========================================
   Navigation Menu
========================================= */

function toggleMenu() {

    const menu = document.querySelector(".nav-links");

    menu.classList.toggle("active");

}


/* =========================================
   Save Borrow Records
========================================= */

function saveBorrowRecords() {

    localStorage.setItem(
        BORROW_STORAGE_KEY,
        JSON.stringify(borrowRecords)
    );

}


/* =========================================
   Save Lend Records
========================================= */

function saveLendRecords() {

    localStorage.setItem(
        LEND_STORAGE_KEY,
        JSON.stringify(lendRecords)
    );

}


/* =========================================
   Format Date
========================================= */

function formatDate(date) {

    if (!date) {
        return "—";
    }

    return new Date(date).toLocaleDateString("en-GB");

}


/* =========================================
   Format Currency
========================================= */

function formatCurrency(amount) {

    return `₹${Number(amount).toFixed(2)}`;

}


/* =========================================
   Add Borrow
========================================= */

function addBorrow() {

    const person =
        document.getElementById("borrowPerson")
            .value
            .trim();

    const amount =
        parseFloat(
            document.getElementById("borrowAmount").value
        );

    const category =
        document.getElementById("borrowCategory")
            .value
            .trim();


    /* Validation */

    if (!person) {

        alert("Please enter the person's name.");

        return;

    }


    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");

        return;

    }


    if (!category) {

        alert("Please enter a category or reason.");

        return;

    }


    /* Create Record */

    const record = {

        id: Date.now(),

        person: person,

        amount: amount,

        category: category,

        createdDate: new Date().toISOString(),

        status: "open",

        closeDate: null

    };


    borrowRecords.push(record);

    saveBorrowRecords();


    /* Clear Form */

    document.getElementById("borrowPerson").value = "";

    document.getElementById("borrowAmount").value = "";

    document.getElementById("borrowCategory").value = "";


    /* Refresh */

    renderBorrowRecords();


    alert("Borrow record added successfully.");

}


/* =========================================
   Add Lend
========================================= */

function addLend() {

    const person =
        document.getElementById("lendPerson")
            .value
            .trim();

    const amount =
        parseFloat(
            document.getElementById("lendAmount").value
        );

    const category =
        document.getElementById("lendCategory")
            .value
            .trim();


    /* Validation */

    if (!person) {

        alert("Please enter the person's name.");

        return;

    }


    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");

        return;

    }


    if (!category) {

        alert("Please enter a category or reason.");

        return;

    }


    /* Create Record */

    const record = {

        id: Date.now(),

        person: person,

        amount: amount,

        category: category,

        createdDate: new Date().toISOString(),

        status: "open",

        closeDate: null

    };


    lendRecords.push(record);

    saveLendRecords();


    /* Clear Form */

    document.getElementById("lendPerson").value = "";

    document.getElementById("lendAmount").value = "";

    document.getElementById("lendCategory").value = "";


    /* Refresh */

    renderLendRecords();


    alert("Lend record added successfully.");

}


/* =========================================
   Close Borrow Record
========================================= */

function closeBorrow(id) {

    const record =
        borrowRecords.find(
            item => item.id === id
        );


    if (!record) {

        return;

    }


    const confirmed =
        confirm(
            `Close the borrow record for ${record.person}?\n\nAmount: ${formatCurrency(record.amount)}`
        );


    if (!confirmed) {

        return;

    }


    record.status = "closed";

    record.closeDate = new Date().toISOString();


    saveBorrowRecords();

    renderBorrowRecords();

}


/* =========================================
   Close Lend Record
========================================= */

function closeLend(id) {

    const record =
        lendRecords.find(
            item => item.id === id
        );


    if (!record) {

        return;

    }


    const confirmed =
        confirm(
            `Close the lend record for ${record.person}?\n\nAmount: ${formatCurrency(record.amount)}`
        );


    if (!confirmed) {

        return;

    }


    record.status = "closed";

    record.closeDate = new Date().toISOString();


    saveLendRecords();

    renderLendRecords();

}


/* =========================================
   Render Borrow Records
========================================= */

function renderBorrowRecords() {

    const list =
        document.getElementById("borrowList");

    const emptyMessage =
        document.getElementById("borrowEmpty");

    const filter =
        document.getElementById("borrowFilter").value;


    list.innerHTML = "";


    /* Apply Filter */

    let filteredRecords =
        borrowRecords.filter(record => {

            if (filter === "all") {

                return true;

            }

            return record.status === filter;

        });


    /* Newest First */

    filteredRecords.sort(
        (a, b) =>
            new Date(b.createdDate) -
            new Date(a.createdDate)
    );


    /* Empty State */

    if (filteredRecords.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    /* Create Rows */

    filteredRecords.forEach(record => {

        const row =
            document.createElement("tr");


        const statusClass =
            record.status === "open"
                ? "status-open"
                : "status-closed";


        const action =
            record.status === "open"

                ? `
                    <button
                        class="close-button"
                        onclick="closeBorrow(${record.id})">
                        Close
                    </button>
                  `

                : `
                    <span class="closed-check">
                        ✓ Closed
                    </span>
                  `;


        row.innerHTML = `

            <td>
                <strong>
                    ${escapeHTML(record.person)}
                </strong>
            </td>

            <td>
                <strong>
                    ${formatCurrency(record.amount)}
                </strong>
            </td>

            <td>
                ${escapeHTML(record.category)}
            </td>

            <td>
                ${formatDate(record.createdDate)}
            </td>

            <td>
                <span class="status ${statusClass}">
                    ${record.status === "open" ? "Open" : "Closed"}
                </span>
            </td>

            <td>
                ${formatDate(record.closeDate)}
            </td>

            <td>
                ${action}
            </td>

        `;


        list.appendChild(row);

    });


    updateBorrowTotal();

}


/* =========================================
   Render Lend Records
========================================= */

function renderLendRecords() {

    const list =
        document.getElementById("lendList");

    const emptyMessage =
        document.getElementById("lendEmpty");

    const filter =
        document.getElementById("lendFilter").value;


    list.innerHTML = "";


    /* Apply Filter */

    let filteredRecords =
        lendRecords.filter(record => {

            if (filter === "all") {

                return true;

            }

            return record.status === filter;

        });


    /* Newest First */

    filteredRecords.sort(
        (a, b) =>
            new Date(b.createdDate) -
            new Date(a.createdDate)
    );


    /* Empty State */

    if (filteredRecords.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    /* Create Rows */

    filteredRecords.forEach(record => {

        const row =
            document.createElement("tr");


        const statusClass =
            record.status === "open"
                ? "status-open"
                : "status-closed";


        const action =
            record.status === "open"

                ? `
                    <button
                        class="close-button"
                        onclick="closeLend(${record.id})">
                        Close
                    </button>
                  `

                : `
                    <span class="closed-check">
                        ✓ Closed
                    </span>
                  `;


        row.innerHTML = `

            <td>
                <strong>
                    ${escapeHTML(record.person)}
                </strong>
            </td>

            <td>
                <strong>
                    ${formatCurrency(record.amount)}
                </strong>
            </td>

            <td>
                ${escapeHTML(record.category)}
            </td>

            <td>
                ${formatDate(record.createdDate)}
            </td>

            <td>
                <span class="status ${statusClass}">
                    ${record.status === "open" ? "Open" : "Closed"}
                </span>
            </td>

            <td>
                ${formatDate(record.closeDate)}
            </td>

            <td>
                ${action}
            </td>

        `;


        list.appendChild(row);

    });


    updateLendTotal();

}


/* =========================================
   Update Borrow Total
========================================= */

function updateBorrowTotal() {

    const total =
        borrowRecords

            .filter(
                record =>
                    record.status === "open"
            )

            .reduce(
                (sum, record) =>
                    sum + Number(record.amount),
                0
            );


    document.getElementById(
        "borrowTotal"
    ).textContent =
        formatCurrency(total);

}


/* =========================================
   Update Lend Total
========================================= */

function updateLendTotal() {

    const total =
        lendRecords

            .filter(
                record =>
                    record.status === "open"
            )

            .reduce(
                (sum, record) =>
                    sum + Number(record.amount),
                0
            );


    document.getElementById(
        "lendTotal"
    ).textContent =
        formatCurrency(total);

}


/* =========================================
   Basic HTML Escaping
========================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =========================================
   Initial Render
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderBorrowRecords();

        renderLendRecords();

    }
);
