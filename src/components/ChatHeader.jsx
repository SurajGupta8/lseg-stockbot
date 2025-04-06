import React from "react";
import { VscHubot } from "react-icons/vsc";

const ChatHeader = () => {
  return (
    <div className="chatbot-header">
      <VscHubot className="bot-icon-header" />
      <h2>LSEG Chatbot</h2>
    </div>
  );
};

export default ChatHeader;
