import React from "react";
import MessageOptions from "./MessageOptions";

const Message = ({
  message,
  isLastMessage,
  selectedExchange,
  onExchangeSelect,
  onStockSelect,
  onGoBack,
  onGoToHome,
}) => {
  return (
    <div className={`message ${message.isBot ? "bot" : "user"}`}>
      <div
        className="message-content"
        style={
          message.id === 1
            ? { paddingBottom: "8px", textAlign: "left" }
            : { textAlign: "left" }
        }
      >
        <div style={{ paddingLeft: "8px" }}>{message.text}</div>
        {message.isBot && (
          <MessageOptions
            message={message}
            isLastMessage={isLastMessage}
            selectedExchange={selectedExchange}
            onExchangeSelect={onExchangeSelect}
            onStockSelect={onStockSelect}
            onGoBack={onGoBack}
            onGoToHome={onGoToHome}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
