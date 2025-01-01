"use client";

import React from "react";
import LetterDrawing from "./LetterDrawing";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <LetterDrawing />
      </div>
    </div>
  );
};

export default Loader;
