import React from "react";

export const TickImg = ({ color, onClick, className }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="19 20 60 60"
        version="1.1"
        x="0px"
        y="0px"
        fill={color}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={onClick}
      >
        <path d="M50,78 C34.536027,78 22,65.463973 22,50 C22,34.536027 34.536027,22 50,22 C65.463973,22 78,34.536027 78,50 C78,65.463973 65.463973,78 50,78 Z M40.2098528,50.676157 L36.7901472,54.323843 L46.7902217,63.6989129 L62.4733805,43.5348515 L58.5266195,40.4651485 L46.2097783,56.3010871 L40.2098528,50.676157 Z" />
      </svg>
    </div>
  );
};
