import "./MagneticButton.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import MagneticButton from "../../Components/MagneticButton";
import { useCallback } from "react";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState(``);
    const text = "Hover me!"
    const textColor = "white"
    const background = "black"

    const loadMarkdown = useCallback((path) => {
        fetch(path)
            .then((res) => res.text())
            .then(setMarkdownContent)
            .catch((err) => console.error("Error loading markdown:", err));
    }, []);

    useEffect(() => {
        loadMarkdown("/MagneticButton/React/MagneticButton.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/MagneticButton/React/MagneticButton.md");
        } else if (version === "html") {
            loadMarkdown("/MagneticButton/Vanilla/MagneticButtonVanilla.md");
        }
    };


    return (
        <div className="main-magnetic-page">
            <div className="magnetic-page">
                <ComponentPreview
                    onLanguageChange={handleLanguageChange} component={MagneticButton} componentProps={{ text, textColor, background }} title={"Magnetic Button"} stack={"gsap"}></ComponentPreview>
                <hr />
                <MDConverter markdown={markdownContent}></MDConverter>

            </div>
        </div>
    );
}