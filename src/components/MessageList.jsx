import React, { useRef, useEffect } from "react";
import Message from "./Message";
import { VscHubot } from "react-icons/vsc";
import { TbMessageUser } from "react-icons/tb";

const MessageList = ({
  messages,
  selectedExchange,
  onExchangeSelect,
  onStockSelect,
  onGoBack,
  onGoToHome,
}) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-messages">
      {messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1;
        return (
          <div
            key={message.id}
            className={`message-row ${message.isBot ? "bot" : "user"}`}
            style={{ textAlign: "left" }}
          >
            {message.isBot && (
              <div className="bot-icon-container">
                <VscHubot className="bot-icon" />
              </div>
            )}
            <Message
              message={message}
              isLastMessage={isLastMessage}
              selectedExchange={selectedExchange}
              onExchangeSelect={onExchangeSelect}
              onStockSelect={onStockSelect}
              onGoBack={onGoBack}
              onGoToHome={onGoToHome}
            />
            {!message.isBot && (
              <div className="user-icon-container">
                <TbMessageUser className="user-icon" />
              </div>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
