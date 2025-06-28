import "./CursorDraw.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import CursorDraw from "../../Components/CursorDraw";
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
        loadMarkdown("/CursorDraw/React/CursorDraw.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/CursorDraw/React/CursorDraw.md");
        } else if (version === "html") {
            loadMarkdown("/CursorDraw/Vanilla/CursorDrawVanilla.md");
        }
    };


    return (
        <div className="main-cursorDraw-page">
            <div className="cursorDraw-page">
                <ComponentPreview
                    onLanguageChange={handleLanguageChange} component={CursorDraw} title={"Cursor Draw"} stack={"gsap"}></ComponentPreview>
                <hr />
                <MDConverter markdown={markdownContent}></MDConverter>

            </div>
        </div>
    );
}