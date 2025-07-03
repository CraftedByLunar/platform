import "./MagneticText.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import MagneticText from "../../Components/MagneticText";
import { useCallback } from "react";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState(``);
    const text = "Hover me!"
    const color = "black"

    const loadMarkdown = useCallback((path) => {
        fetch(path)
            .then((res) => res.text())
            .then(setMarkdownContent)
            .catch((err) => console.error("Error loading markdown:", err));
    }, []);

    useEffect(() => {
        loadMarkdown("/MagneticText/React/MagneticText.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/MagneticText/React/MagneticText.md");
        } else if (version === "html") {
            loadMarkdown("/MagneticText/Vanilla/MagneticTextVanilla.md");
        }
    };


    return (
        <div className="main-magneticText-page">
            <div className="magneticText-page">
                <ComponentPreview
                    onLanguageChange={handleLanguageChange} component={MagneticText} componentProps={{ text, color }} title={"Magnetic Text"} stack={"gsap"}></ComponentPreview>
                <hr />
                <MDConverter markdown={markdownContent}></MDConverter>

            </div>
        </div>
    );
}