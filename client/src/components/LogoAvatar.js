import React from "react";

const LogoAvatar = ({ userName }) => {
  function getHexCodeForLetter(letter) {
    const colors = [
      "#EF4444",
      "#F59E0B",
      "#10B981",
      "#3B82F6",
      "#7C3AED",
      "#F472B6",
      "#C084FC",
      "#6366F1",
      "#EAB308",
      "#3B82F6",
      "#319795",
      "#4B5563",
      "#1F2937",
      "#6B7280",
      "#EF4444",
      "#F59E0B",
      "#10B981",
      "#3B82F6",
      "#7C3AED",
      "#F472B6",
      "#C084FC",
      "#6366F1",
      "#EAB308",
      "#3B82F6",
      "#319795",
      "#4B5563",
    ];

    const index = letter.charCodeAt(0) - 65;
    return colors[index % colors.length];
  }

  const bgColor = getHexCodeForLetter(userName.charAt(0));
  return (
    <div>
      <div
        className="flex justify-center items-center w-8 h-8 rounded-full"
        style={{ backgroundColor: `${bgColor}` }}
      >
        <span className="text-white font-bold text-sm">
          {userName.charAt(0)}
        </span>
      </div>
    </div>
  );
};

export default LogoAvatar;
