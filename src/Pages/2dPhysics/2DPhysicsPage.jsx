import "./2DPhysicsPage.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import TwoDPhysics from "../../Components/LunarComponents/2DPhysics/2DPhysics";
import { useCallback } from "react";

export default function StartingPage() {
  const [markdownContent, setMarkdownContent] = useState(``);
  const amount = 35;

  const loadMarkdown = useCallback((path) => {
    fetch(path)
      .then((res) => res.text())
      .then(setMarkdownContent)
      .catch((err) => console.error("Error loading markdown:", err));
  }, []);

  useEffect(() => {
    loadMarkdown("/2DPhysics/React/2DPhysics.md");
  }, [loadMarkdown]);

  const handleLanguageChange = (version) => {
    if (version === "react") {
      loadMarkdown("/2DPhysics/React/2DPhysics.md");
    } else if (version === "html") {
      loadMarkdown("/2DPhysics/Vanilla/2DPhysicsVanilla.md");
    }
  };

  return (
    <div className="main-two-d-physics-page">
      <div className="two-d-physics-page">
        <ComponentPreview
          onLanguageChange={handleLanguageChange}
          component={TwoDPhysics}
          componentProps={{ amount }}
          title={"2D Physics"}
          stack={"matter-js"}
        ></ComponentPreview>
        <hr />
        <MDConverter markdown={markdownContent}></MDConverter>
      </div>
    </div>
  );
}
