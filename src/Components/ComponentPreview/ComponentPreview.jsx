import React, { useState } from "react";
import "./ComponentPreview.css";

export default function ComponentPreview({
  component: Component,
  title,
  stack,
  componentProps = {},
  onLanguageChange,
  styles,
}) {
  const [key, setKey] = useState(0);

  const rerunAnimation = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const stackItems = stack ? stack.split(",").map((item) => item.trim()) : [];

  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    if (onLanguageChange) {
      if (selected === "React + GSAP") {
        onLanguageChange("react");
      } else if (selected === "Vanilla + GSAP") {
        onLanguageChange("html");
      }
    }
  };

  return (
    <>
      <div className="title">
        <h1>{title}</h1>
        <div className="tech-stack">
          <p>Dependencies:</p>
          {stackItems.map((tech, index) => (
            <div className="stack" key={index}>
              <span>{tech}</span>
            </div>
          ))}
        </div>
        <div className="change-language">
          <div className="wrap-sac">
            <svg
              data-testid="geist-icon"
              height="16"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              width="16"
              style={{ color: "#DFDFDF" }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5898 14.5 8 14.5C4.41015 14.5 1.5 11.5898 1.5 8ZM8 -3.49691e-07C3.58172 -5.4282e-07 -1.56562e-07 3.58172 -3.49691e-07 8C-5.4282e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 -1.56562e-07 8 -3.49691e-07ZM4.71967 7.53033L7.29996 10.1106C7.68658 10.4972 8.31342 10.4972 8.70004 10.1106L11.2803 7.53033L11.8107 7L10.75 5.93934L10.2197 6.46967L8 8.68934L5.78033 6.46967L5.25 5.93934L4.18934 7L4.71967 7.53033Z"
                fill="currentColor"
              ></path>
            </svg>
            <select
              name="language-change"
              id="changer-language"
              onChange={handleLanguageChange}
            >
              <option value="React + GSAP">React + GSAP</option>
              <option value="Vanilla + GSAP">Vanilla JS + GSAP</option>
            </select>
          </div>
        </div>
      </div>

      <div style={styles} className="main-comp-prev">
        <button onClick={rerunAnimation} className="rerun-btn">
          Re-run Animation
        </button>
        <div className="comp-container" key={key}>
          <Component {...componentProps} />
        </div>
      </div>
    </>
  );
}
