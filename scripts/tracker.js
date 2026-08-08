/* =====================================================
   SpendSpectrum - Smart Expense Tracker
===================================================== */


/* =====================================================
   CURRENT STATE
===================================================== */

let currentMain = "all";
let currentType = "income";


/* =====================================================
   DATA
===================================================== */

const data = {
    all: {
        income: [],
        expense: []
    }
};


/* =====================================================
   MENU
===================================================== */

function toggleMenu() {

    const menu =
        document.querySelector(".nav-links");

    menu.classList.toggle("active");

}


/* =====================================================
   SWITCH INCOME / EXPENSE / HISTORY
===================================================== */

function switchTypeTab(tab, e) {

    currentType = tab;

    document
        .querySelectorAll(".type-tabs .tab-button")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    if (e) {

        e.target.classList.add("active");

    }


    renderForm();

    renderList();

}


/* =====================================================
   RENDER FORM
===================================================== */

function renderForm() {

    const formContainer =
        document.getElementById("formContainer");

    const historyContainer =
        document.getElementById("historyContainer");


    historyContainer.innerHTML = "";


    /* =================================================
       HISTORY PAGE
    ================================================= */

    if (currentType === "history") {

        formContainer.innerHTML = "";


        historyContainer.innerHTML = `

            <label for="historyFilter">
                Filter By:
            </label>

            <select
                id="historyFilter"
                onchange="renderList()">

                <option value="daily">
                    Daily
                </option>

                <option value="weekly">
                    Weekly
                </option>

                <option value="monthly">
                    Monthly
                </option>

            </select>


            <table id="entryTable">

                <thead>

                    <tr>

                        <th>
                            Period
                        </th>

                        <th>
                            Category
                        </th>

                        <th>
                            Payment
                        </th>

                        <th>
                            Amount
                        </th>

                    </tr>

                </thead>


                <tbody id="entryList"></tbody>

            </table>


            <div
                class="summary-total"
                id="totalDisplay">
            </div>


            <!-- ACTION BUTTONS -->

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:20px;
                    margin-top:20px;
                    flex-wrap:wrap;
                ">

                <div class="download-button">

                    <button
                        type="button"
                        onclick="downloadExcel()">

                        Download Excel

                    </button>

                </div>


                <div class="download-button">

                    <button
                        type="button"
                        onclick="clearData()">

                        Clear All Data

                    </button>

                </div>

            </div>

        `;

        return;
    }


    /* =================================================
       INCOME / EXPENSE FORM
    ================================================= */

    formContainer.innerHTML = `

        <label for="title">
            Category
        </label>

        <input
            type="text"
            id="title"
            placeholder="e.g. Food, Transport, Salary"
        />


        <label for="amount">
            Amount (₹)
        </label>

        <input
            type="number"
            id="amount"
            placeholder="Enter amount"
            min="0"
            step="0.01"
        />


        <label for="payment">
            Payment Type
        </label>

        <select id="payment">

            <option value="Cash">
                Cash
            </option>

            <option value="Card">
                Card
            </option>

            <option value="UPI">
                UPI
            </option>

        </select>


        <button
            type="button"
            onclick="addEntry()">

            Add Entry

        </button>

    `;

}


/* =====================================================
   ADD ENTRY
===================================================== */

function addEntry() {

    const title =
        document
            .getElementById("title")
            .value
            .trim();


    const amount =
        parseFloat(
            document
                .getElementById("amount")
                .value
        );


    const payment =
        document
            .getElementById("payment")
            .value;


    const date =
        new Date()
            .toLocaleDateString("en-GB");


    /* Validation */

    if (!title) {

        alert("Please enter a category.");

        return;

    }


    if (
        isNaN(amount) ||
        amount <= 0
    ) {

        alert("Please enter a valid amount.");

        return;

    }


    /* Create entry */

    const entry = {

        title: title,

        amount: amount,

        payment: payment,

        date: date

    };


    /* Add to memory */

    data.all[currentType].push(entry);


    /* Save */

    saveToLocalStorage(
        entry,
        currentType
    );


    /* Clear form */

    document
        .getElementById("title")
        .value = "";


    document
        .getElementById("amount")
        .value = "";


    /* Refresh */

    renderList();

}


/* =====================================================
   SAVE TO LOCAL STORAGE
===================================================== */

function saveToLocalStorage(
    entry,
    type
) {

    const existing =
        JSON.parse(
            localStorage.getItem(
                "expenseData"
            )
        ) || {

            daily: {
                income: [],
                expense: []
            }

        };


    if (!existing.daily) {

        existing.daily = {
            income: [],
            expense: []
        };

    }


    if (!existing.daily[type]) {

        existing.daily[type] = [];

    }


    existing
        .daily[type]
        .push({
            ...entry
        });


    localStorage.setItem(
        "expenseData",
        JSON.stringify(existing)
    );

}


/* =====================================================
   RENDER HISTORY
===================================================== */

function renderList() {

    if (currentType !== "history") {

        return;

    }


    const stored =
        JSON.parse(
            localStorage.getItem(
                "expenseData"
            )
        ) || {

            daily: {
                income: [],
                expense: []
            }

        };


    const filter =
        document
            .getElementById(
                "historyFilter"
            )
            ?.value || "daily";


    const incomeRecords =
        stored.daily.income || [];


    const expenseRecords =
        stored.daily.expense || [];


    /* Add type to each record */

    const income =
        incomeRecords.map(entry => ({

            ...entry,

            type: "Income"

        }));


    const expense =
        expenseRecords.map(entry => ({

            ...entry,

            type: "Expense"

        }));


    /* Combine */

    const combined = [
        ...income,
        ...expense
    ];


    const entryList =
        document.getElementById(
            "entryList"
        );


    const totalDisplay =
        document.getElementById(
            "totalDisplay"
        );


    if (!entryList) {

        return;

    }


    entryList.innerHTML = "";


    let total = 0;


    /* Newest first */

    combined
        .slice()
        .reverse()
        .forEach(entry => {


            const displayDate =
                getDisplayDate(
                    entry.date,
                    filter
                );


            const isIncome =
                entry.type === "Income";


            const sign =
                isIncome
                    ? "+"
                    : "-";


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${escapeHTML(displayDate)}
                </td>

                <td>
                    ${escapeHTML(entry.title)}
                </td>

                <td>
                    ${escapeHTML(entry.payment)}
                </td>

                <td>
                    ${sign}
                    ₹${Number(entry.amount).toFixed(2)}
                </td>

            `;


            entryList.appendChild(row);


            if (isIncome) {

                total += Number(entry.amount);

            } else {

                total -= Number(entry.amount);

            }

        });


    totalDisplay.textContent =
        `Total: ₹${total.toFixed(2)}`;

}


/* =====================================================
   DATE DISPLAY
===================================================== */

function getDisplayDate(
    dateStr,
    filter
) {

    const parts =
        dateStr.split("/");


    const day =
        parts[0];


    const month =
        parts[1];


    const year =
        parts[2];


    const dateObj =
        new Date(
            `${year}-${month}-${day}`
        );


    /* Monthly */

    if (filter === "monthly") {

        return `${dateObj.toLocaleString(
            "default",
            {
                month: "long"
            }
        )} ${dateObj.getFullYear()}`;

    }


    /* Weekly */

    if (filter === "weekly") {

        const start =
            getWeekStart(
                dateObj
            );


        const end =
            new Date(start);


        end.setDate(
            start.getDate() + 6
        );


        return `${start.toLocaleDateString(
            "en-GB"
        )} - ${end.toLocaleDateString(
            "en-GB"
        )}`;

    }


    /* Daily */

    return dateStr;

}


/* =====================================================
   GET WEEK START
===================================================== */

function getWeekStart(date) {

    const d =
        new Date(date);


    const day =
        d.getDay();


    const diff =
        d.getDate() -
        day +
        (day === 0 ? -6 : 1);


    return new Date(
        d.setDate(diff)
    );

}


/* =====================================================
   DOWNLOAD EXCEL
===================================================== */

function downloadExcel() {

    /* Check SheetJS */

    if (typeof XLSX === "undefined") {

        alert(
            "Excel library could not be loaded. Please check your internet connection."
        );

        return;

    }


    /* Get stored data */

    const stored =
        JSON.parse(
            localStorage.getItem(
                "expenseData"
            )
        ) || {

            daily: {
                income: [],
                expense: []
            }

        };


    const incomeRecords =
        stored.daily.income || [];


    const expenseRecords =
        stored.daily.expense || [];


    /* Check data */

    if (
        incomeRecords.length === 0 &&
        expenseRecords.length === 0
    ) {

        alert(
            "No expense or income records available to download."
        );

        return;

    }


    /* ================================================
       CREATE EXCEL DATA
    ================================================ */

    const excelData = [];


    /* Header */

    excelData.push([

        "Type",

        "Date",

        "Category",

        "Amount (₹)",

        "Payment Type"

    ]);


    /* Income */

    incomeRecords.forEach(entry => {

        excelData.push([

            "Income",

            entry.date,

            entry.title,

            Number(entry.amount),

            entry.payment

        ]);

    });


    /* Expense */

    expenseRecords.forEach(entry => {

        excelData.push([

            "Expense",

            entry.date,

            entry.title,

            Number(entry.amount),

            entry.payment

        ]);

    });


    /* ================================================
       CREATE WORKSHEET
    ================================================ */

    const worksheet =
        XLSX.utils.aoa_to_sheet(
            excelData
        );


    /* ================================================
       COLUMN WIDTHS
    ================================================ */

    worksheet["!cols"] = [

        {
            wch: 15
        },

        {
            wch: 15
        },

        {
            wch: 30
        },

        {
            wch: 15
        },

        {
            wch: 18
        }

    ];


    /* ================================================
       CREATE WORKBOOK
    ================================================ */

    const workbook =
        XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Expense Data"

    );


    /* ================================================
       DOWNLOAD
    ================================================ */

    const today =
        new Date()
            .toISOString()
            .slice(0, 10);


    XLSX.writeFile(

        workbook,

        `SpendSpectrum_Tracker_Data_${today}.xlsx`

    );

}


/* =====================================================
   CLEAR ALL DATA
===================================================== */

function clearData() {

    const confirmClear =
        confirm(
            "Are you sure you want to delete all your saved data?"
        );


    if (!confirmClear) {

        return;

    }


    /* Remove local storage */

    localStorage.removeItem(
        "expenseData"
    );


    /* Reset memory */

    data.all.income = [];

    data.all.expense = [];


    alert(
        "Data cleared successfully."
    );


    /* Refresh */

    renderForm();

    renderList();

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

renderForm();

renderList();