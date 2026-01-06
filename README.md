# 💰 Syfe Savings Planner

live link:-[text](https://syfe-frontend.onrender.com)

A lightweight, client-side financial goal tracker built with **React (Vite)** and **Tailwind CSS**. This application helps users create savings goals, track contributions, and view their financial progress with live currency conversion (INR ↔ USD).

---

## 🚀 Features

* **Goal Management**: Create multiple financial goals (e.g., "Trip to Japan", "Emergency Fund") with specific target amounts.
* **Dual Currency Support**: flexible goal setting in **INR (₹)** or **USD ($)**.
* **Live Dashboard**:
    * Visual progress bars for individual goals.
    * **Financial Overview** banner showing Total Target, Total Saved, and Overall Progress %.
    * **Real-time Currency Conversion**: Goals set in USD are automatically converted to INR for the total summary.
* **Smart Contributions**: Add savings to specific goals with timestamp tracking.
* **Data Persistence**: Uses `LocalStorage` so your data survives page reloads (Client-side only).
* **Live Exchange Rates**: Fetches real-time exchange rates to ensure accurate conversions.

---

## 🛠️ Tech Stack

* **Framework**: React 18 (via Vite)
* **Styling**: Tailwind CSS (No external component libraries used)
* **Icons**: Lucide React
* **State Management**: Custom React Hooks (`useSavingsStore`)
* **API**: Open Exchange Rates API

---

## ⚙️ Setup & Installation

Follow these steps to run the project locally:

1.  **Clone the repository** (or unzip the folder):
    ```bash
    git clone <repository-url>
    cd syfe-savings-planner
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the App**:
    Visit `http://localhost:5173` in your browser.

---

## 🧠 Architectural Decisions

### 1. **Zero Component Libraries**
As requested in the assignment requirements, I avoided libraries like MUI or Chakra UI. All UI components (Modals, Cards, Buttons) are built from scratch using **Tailwind CSS**. This ensures a lightweight bundle and demonstrates strong CSS fundamentals.

### 2. **Custom Hook Pattern (`useSavingsStore`)**
I extracted all business logic (fetching rates, adding goals, calculating totals) into a custom hook.
* **Why?** This separates the *View* (UI) from the *Logic*. It makes the `App.jsx` file cleaner and makes the logic easier to test or reuse.

### 3. **Client-Side Persistence**
Since no backend was allowed, I utilized the browser's `localStorage` to persist the `goals` array. This mimics a database experience where users don't lose progress on refresh.

### 4. **API Choice**
I used `open.er-api.com` instead of the default `exchangerate-api` to avoid forcing reviewers to generate their own API Keys. It provides the same functionality (Standard USD base rates) without authentication friction.



## 🔮 Future Improvements

If I had more time, I would add:
* **Historical Charts**: Using a library like Recharts to show savings growth over time.
* **Edit/Delete Goals**: Functionality to remove or modify existing goals.
* **Dark Mode**: Utilizing Tailwind's `dark:` modifier.

---