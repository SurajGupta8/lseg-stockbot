# ![StockBot Logo](./public/bot-30.png) LSEG StockBot

## Table of Contents
- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [💻 Usage](#-usage)
- [🛡️ Error Handling](#️-error-handling)
- [📂 Project Structure](#-project-structure)
- [🧰 Tech Stack](#-tech-stack)
- [📞 Contact](#-contact)

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Interactive Chat** | Natural conversation flow with bot prompts |
| **Smart Autocomplete** | Suggestions for exchanges/stocks |
| **Error Resilient** | Comprehensive error handling at all levels |
| **Navigation Controls** | Go back or restart conversation |

## 🚀 Getting Started

### Prerequisites
    - Node.js
    - npm

### Installation
1. Clone the repo:
   ```
   git clone https://github.com/SurajGupta8/lseg-stockbot
   ```
2. Install dependencies:
    ```
    cd stockbot && npm install
    ```
3. Start the app:
    ```
    npm run dev
    ```
4. Open http://localhost:5173/ in your browser


## 💻 Usage

1. Bot greets you
2. Select a stock exchange:
   - Click options or type to search
3. Choose a stock from the exchange
4. View price information
5. Use controls to navigate:
   - ← Go Back
   - 🏠 Main Menu

## 🛡️ Error Handling: 
    The application handles errors gracefully with:
    - Error Boundaries for React component crashes
    - Data Validation for stock data integrity
    - Input Sanitization for user inputs
    - User-Friendly Messages with recovery options

## 📂 Project Structure
    src/
    ├── components/         # Chatbot components
    ├── data/               # Dataset
    ├── styles/             # CSS Styles
    └── App.jsx             # Root component


## 🧰 Tech Stack
    Frontend:
    - React
    - React Icons
    - PropTypes
    - CSS3

## 📞 Contact
    Owner: Suraj Kumar Gupta
    Project Link: https://github.com/SurajGupta8/lseg-stockbot
    Email: surajkumargupta0092@gmail.com