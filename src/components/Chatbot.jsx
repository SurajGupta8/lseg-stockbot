import React, { useState, useRef, useEffect } from "react";
import stockData from "../data/stockData.json";
import "../styles/styles.css";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import InputForm from "./InputForm";
import ErrorBoundary from "./ErrorBoundary";

const Chatbot = () => {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [loadingError, setLoadingError] = useState(null);
  const containerRef = useRef(null);

  // Initialize with error handling
  useEffect(() => {
    try {
      if (!stockData || !Array.isArray(stockData) || stockData.length === 0) {
        throw new Error("Stock data is empty or not available");
      }

      setMessages([
        {
          id: 1,
          text: "Hello! Welcome to StockBot. I'm here to help you.",
          isBot: true,
          stage: "welcome",
        },
        {
          id: 2,
          text: "Please select a Stock Exchange.",
          isBot: true,
          stage: "exchange",
        },
      ]);
    } catch (error) {
      console.error("Initialization error:", error);
      setLoadingError(error.message);
      setMessages([
        {
          id: 1,
          text: "Sorry, I'm having trouble loading the stock data. Please try again later.",
          isBot: true,
          stage: "error",
        },
      ]);
    }
  }, []);

  // Validate stock data structure
  const validateStockData = (data) => {
    if (!Array.isArray(data)) return false;
    return data.every(
      (exchange) =>
        exchange?.stockExchange &&
        Array.isArray(exchange.topStocks) &&
        exchange.topStocks.every((stock) => stock?.stockName && stock?.price)
    );
  };

  // Get current options with error handling
  const getCurrentOptions = () => {
    try {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || !lastMessage.isBot) return [];

      if (!validateStockData(stockData)) {
        throw new Error("Invalid stock data structure");
      }

      switch (lastMessage.stage) {
        case "exchange":
          return stockData.map((ex) => ex.stockExchange);
        case "stock":
          if (!selectedExchange) {
            throw new Error("No exchange selected");
          }
          return selectedExchange.topStocks.map((stock) => stock.stockName);
        default:
          return [];
      }
    } catch (error) {
      console.error("Error getting options:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Sorry, I encountered an error processing your request.",
          isBot: true,
          stage: "error",
        },
      ]);
      return [];
    }
  };

  // Handle exchange selection with error handling
  const handleExchangeSelect = (exchange) => {
    try {
      if (!exchange || !exchange.topStocks) {
        throw new Error("Invalid exchange data");
      }

      setSelectedExchange(exchange);
      setSelectedStock(null);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: exchange.stockExchange,
          isBot: false,
          stage: "exchange-selected",
        },
        {
          id: prev.length + 2,
          text: "Please select a stock.",
          isBot: true,
          stage: "stock",
        },
      ]);
    } catch (error) {
      console.error("Error selecting exchange:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Sorry, I couldn't process that exchange selection.",
          isBot: true,
          stage: "error",
        },
      ]);
    }
  };

  // Handle stock selection with error handling
  const handleStockSelect = (stock) => {
    try {
      if (!stock || !stock.stockName || !stock.price) {
        throw new Error("Invalid stock data");
      }

      setSelectedStock(stock);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: stock.stockName,
          isBot: false,
          stage: "stock-selected",
        },
        {
          id: prev.length + 2,
          text: `Stock Price of ${stock.stockName} is ${stock.price}.`,
          isBot: true,
          stage: "stock-options",
        },
      ]);
    } catch (error) {
      console.error("Error selecting stock:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Sorry, I couldn't process that stock selection.",
          isBot: true,
          stage: "error",
        },
      ]);
    }
  };

  const goBack = () => {
    try {
      if (selectedStock) {
        setSelectedStock(null);
        setMessages((prev) => prev.slice(0, -2));
      } else if (selectedExchange) {
        setSelectedExchange(null);
        setMessages((prev) => prev.slice(0, -2));
      }
    } catch (error) {
      console.error("Error going back:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Sorry, I couldn't go back.",
          isBot: true,
          stage: "error",
        },
      ]);
    }
  };

  const goToHome = () => {
    try {
      setSelectedExchange(null);
      setSelectedStock(null);
      setMessages([
        {
          id: 1,
          text: "Hello! Welcome to StockBot. I'm here to help you.",
          isBot: true,
          stage: "welcome",
        },
        {
          id: 2,
          text: "Please select a Stock Exchange.",
          isBot: true,
          stage: "exchange",
        },
      ]);
    } catch (error) {
      console.error("Error going home:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Sorry, I couldn't reset the chat.",
          isBot: true,
          stage: "error",
        },
      ]);
    }
  };

  return (
    <ErrorBoundary
      fallback={
        <div className="chatbot-container">
          <ChatHeader />
          <div className="error-message">
            <h3>Critical Error</h3>
            <p>
              The chatbot has encountered a critical error and needs to restart.
            </p>
            <button onClick={() => window.location.reload()}>
              Restart Chatbot
            </button>
          </div>
        </div>
      }
    >
      <div className="chatbot-container" ref={containerRef}>
        <ChatHeader />
        {loadingError ? (
          <div className="error-message">
            <p>{loadingError}</p>
          </div>
        ) : (
          <>
            <MessageList
              messages={messages}
              selectedExchange={selectedExchange}
              onExchangeSelect={handleExchangeSelect}
              onStockSelect={handleStockSelect}
              onGoBack={goBack}
              onGoToHome={goToHome}
            />
            <InputForm
              messages={messages}
              inputValue={inputValue}
              setInputValue={setInputValue}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              highlightedIndex={highlightedIndex}
              setHighlightedIndex={setHighlightedIndex}
              selectedExchange={selectedExchange}
              getCurrentOptions={getCurrentOptions}
              onExchangeSelect={handleExchangeSelect}
              onStockSelect={handleStockSelect}
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Chatbot;
