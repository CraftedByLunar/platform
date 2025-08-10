import "./DotsBackground.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import BackgroundDots from "../../Components/LunarComponents/DotsBackground/DotsBackground";
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
    loadMarkdown("/DotsBackground/React/DotsBackground.md");
  }, [loadMarkdown]);

  const handleLanguageChange = (version) => {
    if (version === "react") {
      loadMarkdown("/DotsBackground/React/DotsBackground.md");
    } else if (version === "html") {
      loadMarkdown("/DotsBackground/Vanilla/DotsBackgroundVanilla.md");
    }
  };

  return (
    <div className="main-dotsBackground-page">
      <div className="dotsBackground-page">
        <ComponentPreview
          onLanguageChange={handleLanguageChange}
          component={BackgroundDots}
          title={"Animated Dots Background"}
          stack={"react"}
          styles={{
            background: "#00305F",
            border: "1px solid var(--blackDark)",
          }}
        ></ComponentPreview>
        <hr />
        <MDConverter markdown={markdownContent}></MDConverter>
      </div>
    </div>
  );
}
