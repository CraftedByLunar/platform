import "./ScrambleText.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import TextScramble from "../../Components/TextScramble";
import { useCallback } from "react";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState(``);
    const text = "HOVER ME!"
    const color = "rgb(0 108 58)"

    const loadMarkdown = useCallback((path) => {
        fetch(path)
            .then((res) => res.text())
            .then(setMarkdownContent)
            .catch((err) => console.error("Error loading markdown:", err));
    }, []);

    useEffect(() => {
        loadMarkdown("/ScrambleText/React/ScrambleText.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/ScrambleText/React/ScrambleText.md");
        } else if (version === "html") {
            loadMarkdown("/ScrambleText/Vanilla/ScrambleTextVanilla.md");
        }
    };


    return (
        <div className="main-scrambleText-page">
            <div className="scrambleText-page">
                <ComponentPreview
                    onLanguageChange={handleLanguageChange} componentProps={{ text, color }} component={TextScramble} title={"Text Scramble "} stack={"gsap"}></ComponentPreview>
                <hr />
                <MDConverter markdown={markdownContent}></MDConverter>

            </div>
        </div>
    );
}