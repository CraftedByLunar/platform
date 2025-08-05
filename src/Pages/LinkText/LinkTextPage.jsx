import "./LinkTextPage.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import LinkText from "../../Components/LunarComponents/LinkText/LinkText";
import { useCallback } from "react";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState(``);
    const text = "Hover me!"
    const to = "#"

    const loadMarkdown = useCallback((path) => {
        fetch(path)
            .then((res) => res.text())
            .then(setMarkdownContent)
            .catch((err) => console.error("Error loading markdown:", err));
    }, []);

    useEffect(() => {
        loadMarkdown("/LinkText/React/LinkText.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/LinkText/React/LinkText.md");
        } else if (version === "html") {
            loadMarkdown("/LinkText/Vanilla/LinkTextVanilla.md");
        }
    };


    return (
        <div className="main-linkText-page">
            <div className="linkText-page">
                <ComponentPreview
                    onLanguageChange={handleLanguageChange} component={LinkText} componentProps={{ text, to }} title={"Link Text"} stack={"gsap"}></ComponentPreview>
                <hr />
                <MDConverter markdown={markdownContent}></MDConverter>

            </div>
        </div>
    );
}