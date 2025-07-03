import "./BouncyButton.css";
import React, { useState, useEffect, useCallback } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import BouncyButton from "../../Components/BouncyButton";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState("");
    const background = "black"
    const textColor = "white"
    const onClick = "WOOW!"
    const text = "HOVER ME"

    const loadMarkdown = useCallback((path) => {
        fetch(path)
            .then((res) => res.text())
            .then(setMarkdownContent)
            .catch((err) => console.error("Error loading markdown:", err));
    }, []);

    useEffect(() => {
        loadMarkdown("/BouncyButton/React/BouncyButton.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/BouncyButton/React/BouncyButton.md");
        } else if (version === "html") {
            loadMarkdown("/BouncyButton/Vanilla/BouncyButtonVanilla.md");
        }
    };

    return (
        <div className="main-bouncyButton-page">
            <div className="bouncyButton-page">
                <ComponentPreview
                    component={BouncyButton}
                    componentProps={{ background, text, textColor, }}
                    title="Bouncy Button"
                    stack="gsap"
                    onLanguageChange={handleLanguageChange}
                />
                <hr />
                <MDConverter markdown={markdownContent} />
            </div>
        </div>
    );
}
