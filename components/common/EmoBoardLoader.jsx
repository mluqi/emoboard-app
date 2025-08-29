import React from "react";

const EmoBoardLoader = () => {
  const text = "EmoBoard";
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold"
        aria-label="Loading EmoBoard"
      >
        <span className="text-primary" aria-hidden="true">
          {text
            .slice(0, 3)
            .split("")
            .map((char, index) => (
              <span
                key={index}
                className="inline-block opacity-0 animate-fade-in-slide-up"
              style={{ animationDelay: `${index * 30}ms` }}
              >
                {char}
              </span>
            ))}
        </span>
        <span className="text-muted-foreground" aria-hidden="true">
          {text
            .slice(3)
            .split("")
            .map((char, index) => (
              <span
                key={index + 3}
                className="inline-block opacity-0 animate-fade-in-slide-up"
              style={{ animationDelay: `${(index + 3) * 30}ms` }}
              >
                {char}
              </span>
            ))}
        </span>
      </h1>
    </div>
  );
};

export default EmoBoardLoader;
