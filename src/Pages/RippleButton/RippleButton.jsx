import "./RippleButton.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import RippleButton from "../../Components/LunarComponents/RippleButton/RippleButton";
import { useCallback } from "react";

export default function StartingPage() {
  const [markdownContent, setMarkdownContent] = useState(``);

  const loadMarkdown = useCallback((path) => {
    fetch(path)
      .then((res) => res.text())
      .then(setMarkdownContent)
      .catch((err) => console.error("Error loading markdown:", err));
  }, []);

  useEffect(() => {
    loadMarkdown("/RippleButton/React/RippleButton.md");
  }, [loadMarkdown]);

  const handleLanguageChange = (version) => {
    if (version === "react") {
      loadMarkdown("/RippleButton/React/RippleButton.md");
    } else if (version === "html") {
      loadMarkdown("/RippleButton/Vanilla/RippleButtonVanilla.md");
    }
  };

  return (
    <div className="main-rippleButton-page">
      <div className="rippleButton-page">
        <ComponentPreview
          onLanguageChange={handleLanguageChange}
          component={RippleButton}
          title={"Ripple Hover Button"}
          stack={"gsap"}
        ></ComponentPreview>
        <hr />
        <MDConverter markdown={markdownContent}></MDConverter>
      </div>
    </div>
  );
}
