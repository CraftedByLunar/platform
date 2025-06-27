import "./StaggeredText.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import TextStagger from "../../Components/TextStagger";
import { useCallback } from "react";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState(``);
    const text = "HOVER ME!"
    const textColor = "black"

    const loadMarkdown = useCallback((path) => {
        fetch(path)
            .then((res) => res.text())
            .then(setMarkdownContent)
            .catch((err) => console.error("Error loading markdown:", err));
    }, []);

    useEffect(() => {
        loadMarkdown("/StaggeredText/React/StaggeredText.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/StaggeredText/React/StaggeredText.md");
        } else if (version === "html") {
            loadMarkdown("/StaggeredText/Vanilla/StaggeredTextVanilla.md");
        }
    };


    return (
        <div className="main-staggerText-page">
            <div className="staggerText-page">
                <ComponentPreview
                    onLanguageChange={handleLanguageChange} component={TextStagger} componentProps={{ text, textColor }} title={"Stagger Text"} stack={"gsap, SplitText"}></ComponentPreview>
                <hr />
                <MDConverter markdown={markdownContent}></MDConverter>

            </div>
        </div>
    );
}