# Spend Spectrum 💸

**Spend Spectrum** is a minimalist and smart personal finance management web app.

It helps you track your income and expenses, manage money you borrow or lend, and split expenses with friends — all directly in your browser without requiring a login or backend.

---

## 🌟 Features

### 🔹 Smart Expense Tracker

- Track **income and expenses**
- Add:
  - Category
  - Amount
  - Payment method
  - Date
- Filter expense history by:
  - **Daily**
  - **Weekly**
  - **Monthly**
- Automatically calculate total balance
- **Export financial data as an Excel (`.xlsx`) file**
- Clear all saved expense data when needed
- Data is stored locally in your browser using **LocalStorage**
- No login or account required

---

### 🔸 Give & Take

Keep track of money that you **borrow from** or **lend to** other people.

#### Borrow

- Record money received from someone
- Store:
  - Person's name
  - Amount
  - Category / Reason
  - Borrowed date
- Track whether the record is **Open** or **Closed**
- Close a record when the money is settled
- Automatically store the **Close Date**
- Filter records by:
  - **All**
  - **Open**
  - **Closed**
- View the currently borrowed amount
- View total borrowed history
- Export Borrow records as **Excel (`.xlsx`)**
- Clear Borrow records independently

#### Lend

- Record money given to someone
- Store:
  - Person's name
  - Amount
  - Category / Reason
  - Lent date
- Track whether the record is **Open** or **Closed**
- Close a record when the money is returned
- Automatically store the **Close Date**
- Filter records by:
  - **All**
  - **Open**
  - **Closed**
- View the currently lent amount
- View total lending history
- Export Lend records as **Excel (`.xlsx`)**
- Clear Lend records independently

---

### 🔸 Expense Splitter

Split expenses easily between friends, family, or groups.

- Add participant names
- Add expenses
- Automatically calculate how much each person owes or is owed
- Useful for:
  - Trips
  - Outings
  - Shared rooms
  - Food bills
  - Group activities

---

## 📊 Excel Export

Spend Spectrum supports exporting financial records to **Excel (`.xlsx`)** files.

### Expense Tracker

Exported Excel files contain:

- Type
- Date
- Category
- Amount
- Payment Type

Example:

| Type | Date | Category | Amount | Payment Type |
|------|------|----------|--------|--------------|
| Income | 08/08/2026 | Salary | ₹25,000 | UPI |
| Expense | 08/08/2026 | Food | ₹250 | Cash |

### Give & Take

Exported Excel files contain:

- Person
- Amount
- Reason
- Borrowed/Lent Date
- Status
- Close Date

Example:

| Person | Amount | Reason | Date | Status | Close Date |
|--------|--------|--------|------|--------|------------|
| Arun | ₹1,000 | Personal | 08/08/2026 | Open | |
| Ravi | ₹500 | Emergency | 07/08/2026 | Closed | 08/08/2026 |

---

## 💾 Data Storage

Spend Spectrum is designed to work without a backend.

All financial data is stored locally in the browser using:

**LocalStorage**

This means:

- No account required
- No login required
- No server required
- Works directly in the browser
- Your data stays on your device/browser

> **Note:** Clearing your browser's site data or LocalStorage will remove your saved records.

---

## 🧰 Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **LocalStorage**
- **SheetJS** for Excel (`.xlsx`) export

---

## 📱 Responsive Design

Spend Spectrum is designed to work across:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📱 Tablet

The navigation and finance sections adapt to smaller screen sizes.

---

## 🚀 Getting Started

No installation or backend setup is required.

Simply open the application in a modern web browser.

You can also use the hosted version:

**SpendSpectrum Web App**

https://mrsakthi586.github.io/spendspectrum-web/

---

## 📂 Main Sections

| Section | Purpose |
|---------|---------|
| 🏠 Home | SpendSpectrum landing page |
| 📊 Tracker | Track income and expenses |
| 🤝 Give & Take | Manage borrowed and lent money |
| 🧮 Splitter | Split expenses between people |
| ℹ️ About | Information about the project |
| 📩 Contact | Contact section |

---

## 🔐 Privacy

Spend Spectrum does not require an account or personal login.

Your financial records are stored locally in your browser using LocalStorage.

The application does not require a backend database to manage your records.

---

## 💡 Project Goal

The goal of Spend Spectrum is to provide a simple, lightweight, and privacy-friendly way to manage everyday personal finances without the complexity of traditional finance applications.

---

## 📄 License

This project is created for personal and educational use.