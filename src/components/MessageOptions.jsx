import React from "react";
import stockData from "../data/stockData.json";

const MessageOptions = ({
  message,
  isLastMessage,
  selectedExchange,
  onExchangeSelect,
  onStockSelect,
  onGoBack,
  onGoToHome,
}) => {
  const isActive = isLastMessage;

  switch (message.stage) {
    case "exchange":
      return (
        <div className="message-options">
          {stockData.map((exchange) => (
            <button
              key={exchange.code}
              className={`option-button ${!isActive ? "disabled" : ""}`}
              onClick={isActive ? () => onExchangeSelect(exchange) : null}
              disabled={!isActive}
            >
              {exchange.stockExchange}
            </button>
          ))}
        </div>
      );
    case "stock":
      return (
        <div className="message-options">
          {selectedExchange.topStocks.map((stock) => (
            <button
              key={stock.code}
              className={`option-button ${!isActive ? "disabled" : ""}`}
              onClick={isActive ? () => onStockSelect(stock) : null}
              disabled={!isActive}
            >
              {stock.stockName}
            </button>
          ))}
        </div>
      );
    case "stock-options":
      return (
        <div className="message-options">
          <button
            className={`option-button ${!isActive ? "disabled" : ""}`}
            onClick={isActive ? onGoToHome : null}
            disabled={!isActive}
          >
            Main menu
          </button>
          <button
            className={`option-button ${!isActive ? "disabled" : ""}`}
            onClick={isActive ? onGoBack : null}
            disabled={!isActive}
          >
            Go Back
          </button>
        </div>
      );
    default:
      return null;
  }
};

export default MessageOptions;
