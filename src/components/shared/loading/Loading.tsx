import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  variant?: "primary" | "neutral" | "glass";
}

const sizeMap: Record<string, string> = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  text,
  variant = "primary",
}) => {
  const sizeClass = sizeMap[size];

  const base = "inline-flex items-center justify-center rounded-full";
  const color =
    variant === "primary"
      ? "text-white"
      : variant === "neutral"
      ? "text-gray-700"
      : "text-white/80";
  const bg =
    variant === "primary"
      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
      : variant === "neutral"
      ? "bg-gray-100"
      : "bg-white/10 backdrop-blur";

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${base} ${bg} ${color} p-3 ${sizeClass}`}>
        <svg
          className={`animate-spin ${
            size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>

      {text && <div className="text-sm text-gray-600 font-medium">{text}</div>}
    </div>
  );
};

export default Loading;
