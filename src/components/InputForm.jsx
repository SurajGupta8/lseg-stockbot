import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoMdSend } from "react-icons/io";
import stockData from "../data/stockData.json";

const InputForm = ({
  messages,
  inputValue,
  setInputValue,
  suggestions,
  setSuggestions,
  highlightedIndex,
  setHighlightedIndex,
  selectedExchange,
  getCurrentOptions,
  onExchangeSelect,
  onStockSelect,
}) => {
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const [inputError, setInputError] = useState(null);

  // Auto-focus input when suggestions change
  useEffect(() => {
    if (suggestions.length > 0) {
      inputRef.current.focus();
    }
  }, [suggestions]);

  // Handle input change for autocomplete
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setHighlightedIndex(-1);
    setInputError(null);

    try {
      const options = getCurrentOptions();
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } catch (error) {
      console.error("Error filtering suggestions:", error);
      setInputError("Error loading suggestions");
    }
  };

  // Handle key down events
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    try {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0) {
          selectSuggestion(suggestions[highlightedIndex]);
        } else {
          handleSubmit(e);
        }
      } else if (e.key === "Escape") {
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    } catch (error) {
      console.error("Error handling key press:", error);
      setInputError("Error processing input");
    }
  };

  // Select a suggestion
  const selectSuggestion = (suggestion) => {
    try {
      setInputValue(suggestion);
      setSuggestions([]);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error("Error selecting suggestion:", error);
      setInputError("Error selecting option");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!inputValue.trim()) {
        setInputError("Please enter a value");
        return;
      }

      const options = getCurrentOptions();
      if (options.length === 0) {
        throw new Error("No options available for selection");
      }

      const exactMatch = options.find(
        (option) => option.toLowerCase() === inputValue.toLowerCase()
      );

      if (!exactMatch) {
        setInputError("Invalid selection. Please choose from the suggestions.");
        return;
      }

      const lastMessage = messages[messages.length - 1];
      if (!lastMessage) {
        throw new Error("Invalid message state");
      }

      if (lastMessage.stage === "exchange") {
        const exchange = stockData.find(
          (ex) => ex.stockExchange === exactMatch
        );
        if (!exchange) {
          throw new Error("Exchange not found");
        }
        onExchangeSelect(exchange);
      } else if (lastMessage.stage === "stock") {
        if (!selectedExchange) {
          throw new Error("No exchange selected");
        }
        const stock = selectedExchange.topStocks.find(
          (s) => s.stockName === exactMatch
        );
        if (!stock) {
          throw new Error("Stock not found");
        }
        onStockSelect(stock);
      }

      setInputValue("");
      setSuggestions([]);
      setHighlightedIndex(-1);
      setInputError(null);
    } catch (error) {
      console.error("Form submission error:", error);
      setInputError(error.message || "An unknown error occurred");
    }
  };

  return (
    <div
      className={`input-container ${
        !["exchange", "stock"].includes(messages[messages.length - 1]?.stage)
          ? "disabled"
          : ""
      }`}
    >
      {inputError && (
        <div className="input-error">
          {inputError}
          <button onClick={() => setInputError(null)}>Dismiss</button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="input-form">
        <div className="autocomplete">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              messages[messages.length - 1]?.stage === "exchange"
                ? "Please select a stock exchange..."
                : messages[messages.length - 1]?.stage === "stock"
                ? "Please select a stock name..."
                : ""
            }
          />
          <button
            type="submit"
            className="send-button"
            disabled={
              !["exchange", "stock"].includes(
                messages[messages.length - 1]?.stage
              )
            }
          >
            <IoMdSend className="send-icon" />
          </button>
          {suggestions.length > 0 && (
            <div className="suggestions" ref={suggestionsRef}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`suggestion-item ${
                    highlightedIndex === index ? "highlighted" : ""
                  }`}
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

InputForm.propTypes = {
  messages: PropTypes.array.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
  setSuggestions: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number.isRequired,
  setHighlightedIndex: PropTypes.func.isRequired,
  selectedExchange: PropTypes.object,
  getCurrentOptions: PropTypes.func.isRequired,
  onExchangeSelect: PropTypes.func.isRequired,
  onStockSelect: PropTypes.func.isRequired,
};

export default InputForm;
