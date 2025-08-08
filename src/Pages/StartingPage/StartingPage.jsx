import "./StartingPage.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";

export default function StartingPage() {
  const [markdownContent, setMarkdownContent] = useState(``);

  useEffect(() => {
    fetch("/Introduction.md")
      .then((response) => response.text())
      .then((text) => {
        setMarkdownContent(text);
      })
      .catch((error) => console.error("Error loading markdown file:", error));
  }, []);

  return (
    <div className="main-start-page">
      {/* Idk might create it later */}

      {/* <div className="welcome-modal">
                <div className="modal-inner">
                    <div className="modal-title">
                        <h1>Welcome!</h1>
                        <span>Welcome to Lunar, </span>
                    </div>
                </div>
            </div> */}
      <div className="start-page">
        <MDConverter markdown={markdownContent}></MDConverter>
      </div>
    </div>
  );
}
