import "./CurvySlideButton.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import CurvySlideButton from "../../Components/LunarComponents/CurvySlideButton/CurvySlideButton";
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
    loadMarkdown("/CurvySlideButton/React/CurvySlideButton.md");
  }, [loadMarkdown]);

  const handleLanguageChange = (version) => {
    if (version === "react") {
      loadMarkdown("/CurvySlideButton/React/CurvySlideButton.md");
    } else if (version === "html") {
      loadMarkdown("/CurvySlideButton/Vanilla/CurvySlideButtonVanilla.md");
    }
  };

  return (
    <div className="main-curvySlideButton-page">
      <div className="curvySlideButton-page">
        <ComponentPreview
          onLanguageChange={handleLanguageChange}
          component={CurvySlideButton}
          title={"Curvy Slide Button"}
          stack={"react, GSAP"}
        ></ComponentPreview>
        <hr />
        <MDConverter markdown={markdownContent}></MDConverter>
      </div>
    </div>
  );
}
